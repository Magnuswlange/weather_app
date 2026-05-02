import { GOOGLE_MAPS_API_KEY } from "../config";
import Card from "./Card";

type Props = {
  lat: number;
  lon: number;
};

export default function GoogleMapsCard({ lat, lon }: Props) {
  const mapSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x300&key=${GOOGLE_MAPS_API_KEY}`;

  return (
    <Card title="Map" expand={true}>
      <img src={mapSrc} alt="Google Maps view" className="w-full squircle" />
    </Card>
  );
}
