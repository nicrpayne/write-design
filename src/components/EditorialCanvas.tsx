import React, { useState, forwardRef, useImperativeHandle } from "react";
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
  GripVertical,
  Edit,
  Palette,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import CanvasToolbar from "./CanvasToolbar";
import PropertiesPanel from "./PropertiesPanel";

export interface CanvasElement {
  id: string;
  type: "text" | "image" | "quote" | "sidebar";
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style?: Record<string, string | number>;
}

export interface EditorialCanvasProps {
  initialZoom?: number;
  showPropertiesPanel?: boolean;
  onCanvasChange?: () => void;
}

export interface EditorialCanvasRef {
  handleAddElement: (type: string) => void;
  setPendingElementType: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<string | null>>;
  addElementAtPosition: (type: string, x: number, y: number) => void;
}

const EditorialCanvas = forwardRef<EditorialCanvasRef, EditorialCanvasProps>(
  (
    {
      initialZoom = 100,
      showPropertiesPanel = true,
      onCanvasChange = () => void 0,
    }: EditorialCanvasProps,
    ref,
  ) => {
    const [zoom, setZoom] = useState(initialZoom);
    const [selectedElement, setSelectedElement] = useState<string | null>(null);
    const [pendingElementType, setPendingElementType] = useState<string | null>(
      null,
    );
    const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
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

    const handleAddElement = (type: string) => {
      onCanvasChange();
      console.log(`Adding element of type: ${type}`);

      // Set the pending element type to show the cursor change
      setPendingElementType(type);
      document.body.classList.add("adding-element");

      // If we want to directly add without waiting for a click
      // const canvasWidth = getCanvasWidth();
      // addElementAtPosition(type, canvasWidth / 2 - 150, 200);
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
      onCanvasChange();
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
      onCanvasChange();
    };

    const handleElementUpdate = (
      id: string,
      updates: Partial<{
        content: string;
        style?: Record<string, string | number>;
      }>,
    ) => {
      setCanvasElements(
        canvasElements.map((element) =>
          element.id === id ? { ...element, ...updates } : element,
        ),
      );
      onCanvasChange();
    };

    const handleDeleteElement = (id: string) => {
      setCanvasElements(canvasElements.filter((element) => element.id !== id));
      if (selectedElement === id) {
        setSelectedElement(null);
      }
      onCanvasChange();
    };

    // Helper function to add an element at a specific position
    const addElementAtPosition = (type: string, x: number, y: number) => {
      // Create a new element and focus it for immediate editing
      if (type === "text") {
        const newElement: CanvasElement = {
          id: `element-${Date.now()}`,
          type: "text",
          content: "Add your text here",
          position: { x, y },
          size: { width: 300, height: 100 },
          style: {},
        };
        setCanvasElements([...canvasElements, newElement]);
        // Don't immediately select the element for property editing
        // This allows the user to start typing right away
        setPendingElementType(null);
        document.body.classList.remove("adding-element");
        onCanvasChange();

        // Focus the newly created text element after a short delay
        setTimeout(() => {
          const textElement = document.querySelector(
            `[data-element-id="${newElement.id}"] [contenteditable]`,
          );
          if (textElement) {
            (textElement as HTMLElement).focus();
            // Select all text to make it easy to replace
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(textElement);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }, 100);
      } else if (type === "image") {
        const newElement: CanvasElement = {
          id: `element-${Date.now()}`,
          type: "image",
          content:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
          position: { x, y },
          size: { width: 300, height: 200 },
          style: {},
        };
        setCanvasElements([...canvasElements, newElement]);
        setSelectedElement(newElement.id);
        setPendingElementType(null);
        document.body.classList.remove("adding-element");
        onCanvasChange();
      } else if (type === "quote") {
        const newElement: CanvasElement = {
          id: `element-${Date.now()}`,
          type: "quote",
          content: "Add a quote here",
          position: { x, y },
          size: { width: 300, height: 100 },
          style: {},
        };
        setCanvasElements([...canvasElements, newElement]);
        setSelectedElement(newElement.id);
        setPendingElementType(null);
        document.body.classList.remove("adding-element");
        onCanvasChange();
      } else if (type === "sidebar") {
        const newElement: CanvasElement = {
          id: `element-${Date.now()}`,
          type: "sidebar",
          content: "Sidebar content",
          position: { x, y },
          size: { width: 300, height: 100 },
          style: {},
        };
        setCanvasElements([...canvasElements, newElement]);
        setSelectedElement(newElement.id);
        setPendingElementType(null);
        document.body.classList.remove("adding-element");
        onCanvasChange();
      }
    };

    // Expose methods to parent component via ref
    useImperativeHandle(ref, () => ({
      handleAddElement,
      setPendingElementType,
      setSelectedElement,
      addElementAtPosition,
    }));

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

            <div className="h-full w-full overflow-auto">
              <div className="min-h-[2000px] min-w-[3000px] p-16 flex justify-center canvas-area relative">
                <div
                  id="canvas-container"
                  className={`absolute bg-white shadow-lg transition-all duration-300 ${pendingElementType ? "cursor-crosshair" : "cursor-default"} hover:ring-2 hover:ring-primary/30`}
                  style={{
                    width: getCanvasWidth(),
                    minHeight: 1200,
                    left: "50%",
                    transform: `translateX(-50%) scale(${zoom / 100})`,
                    transformOrigin: "top center",
                  }}
                  onClick={(e) => {
                    // If we clicked directly on the canvas (not on an element)
                    if (e.target === e.currentTarget) {
                      if (pendingElementType) {
                        // Get click position relative to the canvas
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        // Add the element at the clicked position
                        addElementAtPosition(pendingElementType, x, y);
                      } else {
                        // If not adding an element, deselect
                        setSelectedElement(null);
                      }
                    }
                  }}
                >
                  {canvasElements.map((element) => (
                    <motion.div
                      key={element.id}
                      data-element-id={element.id}
                      className={`absolute ${element.type === "text" ? "cursor-default" : "cursor-move"} border-2 ${selectedElement === element.id ? "border-primary" : "border-transparent hover:border-primary/50"}`}
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
                      onDragEnd={(event, info) => {
                        setIsDragging(false);
                        // Calculate the final position directly from the current DOM position
                        // rather than using offset which can cause jumping
                        const elementRect =
                          event.currentTarget.getBoundingClientRect();
                        const canvasRect = document
                          .getElementById("canvas-container")
                          ?.getBoundingClientRect();

                        if (canvasRect) {
                          const newX =
                            (elementRect.left - canvasRect.left) / (zoom / 100);
                          const newY =
                            (elementRect.top - canvasRect.top) / (zoom / 100);

                          handleElementDrag(element.id, {
                            x: newX,
                            y: newY,
                          });
                        }
                      }}
                      onClick={(e) => {
                        // Only select the element if we're not clicking on an editable area
                        const isClickingEditableContent =
                          e.target instanceof HTMLElement &&
                          (e.target.getAttribute("contenteditable") ===
                            "true" ||
                            e.target.closest('[contenteditable="true"]'));

                        if (!isClickingEditableContent) {
                          e.stopPropagation();
                          if (!isDragging) {
                            handleElementSelect(element.id);
                          }
                        }
                      }}
                    >
                      {element.type === "text" && (
                        <div
                          className="w-full h-full p-2 overflow-auto relative group"
                          onMouseDown={(e) => {
                            // If clicking on the container but not the editable content,
                            // allow dragging the entire element
                            if (e.target === e.currentTarget) {
                              e.stopPropagation();
                            }
                          }}
                        >
                          {/* Visual indicators for interaction areas */}
                          <div className="absolute -top-8 left-0 right-0 text-xs text-center bg-background/90 text-muted-foreground rounded py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center gap-2">
                            <span className="flex items-center">
                              <GripVertical className="h-3 w-3 mr-1" /> Drag
                              from border
                            </span>
                            <span className="mx-1">•</span>
                            <span className="flex items-center">
                              <Edit className="h-3 w-3 mr-1" /> Click text to
                              edit
                            </span>
                            <span className="mx-1">•</span>
                            <span className="flex items-center">
                              <Palette className="h-3 w-3 mr-1" /> Click border
                              for styling
                            </span>
                          </div>

                          {/* Drag handle indicators at the corners and edges */}
                          <div className="absolute inset-0 border-4 border-dashed border-primary/20 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                          <div className="absolute top-0 left-0 w-4 h-4 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none translate-x-1/2 translate-y-1/2"></div>

                          <div
                            contentEditable
                            suppressContentEditableWarning
                            className="w-full h-full focus:outline-none cursor-text"
                            onMouseDown={(e) => {
                              // Prevent dragging when clicking inside the text area
                              e.stopPropagation();
                              // Prevent the parent motion.div from handling this event
                              e.nativeEvent.stopImmediatePropagation();
                            }}
                            onClick={(e) => {
                              // Make sure the element is focused for editing
                              e.currentTarget.focus();
                              // Select all text on first click
                              if (
                                e.currentTarget.textContent ===
                                "Add your text here"
                              ) {
                                const selection = window.getSelection();
                                const range = document.createRange();
                                range.selectNodeContents(e.currentTarget);
                                selection?.removeAllRanges();
                                selection?.addRange(range);
                              }
                              // Also set the selected element to null to ensure properties panel is hidden
                              setSelectedElement(null);
                            }}
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
                              className="focus:outline-none cursor-text"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.currentTarget.focus();
                                // Prevent the parent element's click handler
                                e.nativeEvent.stopImmediatePropagation();
                              }}
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
                            className="w-full h-full text-sm focus:outline-none cursor-text"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.currentTarget.focus();
                              // Prevent the parent element's click handler
                              e.nativeEvent.stopImmediatePropagation();
                            }}
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
                        <>
                          <div className="absolute -bottom-6 -right-6 flex gap-1">
                            <Button
                              variant="destructive"
                              size="sm"
                              className="h-5 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                                handleDeleteElement(element.id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                          {element.type === "text" && (
                            <div className="absolute -top-8 left-0 right-0 text-xs text-center bg-primary text-primary-foreground rounded py-1 pointer-events-none flex items-center justify-center gap-2">
                              <span className="flex items-center">
                                <GripVertical className="h-3 w-3 mr-1" /> Drag
                                from border
                              </span>
                              <span className="mx-1">•</span>
                              <span className="flex items-center">
                                <Edit className="h-3 w-3 mr-1" /> Click text to
                                edit
                              </span>
                              <span className="mx-1">•</span>
                              <span className="flex items-center">
                                <Palette className="h-3 w-3 mr-1" /> Click
                                border for styling
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {showPropertiesPanel && selectedElementData && (
            <PropertiesPanel
              selectedElement={{
                type: selectedElementData.type,
                id: selectedElementData.id,
                properties: {
                  ...selectedElementData.style,
                  content: selectedElementData.content,
                },
              }}
              onPropertyChange={(id, property, value) => {
                if (property === "content") {
                  handleElementUpdate(id, { content: value as string });
                } else {
                  handleElementUpdate(id, {
                    style: {
                      ...(selectedElementData.style || {}),
                      [property]: value,
                    },
                  });
                }
              }}
              onDeleteElement={handleDeleteElement}
              onDuplicateElement={(id) => {
                const elementToDuplicate = canvasElements.find(
                  (el) => el.id === id,
                );
                if (elementToDuplicate) {
                  const newElement = {
                    ...elementToDuplicate,
                    id: `element-${Date.now()}`,
                    position: {
                      x: elementToDuplicate.position.x + 20,
                      y: elementToDuplicate.position.y + 20,
                    },
                  };
                  setCanvasElements([...canvasElements, newElement]);
                  setSelectedElement(newElement.id);
                  onCanvasChange();
                }
              }}
              onClose={() => setSelectedElement(null)}
              onBack={() => setSelectedElement(null)}
            />
          )}
        </div>
      </div>
    );
  },
);

EditorialCanvas.displayName = "EditorialCanvas";

export default EditorialCanvas;
