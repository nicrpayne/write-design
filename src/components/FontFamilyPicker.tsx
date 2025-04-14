import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FontFamilyPickerProps {
  value?: string;
  onChange?: (font: string) => void;
}

export const FontFamilyPicker = ({
  value = "Inter",
  onChange = () => {},
}: FontFamilyPickerProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select font" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Inter">Inter</SelectItem>
        <SelectItem value="Roboto">Roboto</SelectItem>
        <SelectItem value="Merriweather">Merriweather</SelectItem>
        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
        <SelectItem value="Montserrat">Montserrat</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FontFamilyPicker;
