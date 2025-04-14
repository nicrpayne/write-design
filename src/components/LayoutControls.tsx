import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LayoutControlsProps {
  layout?: { columns: number; columnGap?: number; width?: string };
  onChange?: (layout: any) => void;
}

export const LayoutControls = ({
  layout = { columns: 1 },
  onChange = () => {},
}: LayoutControlsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Columns</Label>
        <Select
          value={layout.columns.toString()}
          onValueChange={(value) =>
            onChange({ ...layout, columns: parseInt(value) })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select columns" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Column</SelectItem>
            <SelectItem value="2">2 Columns</SelectItem>
            <SelectItem value="3">3 Columns</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Column Gap</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[layout.columnGap || 20]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) =>
              onChange({ ...layout, columnGap: value[0] })
            }
          />
          <span className="w-8 text-right">{layout.columnGap || 20}px</span>
        </div>
      </div>
      <div className="pt-2">
        <Label className="mb-2 block">Width</Label>
        <Select
          value={layout.width || "full"}
          onValueChange={(value) => onChange({ ...layout, width: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select width" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full Width</SelectItem>
            <SelectItem value="wide">Wide</SelectItem>
            <SelectItem value="narrow">Narrow</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LayoutControls;
