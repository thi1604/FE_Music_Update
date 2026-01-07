// Danh sách từ khóa cảm xúc
const emotionKeywords = {
  sad: [
    // Từ khóa gốc của bạn
    'buồn', 'khóc', 'cô đơn', 'đau', 'nhớ', 'xa', 'chia tay', 'mất', 'tiếc', 'hối hận',
    'tuyệt vọng', 'lạc lõng', 'thất vọng', 'nước mắt', 'đổ vỡ', 'chán nản', 'đơn độc',
    'tổn thương', 'lặng lẽ', 'bỏ rơi', 'tạm biệt', 'vắng', 'lỡ làng', 'trống vắng', 'xót xa',
    'day dứt', 'giận', 'ghen', 'thất tình', 'băng giá', 'lạnh lùng', 'chìm', 'tàn phai',
    // Bổ sung từ dữ liệu thực tế (Lạc Trôi, Cắt Đôi Nỗi Sầu, Thiên Lý Ơi...)
    'nỗi sầu', 'nỗi đau', 'vỡ tan', 'hao gầy', 'bâng khuâng', 'lạc trôi', 'vàng úa', 'u sầu',
    'cơn mưa', 'buông tay', 'dở dang', 'chia lìa', 'phôi pha', 'ướt mi',
    // English
    'sad', 'cry', 'lonely', 'pain', 'miss', 'apart', 'break up', 'lost', 'regret', 'tears',
    'despair', 'disappointed', 'broken', 'sorrow', 'hurt', 'alone', 'farewell', 'goodbye',
    'empty', 'cold', 'heartbroken', 'blue', 'down', 'grief', 'mourn', 'depressed'
  ],
  happy: [
    // Từ khóa gốc của bạn
    'vui', 'hạnh phúc', 'yêu', 'cười', 'hân hoan', 'rộn ràng', 'tươi', 'ấm áp',
    'rực rỡ', 'tỏa sáng', 'thành công', 'may mắn', 'vui vẻ', 'phấn khởi',
    'mơ mộng', 'ngọt ngào', 'tràn đầy', 'hy vọng', 'tưng bừng', 'tươi sáng', 'vui sướng',
    'mỉm cười', 'say mê', 'đam mê', 'vui tươi', 'vui mừng', 'vui nhộn', 'hào hứng',
    // Bổ sung từ dữ liệu thực tế (Chăm Hoa, Đừng Làm Trái Tim Anh Đau...)
    'nụ cười', 'mặt trời', 'ngân nga', 'say hi', 'màu hồng', 'nhịp đập', 'nồng cháy',
    'bên em', 'muốn yêu', 'thương em', 'tình yêu',
    // English
    'happy', 'smile', 'love', 'laugh', 'joy', 'cheerful', 'delight', 'excited', 'bright',
    'warm', 'success', 'lucky', 'sweet', 'hope', 'dream', 'fun', 'enjoy', 'pleasure',
    'positive', 'optimistic', 'sunny', 'glad', 'bliss', 'ecstatic', 'grateful'
  ],
  chill: [
    // Từ khóa gốc của bạn
    'nhẹ nhàng', 'bình yên', 'thư giãn', 'êm đềm', 'dịu dàng', 'trong trẻo',
    'lặng', 'mơ màng', 'lững thững', 'thong dong', 'thảnh thơi', 'tĩnh lặng',
    'mênh mông', 'gió', 'biển', 'mưa', 'hoàng hôn', 'bình minh', 'mơ hồ',
    // Bổ sung từ dữ liệu thực tế (Nấu Ăn Cho Em, Cứ Chill Thôi...)
    'mây', 'nắng', 'phiêu bồng', 'lang thang', 'nhẹ trôi', 'vu vơ', 'nghêu ngao',
    'lá lá lá', 'chill', 'trong lành', 'thênh thang',
    // English
    'chill', 'relax', 'peaceful', 'calm', 'gentle', 'serene', 'quiet', 'soft',
    'easy', 'laid-back', 'soothing', 'tranquil', 'breeze', 'ocean', 'rain',
    'sunset', 'sunrise', 'dreamy', 'floating', 'slow', 'ambient', 'mellow', 'cozy'
  ]
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