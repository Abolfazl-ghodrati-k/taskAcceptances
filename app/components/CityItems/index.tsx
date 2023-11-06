"use client";

import React, { useCallback, useState } from "react";
import CityItem from "../CityItem";
import { City } from "../types";

const CityItems = ({ areas }: { areas: City[] }) => {
  const [selectedAreas, setSelectedAreas] = useState<City[]>(
    areas.map((area) => ({ ...area, selected: false }))
  );

  const onSelect = useCallback((name: string) => {
    setSelectedAreas((prevSelectedAreas) => {
      const updatedSelectedAreas = prevSelectedAreas.map((city) =>
        city.name === name ? { ...city, selected: true } : city
      );
      return updatedSelectedAreas;
    });
  }, []);

  const onDeselect = useCallback((name: string) => {
    setSelectedAreas((prevSelectedAreas) => {
      const updatedSelectedAreas = prevSelectedAreas.map((city) =>
        city.name === name ? { ...city, selected: false } : city
      );
      return updatedSelectedAreas;
    });
  }, []);

  return (
    <div className="flex flex-col items-start justify-center w-full gap-2 mt-4">
      {areas.map((area) => (
        <CityItem
          key={area.name}
          onSelect={onSelect}
          onDeselect={onDeselect}
          area={area}
        />
      ))}
    </div>
  );
};

export default CityItems;
