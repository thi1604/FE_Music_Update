import { songModel as Song } from "../models/song.model";
import { analyzeLyricEmotion, getEmotionFromKeyword } from "./sentiment.helper";

interface SongFeatures {
  topicId: string;
  singerIds: string[];
  listenNumber: number;
  like: number;
  lyrics?: string;
  emotions?: {
    sad: number;
    happy: number;
    chill: number;
  };
}

export const calculateDistance = (song1: SongFeatures, song2: SongFeatures, targetEmotion?: string): number => {
  // Chuẩn hóa các giá trị số để đảm bảo công bằng trong tính toán
  const maxListen = 1000; // Giá trị tối đa cho phép, có thể điều chỉnh
  const normalizedListen1 = song1.listenNumber / maxListen;
  const normalizedListen2 = song2.listenNumber / maxListen;

  // Tính khoảng cách Euclidean
  let distance = 0;

  // So sánh topic
  if (song1.topicId !== song2.topicId) distance += 0.5; // Giảm trọng số của topic

  // So sánh singers (tính tỷ lệ ca sĩ trùng nhau)
  const commonSingers = song1.singerIds.filter(id => song2.singerIds.includes(id));
  const singerSimilarity = commonSingers.length / Math.max(song1.singerIds.length, song2.singerIds.length);
  distance += (1 - singerSimilarity) * 0.5; // Giảm trọng số của ca sĩ

  // So sánh cảm xúc từ lời bài hát
  if (song1.emotions && song2.emotions) {
    if (targetEmotion) {
      // Nếu có target emotion, ưu tiên các bài hát có cùng cảm xúc
      const emotionDistance = Math.abs(song1.emotions[targetEmotion] - song2.emotions[targetEmotion]);
      distance += emotionDistance * 2; // Tăng trọng số cho cảm xúc mục tiêu
    } else {
      // So sánh tất cả các cảm xúc
      const emotionDistance =
        Math.pow(song1.emotions.sad - song2.emotions.sad, 2) +
        Math.pow(song1.emotions.happy - song2.emotions.happy, 2) +
        Math.pow(song1.emotions.chill - song2.emotions.chill, 2);
      distance += Math.sqrt(emotionDistance);
    }
  }

  // So sánh các giá trị số (numerical features) với trọng số thấp hơn
  distance += Math.pow(normalizedListen1 - normalizedListen2, 2) * 0.3;
  if (song1.like !== undefined && song2.like !== undefined) {
    distance += Math.pow((song1.like - song2.like) / 100, 2) * 0.3;
  }

  return Math.sqrt(distance);
};

export const findSimilarSongs = async (
  targetSong: any,
  k: number = 5,
  searchKeyword?: string
): Promise<any[]> => {
  try {
    // Nếu có targetSong, thực hiện logic cũ
    if (targetSong) {
      const allSongs = await Song.find({ deleted: false, status: "active" });
      const targetEmotion = searchKeyword ? getEmotionFromKeyword(searchKeyword) : null;
      const targetEmotions = targetSong?.lyrics ? analyzeLyricEmotion(targetSong.lyrics) : null;

      const distances = allSongs
        .filter((song) => song._id.toString() !== targetSong?._id.toString())
        .map((song) => {
          const songEmotions = song.lyrics ? analyzeLyricEmotion(song.lyrics) : null;
          const distance = calculateDistance(
            {
              topicId: song.topicId.toString(),
              singerIds: song.singerIds.map((id: any) => id.toString()),
              listenNumber: song.listenNumber || 0,
              like: song.like || 0,
              emotions: songEmotions
            },
            {
              topicId: targetSong.topicId.toString(),
              singerIds: targetSong.singerIds.map((id: any) => id.toString()),
              listenNumber: targetSong.listenNumber || 0,
              like: targetSong.like || 0,
              emotions: targetEmotions
            },
            targetEmotion
          );
          return { song, distance };
        });

      const nearestSongs = distances
        .sort((a, b) => a.distance - b.distance)
        .slice(0, k)
        .map((item) => item.song);

      return nearestSongs;
    }
    // Nếu chỉ có searchKeyword, tìm bài hát theo từ khóa
    else if (searchKeyword) {
      const songs = await Song.find({
        deleted: false,
        status: "active",
        $or: [
          { name: { $regex: searchKeyword, $options: "i" } },
          { singerNames: { $regex: searchKeyword, $options: "i" } },
          { lyrics: { $regex: searchKeyword, $options: "i" } } // Thêm điều kiện tìm trong lời bài hát
        ]
      }).limit(k);

      // Nếu tìm được bài hát thì trả về luôn
      if (songs.length > 0) {
        return songs;
      }

      // Nếu không tìm được bài hát, tìm theo cảm xúc từ keysearch
      const allSongs = await Song.find({ deleted: false, status: "active" });
      const targetEmotion = getEmotionFromKeyword(searchKeyword);
      console.log("Target Emotion from keyword:", targetEmotion);
      // Nếu không xác định được cảm xúc thì trả về rỗng
      if (!targetEmotion) return [];

      const distances = allSongs.map((song) => {
        const songEmotions = song.lyrics ? analyzeLyricEmotion(song.lyrics) : null;
        // Tạo một object giả làm target chỉ có cảm xúc mục tiêu
        const fakeTarget: SongFeatures = {
          topicId: "",
          singerIds: [],
          listenNumber: 0,
          like: 0,
          emotions: { sad: 0, happy: 0, chill: 0 }
        };
        fakeTarget.emotions[targetEmotion] = 1; // Đặt cảm xúc mục tiêu cao nhất

        const distance = calculateDistance(
          {
            topicId: song.topicId.toString(),
            singerIds: song.singerIds.map((id: any) => id.toString()),
            listenNumber: song.listenNumber || 0,
            like: song.like || 0,
            emotions: songEmotions
          },
          fakeTarget,
          targetEmotion
        );
        return { song, distance };
      });

      const nearestSongs = distances
        .sort((a, b) => a.distance - b.distance)
        .slice(0, k)
        .map((item) => item.song);

      return nearestSongs;
    }
    // Nếu không có gì, trả về mảng rỗng
    else {
      return [];
    }
  } catch (error) {
    console.error("Error in findSimilarSongs:", error);
    return [];
  }
};