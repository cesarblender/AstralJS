import { AppBar } from "../components/AppBar";

interface Controller {
  name: string
  endpointsCount: number
}

function ControllerCards() {
  const controllers: Controller[] = [
    {
      name: "Auth",
      endpointsCount: 2
    },
    {
      name: "To Do",
      endpointsCount: 4
    },
    {
      name: "Notifications",
      endpointsCount: 3
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {controllers.map((item) => (
        <a href="#" className="px-4 py-6 text-white w-full bg-gray-600 bg-opacity-20 border-gray-700 border-2 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:bg-fuchsia-400 focus:bg-opacity-20 outline-none">
          <div className="md:flex items-center justify-between flex-wrap">
            <h4 className="font-semibold text-lg">
              {item.name}
            </h4>
            <span className="font-semibold text-sm text-gray-400">
              Endpoints: {item.endpointsCount}
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}

export function Controllers() {
  return (
    <div className="bg-gray-950 w-full min-h-screen">
      <AppBar />
      <div className="container mx-auto py-5">
        <div className="px-4">
          <h3 className="text-xl font-semibold text-fuchsia-100 mb-4">Controllers</h3>
          <ControllerCards />
        </div>
      </div>
    </div>
  );
}
