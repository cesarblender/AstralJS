import React from "react";
import { ControllerCard } from "./ControllerCard";

interface Controller {
  name: string;
  endpointsCount: number;
}

interface ControllerCardsProps {
  controllers: Controller[];
}

export function ControllerCards({ controllers }: ControllerCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {controllers.map((item, index) => (
        <ControllerCard
          key={index}
          name={item.name}
          endpointsCount={item.endpointsCount}
        />
      ))}
    </div>
  );
}
