import { Request, Response } from "express";
import { songModel } from "../../models/song.model";
import { singerModel } from "../../models/singer.model";
import { likeSongModel } from "../../models/like-song.model";
import { loveSongModel } from "../../models/love-song.model";
import unidecode from "unidecode";
import { userModel } from "../../models/user.model";
import { topicModel } from "../../models/topics.model";
import { listSongsModel } from "../../models/listSong.model";
import { findSimilarSongs } from "../../helper/knn.helper";

export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;

  const song = await songModel.findOne({
    slug: slugSong,
    deleted: false,
    status: "active"
  }).select("-status -deleted");
  let slugTopic;
  let recommendedSongs = [];

  try {
    slugTopic = await topicModel.findOne({
      _id: song.topicId,
      deleted: false,
      status: "active"
    }).select("slug");

    // Tìm các bài hát tương tự sử dụng KNN
    const similarSongs = await findSimilarSongs(song, 5);

    for (const similarSong of similarSongs) {
      const singers = await singerModel.find({
        _id: { $in: similarSong.singerIds },
        status: "active",
        deleted: false
      }).select("fullName slug");

      recommendedSongs.push({
        title: similarSong.title,
        avatar: similarSong.avatar,
        slug: similarSong.slug,
        singers: singers,
        audio: similarSong.audio,
        listenNumber: similarSong.listenNumber
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      messages: "Error!"
    })
    return;
  }

  if (!song) {
    res.json({
      code: 400,
      messages: "Bài hát không tồn tại trong hệ thống!"
    })
    return;
  }
  // const userLogined = res.locals["user"];
  // if(userLogined){
  //   const existLike = await likeSongModel.findOne({
  //     userId: userLogined["id"],
  //     songId: song.id,
  //     deleted: false
  //   });
  //   const existLove = await loveSongModel.findOne({
  //     userId: userLogined["id"],
  //     songId: song.id,
  //   });

  //   if(existLike){
  //     song["typeLike"] = "like";
  //   }
  //   if(existLove){
  //     song["loveSong"] = "love";
  //   }
  // }
  const singers = await singerModel.find({
    _id: { $in: song.singerIds },
    deleted: false,
    status: "active"
  }).select("fullName slug");

  res.json({
    songCurrent: song,
    singer: singers,
    topicSlug: slugTopic?.slug || '',
    recommendedSongs: recommendedSongs
  })
}

export const topSongs = async (req: Request, res: Response) => {
  const listTopSongs = await songModel
    .find({
      deleted: false,
      status: "active"
    }).sort({ listenNumber: "desc" })
    .limit(3)
    .select("title avatar singerIds slug listenNumber audio");
  const dataFinal = [];
  for (const item of listTopSongs) {
    const singers = await singerModel.find({
      _id: { $in: item.singerIds },
      deleted: false,
      status: "active"
    }).select("fullName slug");

    const data = {
      title: item.title,
      avatar: item.avatar,
      slug: item.slug,
      singers: singers,
      audio: item.audio,
      listenNumber: item.listenNumber
    }
    dataFinal.push(data);
  }
  res.json({
    code: 200,
    dataFinal: dataFinal
  });
}

export const loveSongs = async (req: Request, res: Response) => {

  const User = await userModel.findOne({
    tokenUser: req["tokenUser"],
    status: "active",
    deleted: false
  }).select("tokenUser");

  let listSongIds: any[] = [];
  listSongIds = await loveSongModel.find({
    userId: User.id
  });

  const songsResult: any[] = [];

  for (const item of listSongIds) {
    try {
      const song = await songModel.findOne({
        _id: item.songId,
        deleted: false,
        status: "active"
      });
      if (song) { //Check xem bai hat do con hoat dong hay khong roi moi push vao
        const singers = await singerModel.find({
          _id: { $in: song.singerIds },
          status: "active",
          deleted: false
        }).select("fullName slug");

        const dataSong = {
          title: song.title,
          avatar: song.avatar,
          totalTime: song.totalTime,
          slug: song.slug,
          singers: singers,
          audio: song.audio,
          lyrics: song.lyrics,
          listenNumber: song.listenNumber,
        }
        songsResult.push(dataSong);
      }
    } catch (error) {
      res.json({
        code: 400,
        messages: "Error"
      });
    }
  }
  res.json({
    code: 200,
    listSongs: songsResult
  });
}

export const like = async (req: Request, res: Response) => {
  try {
    const { id, type } = req.body;
    const song = await songModel.findOne({
      _id: id
    }).select("like");

    let likeCurrent = song.like;

    if (likeCurrent >= 0) {
      if (type == "like") {
        likeCurrent += 1;

        const existLike = await likeSongModel.findOne({
          userId: res.locals.user.id,
          songId: song.id
        });

        if (!existLike) {
          const dataLike = new likeSongModel({
            userId: res.locals.user.id,
            songId: song.id,
            deleted: false
          })
          await dataLike.save();
        }
        else {
          await likeSongModel.updateOne({
            userId: res.locals.user.id,
            songId: song.id
          }, {
            deleted: false
          });
        }
      }
      else {
        if (likeCurrent > 0)
          likeCurrent -= 1;
        await likeSongModel.updateOne({
          userId: res.locals.user.id,
          songId: song.id
        }, {
          deleted: true
        });
      }
    }
    await songModel.updateOne({
      _id: id
    }, {
      like: likeCurrent
    });

    res.json({
      code: 200,
      updateLike: likeCurrent
    });
  } catch (error) {
    console.log(error);
  }
};

export const love = async (req: Request, res: Response) => {
  try {
    const { tokenUser, slugSong } = req.body;

    const userCurrent = await userModel.findOne({
      tokenUser: tokenUser,
      deleted: false,
      status: "active"
    }).select("-password");

    const songCurrent = await songModel.findOne({
      slug: slugSong,
      deleted: false,
      status: "active"
    })

    const existLoveSong = await loveSongModel.findOne({
      userId: userCurrent.id,
      songId: songCurrent.id
    });

    let status: string = "";

    if (existLoveSong) {
      await loveSongModel.deleteOne({
        userId: userCurrent.id,
        songId: songCurrent.id
      });
      status = "noLove";
    }
    else {
      const data = new loveSongModel({
        userId: userCurrent.id,
        songId: songCurrent.id
      });
      await data.save();
      status = "love";
    }
    res.json({
      code: 200,
      status: status
    });
  } catch (error) {
    res.json({
      code: 400,
      messages: "Error"
    });
  }
};

export const checkLoveSong = async (req: Request, res: Response) => {
  try {
    const { tokenUser, slugSong } = req.body;

    const userCurrent = await userModel.findOne({
      tokenUser: tokenUser,
      deleted: false,
      status: "active"
    }).select("-password");

    const songCurrent = await songModel.findOne({
      slug: slugSong,
      deleted: false,
      status: "active"
    })

    const checkLove = await loveSongModel.findOne({
      userId: userCurrent.id,
      songId: songCurrent.id
    })

    if (checkLove) {
      res.json({
        code: 200
      });
    }
    else {
      res.json({
        code: 400
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      messages: "Error"
    });
  }
};

export const search = async (req: Request, res: Response) => {
  let keyword = `${req.params.keyword}`;
  let songs = [];
  let songsResult = [];
  let recommendedSongs = [];

  if (keyword) {
    let keywordSlug = keyword;
    keywordSlug = keyword.trim();
    keywordSlug = keywordSlug.replace(/\s+/g, "-");
    keywordSlug = unidecode(keywordSlug);

    const regexKeyWord = new RegExp(keyword, "i");
    const regexKeyWordSlug = new RegExp(keywordSlug, "i");

    const singers = await singerModel.find({
      $or: [
        { fullName: regexKeyWord },
        { slug: regexKeyWordSlug }
      ],
      deleted: false,
      status: "active"
    }).select("id");

    const listsingersId = singers.map(item => item.id);

    songs = await songModel.find({ //Tim kiem theo bai hat va ca si
      $or: [
        { title: regexKeyWord },
        { slug: regexKeyWordSlug },
        { singerIds: { $in: listsingersId } } //Tim bai hat co ca si hat bai hat do
      ],
      deleted: false,
      status: "active"
    }).select("-deleted -status -updateAt");

    // Xử lý kết quả tìm kiếm chính
    for (const item of songs) {
      const singers = await singerModel.find({
        _id: { $in: item.singerIds },
        status: "active",
        deleted: false
      }).select("fullName slug");

      const dataSong = {
        title: item.title,
        avatar: item.avatar,
        slug: item.slug,
        singers: singers,
        lyric: item.lyrics,
        like: item.like,
        totalTime: item.totalTime,
        audio: item.audio,
        listenNumber: item.listenNumber
      }
      songsResult.push(dataSong);
    }

    // Thêm gợi ý bài hát tương tự dựa trên KNN
    if (keyword != '' || songs.length > 0) {
      // Lấy bài hát đầu tiên làm mẫu để tìm các bài hát tương tự, truyền từ khóa tìm kiếm
      const similarSongs = await findSimilarSongs(songs[0], 5, keyword);

      // Lọc bỏ các bài hát đã có trong kết quả tìm kiếm
      const songIds = songs.map(song => song._id.toString());
      const filteredSimilarSongs = similarSongs.filter(
        song => !songIds.includes(song._id.toString())
      );

      // Xử lý dữ liệu bài hát tương tự
      for (const item of filteredSimilarSongs) {
        const singers = await singerModel.find({
          _id: { $in: item.singerIds },
          status: "active",
          deleted: false
        }).select("fullName slug");

        const dataSong = {
          title: item.title,
          avatar: item.avatar,
          slug: item.slug,
          singers: singers,
          lyric: item.lyrics,
          like: item.like,
          totalTime: item.totalTime,
          audio: item.audio,
          listenNumber: item.listenNumber
        }
        recommendedSongs.push(dataSong);
      }
    }
  }

  res.json({
    songs: songsResult,
    recommendedSongs: recommendedSongs
  });
}

export const randomSong = async (req: Request, res: Response) => {
  const slugCurrent = req.body.slugSong;

  // Lấy bài hát hiện tại
  const currentSong = await songModel.findOne({
    slug: slugCurrent,
    deleted: false,
    status: "active"
  });

  if (currentSong) {
    // Sử dụng KNN để tìm bài hát tương tự
    const similarSongs = await findSimilarSongs(currentSong, 10);

    // Chọn ngẫu nhiên 1 bài hát từ danh sách các bài hát tương tự
    const randomIndex = Math.floor(Math.random() * similarSongs.length);
    const selectedSong = similarSongs[randomIndex];

    const singers = await singerModel.find({
      _id: { $in: selectedSong.singerIds },
      status: "active",
      deleted: false
    }).select("fullName slug");

    const dataSong = {
      title: selectedSong.title,
      avatar: selectedSong.avatar,
      slug: selectedSong.slug,
      singers: singers,
      lyric: selectedSong.lyrics,
      like: selectedSong.like,
      totalTime: selectedSong.totalTime,
      audio: selectedSong.audio,
      listenNumber: selectedSong.listenNumber
    }

    res.json({
      code: 200,
      songs: dataSong
    });
  } else {
    // Nếu không tìm thấy bài hát hiện tại, chọn ngẫu nhiên
    const listSongs = await songModel.find({
      deleted: false,
      status: "active",
      slug: { $ne: slugCurrent }
    });

    const index = Math.floor(Math.random() * listSongs.length);
    const item = listSongs[index];

    const singers = await singerModel.find({
      _id: { $in: item.singerIds },
      status: "active",
      deleted: false
    }).select("fullName slug");

    const dataSong = {
      title: item.title,
      avatar: item.avatar,
      slug: item.slug,
      singers: singers,
      lyric: item.lyrics,
      like: item.like,
      totalTime: item.totalTime,
      audio: item.audio,
      listenNumber: item.listenNumber
    }

    res.json({
      code: 200,
      songs: dataSong
    });
  }
};

export const randomSongLogin = async (req: Request, res: Response) => {
  const slugSong = req.body.slugSong;
  const user = await userModel.findOne({
    tokenUser: req.body.tokenUser,
    status: "active"
  }).select("fullName");

  const song = await songModel.findOne({
    slug: slugSong
  }).select("title");

  if (song && user) {
    const data = {
      userId: user.id,
      songIds: song.id
    }
    const listSongCurrent = await listSongsModel.findOne({
      userId: user.id
    });
    if (listSongCurrent) {
      await listSongsModel.updateOne(
        { userId: user.id },
        { $push: { songIds: song.id } }
      );
    }
    else {
      const newListSongs = new listSongsModel(data);
      await newListSongs.save();
    }
    res.json({
      code: 200,
      messages: "Lưu thành công!"
    })
  }
  else {
    res.json({
      code: 400,
      messages: "Lỗi!"
    });
  }

}

export const listenNumberPatch = async (req: Request, res: Response) => {
  const slugSong = req.params.slugSong;
  try {
    const song = await songModel.findOne({
      slug: slugSong
    }).select("listenNumber");
    if (song) {
      let listenNumberCurrent = song.listenNumber;
      listenNumberCurrent += 1;
      await songModel.updateOne({
        slug: slugSong
      }, {
        "listenNumber": listenNumberCurrent
      });
      res.json({
        code: 200,
        messager: "Cập nhật thành công",
        newListen: listenNumberCurrent
      });
    }
    else {
      res.json({
        code: 400
      });
    }
  } catch (error) {
    res.json({
      code: 400
    });
  }
}
