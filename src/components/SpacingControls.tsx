import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SpacingControlsProps {
  spacing?: { top: number; right: number; bottom: number; left: number };
  onChange?: (spacing: any) => void;
}

export const SpacingControls = ({
  spacing = { top: 0, right: 0, bottom: 0, left: 0 },
  onChange = () => {},
}: SpacingControlsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Top</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[spacing.top]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => onChange({ ...spacing, top: value[0] })}
          />
          <span className="w-8 text-right">{spacing.top}</span>
        </div>
      </div>
      <div>
        <Label>Right</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[spacing.right]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => onChange({ ...spacing, right: value[0] })}
          />
          <span className="w-8 text-right">{spacing.right}</span>
        </div>
      </div>
      <div>
        <Label>Bottom</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[spacing.bottom]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) =>
              onChange({ ...spacing, bottom: value[0] })
            }
          />
          <span className="w-8 text-right">{spacing.bottom}</span>
        </div>
      </div>
      <div>
        <Label>Left</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[spacing.left]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => onChange({ ...spacing, left: value[0] })}
          />
          <span className="w-8 text-right">{spacing.left}</span>
        </div>
      </div>
    </div>
  );
};

export default SpacingControls;
