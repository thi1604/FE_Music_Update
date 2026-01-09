// MicRecorderComponent.tsx
import React, { useRef, useState, useEffect } from "react";

const getSupportedMimeType = () => {
  if (MediaRecorder.isTypeSupported("audio/webm")) return "audio/webm";
  if (MediaRecorder.isTypeSupported("audio/wav")) return "audio/wav";
  if (MediaRecorder.isTypeSupported("audio/mp4")) return "audio/mp4";
  return "";
};

interface MicRecordProps {
  onAudioReady?: (audioBlob: Blob) => void;
}

const MicRecord: React.FC<MicRecordProps> = ({ onAudioReady }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Bắt đầu ghi âm
  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Trình duyệt không hỗ trợ ghi âm!");
      return;
    }
    setRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false, // TẮT: Vì nó làm méo tiếng nhạc
        noiseSuppression: false, // TẮT: Để giữ nguyên dải tần của nhạc
        autoGainControl: false,  // TẮT: Tránh việc âm lượng tự động tăng giảm gây rè
        sampleRate: 44100,       // Chuẩn âm nhạc (hoặc 48000)
        channelCount: 1         // Mono để giảm kích thước file
      }
    });
    const mimeType = getSupportedMimeType();
    const options = {
      mimeType,
      audioBitsPerSecond: 128000 // Tăng lên 128kbps để chất lượng rõ hơn
    };
    mediaRecorderRef.current = new MediaRecorder(stream, options);
    chunksRef.current = [];
    mediaRecorderRef.current.ondataavailable = (e: BlobEvent) => {
      if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
      setAudioBlob(blob);
    };
    mediaRecorderRef.current.start();
  };

  // Dừng ghi âm
  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  // Khi ghi âm kết thúc, tự động upload
  useEffect(() => {
    // if (audioBlob) {
    //   // uploadAudio();
    // }
    if (audioBlob && onAudioReady) {
      onAudioReady(audioBlob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob, onAudioReady]);

  // Gửi file audio lên backend

  return (
    <div style={{ textAlign: "center", maxWidth: "120px", margin: "0 auto", padding: "12px 16px", borderRadius: "18px", background: 'transparent', boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}>
      <button
        onClick={recording ? stopRecording : startRecording}
        style={{ fontSize: "1.3rem", padding: "0.7rem", borderRadius: "50%", background: recording ? "#ff5252" : "#00ADEF", color: "white", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
      >
        {recording ? "⏹️" : "🎤"}
      </button>
    </div>
  );
};

export default MicRecord;