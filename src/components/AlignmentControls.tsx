import React from "react";
import { Button } from "@/components/ui/button";

interface AlignmentControlsProps {
  alignment?: string;
  onChange?: (alignment: string) => void;
}

export const AlignmentControls = ({
  alignment = "left",
  onChange = () => {},
}: AlignmentControlsProps) => {
  return (
    <div className="flex gap-1">
      <Button
        variant={alignment === "left" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("left")}
        className="flex-1"
      >
        Left
      </Button>
      <Button
        variant={alignment === "center" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("center")}
        className="flex-1"
      >
        Center
      </Button>
      <Button
        variant={alignment === "right" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("right")}
        className="flex-1"
      >
        Right
      </Button>
    </div>
  );
};

export default AlignmentControls;
