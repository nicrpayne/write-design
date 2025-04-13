import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  Move,
  Columns,
  Type,
  Image,
  Quote,
  Sidebar,
  Undo,
  Redo,
  Save,
  Eye,
  Layout,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import CanvasToolbar from "./CanvasToolbar";
import PropertiesPanel from "./PropertiesPanel";

interface EditorialCanvasProps {
  initialZoom?: number;
  showPropertiesPanel?: boolean;
}

const EditorialCanvas = ({
  initialZoom = 100,
  showPropertiesPanel = true,
}: EditorialCanvasProps) => {
  const [zoom, setZoom] = useState(initialZoom);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [canvasElements, setCanvasElements] = useState<
    Array<{
      id: string;
      type: "text" | "image" | "quote" | "sidebar";
      content: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
      style?: Record<string, any>;
    }>
  >([]);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleElementSelect = (id: string) => {
    setSelectedElement(id);
  };

  const handleAddElement = (type: "text" | "image" | "quote" | "sidebar") => {
    const newElement = {
      id: `element-${Date.now()}`,
      type,
      content:
        type === "text"
          ? "Add your text here"
          : type === "image"
            ? "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
            : type === "quote"
              ? "Add a quote here"
              : "Sidebar content",
      position: { x: 100, y: 100 },
      size: { width: 300, height: type === "image" ? 200 : 100 },
      style: {},
    };

    setCanvasElements([...canvasElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const handleElementDrag = (
    id: string,
    position: { x: number; y: number },
  ) => {
    setCanvasElements(
      canvasElements.map((element) =>
        element.id === id ? { ...element, position } : element,
      ),
    );
  };

  const handleElementResize = (
    id: string,
    size: { width: number; height: number },
  ) => {
    setCanvasElements(
      canvasElements.map((element) =>
        element.id === id ? { ...element, size } : element,
      ),
    );
  };

  const handleElementUpdate = (
    id: string,
    updates: Partial<{
      content: string;
      style: Record<string, any>;
    }>,
  ) => {
    setCanvasElements(
      canvasElements.map((element) =>
        element.id === id ? { ...element, ...updates } : element,
      ),
    );
  };

  const handleDeleteElement = (id: string) => {
    setCanvasElements(canvasElements.filter((element) => element.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const getCanvasWidth = () => {
    switch (viewMode) {
      case "mobile":
        return 375;
      case "tablet":
        return 768;
      default:
        return 1200;
    }
  };

  const selectedElementData = selectedElement
    ? canvasElements.find((element) => element.id === selectedElement)
    : null;

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <CanvasToolbar
        onAddElement={handleAddElement}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative overflow-hidden bg-muted/20">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-sm">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.max(25, zoom - 25))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>

            <Slider
              value={[zoom]}
              min={25}
              max={200}
              step={5}
              className="w-32"
              onValueChange={handleZoomChange}
            />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(Math.min(200, zoom + 25))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            <span className="text-xs font-medium">{zoom}%</span>
          </div>

          <ScrollArea className="h-full w-full">
            <div className="min-h-[2000px] min-w-[2000px] p-16 flex justify-center">
              <div
                className={`relative bg-white shadow-lg transition-all duration-300 mx-auto`}
                style={{
                  width: getCanvasWidth(),
                  minHeight: 1200,
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top center",
                }}
              >
                {canvasElements.map((element) => (
                  <motion.div
                    key={element.id}
                    className={`absolute cursor-move border-2 ${selectedElement === element.id ? "border-primary" : "border-transparent"}`}
                    style={{
                      left: element.position.x,
                      top: element.position.y,
                      width: element.size.width,
                      height: element.size.height,
                      ...element.style,
                    }}
                    drag
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(_, info) => {
                      setIsDragging(false);
                      handleElementDrag(element.id, {
                        x: element.position.x + info.offset.x,
                        y: element.position.y + info.offset.y,
                      });
                    }}
                    onClick={() =>
                      !isDragging && handleElementSelect(element.id)
                    }
                  >
                    {element.type === "text" && (
                      <div className="w-full h-full p-2 overflow-auto">
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          className="w-full h-full focus:outline-none"
                          onBlur={(e) =>
                            handleElementUpdate(element.id, {
                              content: e.currentTarget.textContent || "",
                            })
                          }
                        >
                          {element.content}
                        </div>
                      </div>
                    )}

                    {element.type === "image" && (
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src={element.content}
                          alt="Canvas element"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {element.type === "quote" && (
                      <div className="w-full h-full p-4 bg-muted/20 flex items-center justify-center">
                        <blockquote className="text-xl italic font-serif text-center">
                          <div
                            contentEditable
                            suppressContentEditableWarning
                            className="focus:outline-none"
                            onBlur={(e) =>
                              handleElementUpdate(element.id, {
                                content: e.currentTarget.textContent || "",
                              })
                            }
                          >
                            {element.content}
                          </div>
                        </blockquote>
                      </div>
                    )}

                    {element.type === "sidebar" && (
                      <div className="w-full h-full p-3 bg-muted/10 border-l-4 border-primary">
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          className="w-full h-full text-sm focus:outline-none"
                          onBlur={(e) =>
                            handleElementUpdate(element.id, {
                              content: e.currentTarget.textContent || "",
                            })
                          }
                        >
                          {element.content}
                        </div>
                      </div>
                    )}

                    {selectedElement === element.id && (
                      <div className="absolute -bottom-6 -right-6 flex gap-1">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-5 text-xs"
                          onClick={() => handleDeleteElement(element.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        {showPropertiesPanel && selectedElementData && (
          <PropertiesPanel
            element={selectedElementData}
            onUpdate={(updates) =>
              handleElementUpdate(selectedElementData.id, updates)
            }
            onResize={(size) =>
              handleElementResize(selectedElementData.id, size)
            }
          />
        )}
      </div>
    </div>
  );
};

export default EditorialCanvas;
