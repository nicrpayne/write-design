import React from "react";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color?: string;
  onChange?: (color: string) => void;
}

export const ColorPicker = ({
  color = "#000000",
  onChange = () => {},
}: ColorPickerProps) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-md border cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => onChange(color === "#000000" ? "#4361ee" : "#000000")}
      />
      <Input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-24"
      />
    </div>
  );
};

export default ColorPicker;
