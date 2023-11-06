import React from "react";
import Select from "../Select";
import { CityItemProps } from "./types";

const CityItem = ({ area, onDeselect, onSelect }: CityItemProps) => {
  // there is other way for styling this list, and that would be rendering a div after each city item
  
  return (
    <div className="flex items-center justify-between pb-2 border-b border-b-slate-200 w-full">
      <p>{area.name}</p>
      <Select
        onSelect={() => onSelect(area.name)}
        onDeselect={() => onDeselect(area.name)}
      />
    </div>
  );
};

export default CityItem;
