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
    // Lấy tất cả bài hát từ database
    const allSongs = await Song.find({ deleted: false, status: "active" });

    // Xác định cảm xúc mục tiêu từ từ khóa tìm kiếm nếu có
    const targetEmotion = searchKeyword ? getEmotionFromKeyword(searchKeyword) : null;

    // Phân tích cảm xúc của bài hát mục tiêu
    const targetEmotions = targetSong.lyrics ? analyzeLyricEmotion(targetSong.lyrics) : null;

    // Tính khoảng cách từ bài hát mục tiêu đến tất cả bài hát khác
    const distances = allSongs
      .filter((song) => song._id.toString() !== targetSong._id.toString())
      .map((song) => {
        // Phân tích cảm xúc của bài hát so sánh
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

    // Sắp xếp theo khoảng cách và lấy k bài hát gần nhất
    const nearestSongs = distances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, k)
      .map((item) => item.song);

    return nearestSongs;
  } catch (error) {
    console.error("Error in findSimilarSongs:", error);
    return [];
  }
};