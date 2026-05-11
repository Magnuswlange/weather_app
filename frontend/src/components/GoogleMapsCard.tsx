import { GOOGLE_MAPS_API_KEY } from "../config";
import Card from "./Card";

type Props = {
  lat: number;
  lon: number;
  className?: string;
};

export default function GoogleMapsCard({ lat, lon, className = "" }: Props) {
  const mapSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=600x600&key=${GOOGLE_MAPS_API_KEY}`;

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
