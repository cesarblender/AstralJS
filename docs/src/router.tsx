import { createBrowserRouter, useLoaderData } from "react-router-dom";

import { Controllers } from "./pages/Controllers";
import { Controller } from "./pages/Controller";

// const A = () => {
//   const data = useLoaderData() as any;

//   return (
//     <div>
//         <div>{data.controller_id}</div>
//         <div>{data.endpoint_id}</div>
//     </div>
//   );
// };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Controllers />,
  },
  {
    path: "/controller/:controller_id",
    element: <Controller />,
    loader: ({ params }) => params,
  },
//   {
//     path: "/endpoint/:endpoint_id",
//     element: <A />,
//     loader: ({ params }) => params,
//   },
]);
