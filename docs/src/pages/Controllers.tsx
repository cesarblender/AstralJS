import { AppBar } from "../components/AppBar";
import { ControllerCards } from "../components/ControllerCards";

export function Controllers() {
  const controllers = [
    {
      name: "Auth",
      endpointsCount: 2,
    },
    {
      name: "To Do",
      endpointsCount: 4,
    },
    {
      name: "Notifications",
      endpointsCount: 3,
    },
  ];

  return (
    <div className="bg-gray-950 w-full min-h-screen">
      <AppBar />
      <div className="container mx-auto py-5">
        <div className="px-4">
          <h3 className="text-xl font-semibold text-fuchsia-100 mb-4">
            Controllers
          </h3>
          <ControllerCards controllers={controllers} />
        </div>
      </div>
    </div>
  );
}
