import Card from "./Card";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000/api/map"
  : "/api/map";

type Props = {
  lat: number;
  lon: number;
  className?: string;
};

export default function GoogleMapsCard({ lat, lon, className = "" }: Props) {
  const mapSrc = `${BASE_URL}?lat=${lat}&lon=${lon}`;

  return (
    <Card title="Map" className={className}>
      <img
        src={mapSrc}
        alt="Google Maps view"
        className="h-full w-full object-cover squircle"
      />
    </Card>
  );
}
