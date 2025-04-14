import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface TextStyleControlsProps {
  style?: any;
  onChange?: (style: any) => void;
}

export const TextStyleControls = ({
  style = {},
  onChange = () => {},
}: TextStyleControlsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Font Size</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[style.fontSize || 16]}
            min={8}
            max={72}
            step={1}
            onValueChange={(value) =>
              onChange({ ...style, fontSize: value[0] })
            }
          />
          <span className="w-8 text-right">{style.fontSize || 16}px</span>
        </div>
      </div>
      <div>
        <Label>Line Height</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[style.lineHeight || 1.5]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(value) =>
              onChange({ ...style, lineHeight: value[0] })
            }
          />
          <span className="w-8 text-right">{style.lineHeight || 1.5}</span>
        </div>
      </div>
      <div>
        <Label>Letter Spacing</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[style.letterSpacing || 0]}
            min={-2}
            max={10}
            step={0.1}
            onValueChange={(value) =>
              onChange({ ...style, letterSpacing: value[0] })
            }
          />
          <span className="w-8 text-right">{style.letterSpacing || 0}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <Label>Bold</Label>
        <Switch
          checked={style.fontWeight === "bold"}
          onCheckedChange={(checked) =>
            onChange({ ...style, fontWeight: checked ? "bold" : "normal" })
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <Label>Italic</Label>
        <Switch
          checked={style.fontStyle === "italic"}
          onCheckedChange={(checked) =>
            onChange({ ...style, fontStyle: checked ? "italic" : "normal" })
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <Label>Underline</Label>
        <Switch
          checked={style.textDecoration === "underline"}
          onCheckedChange={(checked) =>
            onChange({
              ...style,
              textDecoration: checked ? "underline" : "none",
            })
          }
        />
      </div>
    </div>
  );
};

export default TextStyleControls;
