import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImageControlsProps {
  image?: { src: string; alt: string; caption: string; textWrap?: string };
  onChange?: (image: any) => void;
}

export const ImageControls = ({
  image = { src: "", alt: "", caption: "" },
  onChange = () => {},
}: ImageControlsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Image URL</Label>
        <Input
          type="text"
          value={image.src}
          onChange={(e) => onChange({ ...image, src: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div>
        <Label>Alt Text</Label>
        <Input
          type="text"
          value={image.alt}
          onChange={(e) => onChange({ ...image, alt: e.target.value })}
          placeholder="Descriptive text for the image"
        />
      </div>
      <div>
        <Label>Caption</Label>
        <Input
          type="text"
          value={image.caption}
          onChange={(e) => onChange({ ...image, caption: e.target.value })}
          placeholder="Image caption"
        />
      </div>
      <div className="pt-2">
        <Label className="mb-2 block">Text Wrapping</Label>
        <Select
          value={image.textWrap || "none"}
          onValueChange={(value) => onChange({ ...image, textWrap: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select text wrapping" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="left">Wrap Left</SelectItem>
            <SelectItem value="right">Wrap Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ImageControls;
