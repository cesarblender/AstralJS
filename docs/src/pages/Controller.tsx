import { AppBar } from "../components/AppBar";

interface Controller {
  name: string
  type: string
}

function ControllerCards() {
  const controllers: Controller[] = [
    {
      name: "Auth",
      type: "GET"
    },
    {
      name: "To Do",
      type: "POST"
    },
    {
      name: "Notifications",
      type: "PUT"
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
              METHOD: {item.type}
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}

export function Controller() {
  return (
    <div className="bg-gray-950 w-full min-h-screen">
      <AppBar />
      <div className="container mx-auto py-5">
        <div className="px-4">
          <h3 className="text-xl font-semibold text-fuchsia-100 mb-4">Endpoints</h3>
          <ControllerCards />
        </div>
      </div>
    </div>
  );
}
