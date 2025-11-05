// Danh sách từ khóa cảm xúc
const emotionKeywords = {
  sad: ['buồn', 'khóc', 'cô đơn', 'đau', 'nhớ', 'xa', 'chia tay', 'mất', 'tiếc', 'hối hận'],
  happy: ['vui', 'hạnh phúc', 'yêu', 'cười', 'hân hoan', 'rộn ràng', 'tươi', 'hân hoan'],
  chill: ['nhẹ nhàng', 'bình yên', 'thư giãn', 'êm đềm', 'dịu dàng', 'trong trẻo']
};

export const analyzeLyricEmotion = (lyrics: string): { sad: number; happy: number; chill: number } => {
  const lowercaseLyrics = lyrics.toLowerCase();
  const result = {
    sad: 0,
    happy: 0,
    chill: 0
  };

  // Đếm số lần xuất hiện của từng loại từ khóa
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = lowercaseLyrics.match(regex);
      if (matches) {
        result[emotion] += matches.length;
      }
    });
  });

  // Chuẩn hóa điểm cảm xúc
  const total = result.sad + result.happy + result.chill;
  if (total > 0) {
    result.sad = result.sad / total;
    result.happy = result.happy / total;
    result.chill = result.chill / total;
  }

  return result;
};

export const getEmotionFromKeyword = (keyword: string): string | null => {
  keyword = keyword.toLowerCase();
  
  if (keyword.includes('buồn')) return 'sad';
  if (keyword.includes('vui')) return 'happy';
  if (keyword.includes('chill')) return 'chill';
  
  return null;
}