import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, X, Copy, Trash } from "lucide-react";

interface PropertiesPanelProps {
  selectedElement?: {
    type: "text" | "image" | "quote" | "sidebar" | "layout" | null;
    id: string;
    properties: any;
  };
  onClose?: () => void;
  onBack?: () => void;
  onPropertyChange?: (id: string, property: string, value: any) => void;
  onDeleteElement?: (id: string) => void;
  onDuplicateElement?: (id: string) => void;
}

const PropertiesPanel = ({
  selectedElement = {
    type: null,
    id: "",
    properties: {},
  },
  onClose = () => {
    console.log("Closing properties panel");
  },
  onBack = () => {
    console.log("Going back from properties panel");
  },
  onPropertyChange = () => {},
  onDeleteElement = () => {},
  onDuplicateElement = () => {},
}: PropertiesPanelProps) => {
  const [activeTab, setActiveTab] = useState("style");

  // Mock color picker component until the real one is implemented
  const ColorPicker = ({
    color = "#000000",
    onChange = (color: string) => {},
  }) => (
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

  // Mock font family picker component until the real one is implemented
  const FontFamilyPicker = ({
    value = "Inter",
    onChange = (font: string) => {},
  }) => (
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

  // Mock alignment controls component until the real one is implemented
  const AlignmentControls = ({
    alignment = "left",
    onChange = (alignment: string) => {},
  }) => (
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

  // Mock spacing controls component until the real one is implemented
  const SpacingControls = ({
    spacing = { top: 0, right: 0, bottom: 0, left: 0 },
    onChange = (spacing: any) => {},
  }) => (
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

  // Mock image controls component until the real one is implemented
  const ImageControls = ({
    image = { src: "", alt: "", caption: "" },
    onChange = (image: any) => {},
  }) => (
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

  // Mock text style controls component until the real one is implemented
  const TextStyleControls = ({ style = {}, onChange = (style: any) => {} }) => (
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

  // Mock layout controls component until the real one is implemented
  const LayoutControls = ({
    layout = { columns: 1 },
    onChange = (layout: any) => {},
  }) => (
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

  const renderElementProperties = () => {
    if (!selectedElement.type) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 text-muted-foreground">
          <p>No element selected</p>
          <p className="text-sm mt-2">
            Select an element on the canvas to edit its properties
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-medium capitalize">
              {selectedElement.type} Properties
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDuplicateElement(selectedElement.id)}
              title="Duplicate"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteElement(selectedElement.id)}
              title="Delete"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="style" className="pt-4 space-y-4">
            {selectedElement.type === "text" && (
              <>
                <div>
                  <Label>Font Family</Label>
                  <FontFamilyPicker
                    value={selectedElement.properties.fontFamily || "Inter"}
                    onChange={(value) =>
                      onPropertyChange(selectedElement.id, "fontFamily", value)
                    }
                  />
                </div>
                <TextStyleControls
                  style={selectedElement.properties}
                  onChange={(style) => {
                    Object.entries(style).forEach(([key, value]) => {
                      onPropertyChange(selectedElement.id, key, value);
                    });
                  }}
                />
                <div>
                  <Label>Text Color</Label>
                  <ColorPicker
                    color={selectedElement.properties.color || "#000000"}
                    onChange={(value) =>
                      onPropertyChange(selectedElement.id, "color", value)
                    }
                  />
                </div>
                <div>
                  <Label>Text Alignment</Label>
                  <AlignmentControls
                    alignment={selectedElement.properties.textAlign || "left"}
                    onChange={(value) =>
                      onPropertyChange(selectedElement.id, "textAlign", value)
                    }
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Label>Drop Cap</Label>
                  <Switch
                    checked={selectedElement.properties.dropCap || false}
                    onCheckedChange={(checked) =>
                      onPropertyChange(selectedElement.id, "dropCap", checked)
                    }
                  />
                </div>
              </>
            )}

            {selectedElement.type === "image" && (
              <ImageControls
                image={selectedElement.properties}
                onChange={(image) => {
                  Object.entries(image).forEach(([key, value]) => {
                    onPropertyChange(selectedElement.id, key, value);
                  });
                }}
              />
            )}

            {selectedElement.type === "quote" && (
              <>
                <div>
                  <Label>Font Family</Label>
                  <FontFamilyPicker
                    value={
                      selectedElement.properties.fontFamily || "Merriweather"
                    }
                    onChange={(value) =>
                      onPropertyChange(selectedElement.id, "fontFamily", value)
                    }
                  />
                </div>
                <div>
                  <Label>Quote Style</Label>
                  <Select
                    value={selectedElement.properties.quoteStyle || "pullquote"}
                    onValueChange={(value) =>
                      onPropertyChange(selectedElement.id, "quoteStyle", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select quote style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pullquote">Pull Quote</SelectItem>
                      <SelectItem value="blockquote">Block Quote</SelectItem>
                      <SelectItem value="callout">Callout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Text Color</Label>
                  <ColorPicker
                    color={selectedElement.properties.color || "#000000"}
                    onChange={(value) =>
                      onPropertyChange(selectedElement.id, "color", value)
                    }
                  />
                </div>
                <div>
                  <Label>Background Color</Label>
                  <ColorPicker
                    color={
                      selectedElement.properties.backgroundColor ||
                      "transparent"
                    }
                    onChange={(value) =>
                      onPropertyChange(
                        selectedElement.id,
                        "backgroundColor",
                        value,
                      )
                    }
                  />
                </div>
              </>
            )}

            {selectedElement.type === "sidebar" && (
              <>
                <div>
                  <Label>Sidebar Title</Label>
                  <Input
                    type="text"
                    value={selectedElement.properties.title || ""}
                    onChange={(e) =>
                      onPropertyChange(
                        selectedElement.id,
                        "title",
                        e.target.value,
                      )
                    }
                    placeholder="Sidebar Title"
                  />
                </div>
                <div>
                  <Label>Background Color</Label>
                  <ColorPicker
                    color={
                      selectedElement.properties.backgroundColor || "#f3f4f6"
                    }
                    onChange={(value) =>
                      onPropertyChange(
                        selectedElement.id,
                        "backgroundColor",
                        value,
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Border Color</Label>
                  <ColorPicker
                    color={selectedElement.properties.borderColor || "#e5e7eb"}
                    onChange={(value) =>
                      onPropertyChange(selectedElement.id, "borderColor", value)
                    }
                  />
                </div>
                <div>
                  <Label>Width</Label>
                  <Select
                    value={selectedElement.properties.width || "medium"}
                    onValueChange={(value) =>
                      onPropertyChange(selectedElement.id, "width", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select width" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="narrow">Narrow</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="wide">Wide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {selectedElement.type === "layout" && (
              <LayoutControls
                layout={selectedElement.properties}
                onChange={(layout) => {
                  Object.entries(layout).forEach(([key, value]) => {
                    onPropertyChange(selectedElement.id, key, value);
                  });
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="layout" className="pt-4 space-y-4">
            <div>
              <Label>Position</Label>
              <Select
                value={selectedElement.properties.position || "static"}
                onValueChange={(value) =>
                  onPropertyChange(selectedElement.id, "position", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="static">Static</SelectItem>
                  <SelectItem value="relative">Relative</SelectItem>
                  <SelectItem value="absolute">Absolute</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Margin</Label>
              <SpacingControls
                spacing={{
                  top: selectedElement.properties.marginTop || 0,
                  right: selectedElement.properties.marginRight || 0,
                  bottom: selectedElement.properties.marginBottom || 0,
                  left: selectedElement.properties.marginLeft || 0,
                }}
                onChange={(spacing) => {
                  onPropertyChange(
                    selectedElement.id,
                    "marginTop",
                    spacing.top,
                  );
                  onPropertyChange(
                    selectedElement.id,
                    "marginRight",
                    spacing.right,
                  );
                  onPropertyChange(
                    selectedElement.id,
                    "marginBottom",
                    spacing.bottom,
                  );
                  onPropertyChange(
                    selectedElement.id,
                    "marginLeft",
                    spacing.left,
                  );
                }}
              />
            </div>

            <div>
              <Label>Padding</Label>
              <SpacingControls
                spacing={{
                  top: selectedElement.properties.paddingTop || 0,
                  right: selectedElement.properties.paddingRight || 0,
                  bottom: selectedElement.properties.paddingBottom || 0,
                  left: selectedElement.properties.paddingLeft || 0,
                }}
                onChange={(spacing) => {
                  onPropertyChange(
                    selectedElement.id,
                    "paddingTop",
                    spacing.top,
                  );
                  onPropertyChange(
                    selectedElement.id,
                    "paddingRight",
                    spacing.right,
                  );
                  onPropertyChange(
                    selectedElement.id,
                    "paddingBottom",
                    spacing.bottom,
                  );
                  onPropertyChange(
                    selectedElement.id,
                    "paddingLeft",
                    spacing.left,
                  );
                }}
              />
            </div>

            {selectedElement.properties.position === "absolute" && (
              <>
                <div>
                  <Label>Position Coordinates</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-xs">Top</Label>
                      <Input
                        type="number"
                        value={selectedElement.properties.top || 0}
                        onChange={(e) =>
                          onPropertyChange(
                            selectedElement.id,
                            "top",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Left</Label>
                      <Input
                        type="number"
                        value={selectedElement.properties.left || 0}
                        onChange={(e) =>
                          onPropertyChange(
                            selectedElement.id,
                            "left",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <Label>Width</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="text"
                  value={selectedElement.properties.width || "auto"}
                  onChange={(e) =>
                    onPropertyChange(
                      selectedElement.id,
                      "width",
                      e.target.value,
                    )
                  }
                />
                <Select
                  value={selectedElement.properties.widthUnit || "px"}
                  onValueChange={(value) =>
                    onPropertyChange(selectedElement.id, "widthUnit", value)
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="px">px</SelectItem>
                    <SelectItem value="%">%</SelectItem>
                    <SelectItem value="auto">auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Height</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="text"
                  value={selectedElement.properties.height || "auto"}
                  onChange={(e) =>
                    onPropertyChange(
                      selectedElement.id,
                      "height",
                      e.target.value,
                    )
                  }
                />
                <Select
                  value={selectedElement.properties.heightUnit || "px"}
                  onValueChange={(value) =>
                    onPropertyChange(selectedElement.id, "heightUnit", value)
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="px">px</SelectItem>
                    <SelectItem value="%">%</SelectItem>
                    <SelectItem value="auto">auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="pt-4 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="appearance">
                <AccordionTrigger>Appearance</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div>
                    <Label>Background Color</Label>
                    <ColorPicker
                      color={
                        selectedElement.properties.backgroundColor ||
                        "transparent"
                      }
                      onChange={(value) =>
                        onPropertyChange(
                          selectedElement.id,
                          "backgroundColor",
                          value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Border</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label className="text-xs">Width</Label>
                        <Input
                          type="number"
                          value={selectedElement.properties.borderWidth || 0}
                          onChange={(e) =>
                            onPropertyChange(
                              selectedElement.id,
                              "borderWidth",
                              parseInt(e.target.value),
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Color</Label>
                        <ColorPicker
                          color={
                            selectedElement.properties.borderColor || "#000000"
                          }
                          onChange={(value) =>
                            onPropertyChange(
                              selectedElement.id,
                              "borderColor",
                              value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Border Radius</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Slider
                        value={[selectedElement.properties.borderRadius || 0]}
                        min={0}
                        max={50}
                        step={1}
                        onValueChange={(value) =>
                          onPropertyChange(
                            selectedElement.id,
                            "borderRadius",
                            value[0],
                          )
                        }
                      />
                      <span className="w-8 text-right">
                        {selectedElement.properties.borderRadius || 0}px
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>Opacity</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Slider
                        value={[
                          selectedElement.properties.opacity !== undefined
                            ? selectedElement.properties.opacity * 100
                            : 100,
                        ]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) =>
                          onPropertyChange(
                            selectedElement.id,
                            "opacity",
                            value[0] / 100,
                          )
                        }
                      />
                      <span className="w-8 text-right">
                        {selectedElement.properties.opacity !== undefined
                          ? Math.round(selectedElement.properties.opacity * 100)
                          : 100}
                        %
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="effects">
                <AccordionTrigger>Effects</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div>
                    <Label>Shadow</Label>
                    <div className="flex items-center justify-between mt-2">
                      <span>Enable Shadow</span>
                      <Switch
                        checked={selectedElement.properties.shadow || false}
                        onCheckedChange={(checked) =>
                          onPropertyChange(
                            selectedElement.id,
                            "shadow",
                            checked,
                          )
                        }
                      />
                    </div>
                    {selectedElement.properties.shadow && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label className="text-xs">Blur</Label>
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[
                                selectedElement.properties.shadowBlur || 5,
                              ]}
                              min={0}
                              max={50}
                              step={1}
                              onValueChange={(value) =>
                                onPropertyChange(
                                  selectedElement.id,
                                  "shadowBlur",
                                  value[0],
                                )
                              }
                            />
                            <span className="w-8 text-right">
                              {selectedElement.properties.shadowBlur || 5}px
                            </span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Color</Label>
                          <ColorPicker
                            color={
                              selectedElement.properties.shadowColor ||
                              "rgba(0,0,0,0.2)"
                            }
                            onChange={(value) =>
                              onPropertyChange(
                                selectedElement.id,
                                "shadowColor",
                                value,
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Transform</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label className="text-xs">Rotate</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            value={[selectedElement.properties.rotate || 0]}
                            min={0}
                            max={360}
                            step={1}
                            onValueChange={(value) =>
                              onPropertyChange(
                                selectedElement.id,
                                "rotate",
                                value[0],
                              )
                            }
                          />
                          <span className="w-8 text-right">
                            {selectedElement.properties.rotate || 0}°
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Scale</Label>
                        <div className="flex items-center gap-2">
                          <Slider
                            value={[
                              selectedElement.properties.scale !== undefined
                                ? selectedElement.properties.scale * 100
                                : 100,
                            ]}
                            min={10}
                            max={200}
                            step={1}
                            onValueChange={(value) =>
                              onPropertyChange(
                                selectedElement.id,
                                "scale",
                                value[0] / 100,
                              )
                            }
                          />
                          <span className="w-8 text-right">
                            {selectedElement.properties.scale !== undefined
                              ? Math.round(
                                  selectedElement.properties.scale * 100,
                                )
                              : 100}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="responsive">
                <AccordionTrigger>Responsive Behavior</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div>
                    <Label>Display on Mobile</Label>
                    <div className="flex items-center justify-between mt-2">
                      <span>Show on Mobile</span>
                      <Switch
                        checked={
                          selectedElement.properties.showOnMobile !== false
                        }
                        onCheckedChange={(checked) =>
                          onPropertyChange(
                            selectedElement.id,
                            "showOnMobile",
                            checked,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Mobile Adjustments</Label>
                    <div className="flex items-center justify-between mt-2">
                      <span>Custom Mobile Styling</span>
                      <Switch
                        checked={
                          selectedElement.properties.customMobileStyling ||
                          false
                        }
                        onCheckedChange={(checked) =>
                          onPropertyChange(
                            selectedElement.id,
                            "customMobileStyling",
                            checked,
                          )
                        }
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="custom">
                <AccordionTrigger>Custom CSS</AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div>
                    <Label>Custom CSS</Label>
                    <textarea
                      className="w-full h-32 mt-2 p-2 border rounded-md font-mono text-sm"
                      value={selectedElement.properties.customCSS || ""}
                      onChange={(e) =>
                        onPropertyChange(
                          selectedElement.id,
                          "customCSS",
                          e.target.value,
                        )
                      }
                      placeholder="Enter custom CSS here..."
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <Card className="h-full w-full bg-background border-l rounded-none">
      <CardContent className="p-0 h-full">
        <ScrollArea className="h-full">
          <div className="p-4">{renderElementProperties()}</div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PropertiesPanel;
