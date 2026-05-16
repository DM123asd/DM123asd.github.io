// 可复用的视频背景组件（自动静音循环、居中适配、带遮罩）
interface VideoBgProps {
  className?: string;
  src?: string;
}

export function VideoBg({ className = '', src = '/assets/videos/mp_.mp4' }: VideoBgProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden z-0 ${className}`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* 遮罩保证文字可读 */}
      <div className="absolute inset-0 bg-background/70" />
    </div>
  );
}
