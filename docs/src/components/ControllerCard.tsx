import { Link } from "react-router-dom";

interface ControllerCardProps {
  name: string;
  endpointsCount: number;
}

export function ControllerCard({ name, endpointsCount }: ControllerCardProps) {
  const toLink = "/controller/" + name.toLowerCase().split(" ").join("");

  return (
    <Link
      to={toLink}
      className="px-4 py-6 text-white w-full bg-gray-600 bg-opacity-20 border-gray-700 border-2 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:bg-fuchsia-400 focus:bg-opacity-20 outline-none"
    >
      <div className="md:flex items-center justify-between flex-wrap">
        <h4 className="font-semibold text-lg">{name}</h4>
        <span className="font-semibold text-sm text-gray-400">
          Endpoints: {endpointsCount}
        </span>
      </div>
    </Link>
  );
}
