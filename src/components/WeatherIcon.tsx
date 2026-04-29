type Props = {
  src: string;
  alt: string;
  className?: string; // make it optional
};

export default function WeatherIcon({ src, alt, className }: Props) {
  return (
    <img
      className={className}
      fetchPriority="high"
      src={`https://openweathermap.org/payload/api/media/file/${src}.png`}
      alt={alt}
    />
  );
}
