import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import EditorialCanvas from "./EditorialCanvas";
import CanvasToolbar from "./CanvasToolbar";

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const canvasRef = useRef(null);

  const [isDirty, setIsDirty] = useState(false);
  const [articleTitle, setArticleTitle] = useState(
    isNew ? "Untitled Article" : `Article #${id}`,
  );

  const handleSave = () => {
    // In a real app, this would save to a database
    setIsDirty(false);
    // For demo purposes, we'll just show an alert
    alert(`Saved: ${articleTitle}`);
  };

  const handleCanvasChange = () => {
    setIsDirty(true);
  };

  const handlePreview = () => {
    // In a real app, this would show a preview
    alert("Preview functionality would open here");
  };

  const handlePublish = () => {
    // In a real app, this would publish the article
    alert("Publish functionality would open here");
  };

  const handleInsertElement = (elementType: string) => {
    console.log(`EditorPage: Insert element of type ${elementType}`);
    if (canvasRef.current) {
      // Use the handleAddElement method which now directly adds elements
      if (canvasRef.current.handleAddElement) {
        canvasRef.current.handleAddElement(elementType);
        setIsDirty(true);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{articleTitle}</h1>
            <p className="text-sm text-muted-foreground">
              {isDirty ? "Unsaved changes" : "All changes saved"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </header>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <CanvasToolbar
          onSave={handleSave}
          onPreview={handlePreview}
          onPublish={handlePublish}
          onInsertElement={handleInsertElement}
        />
        <div className="flex-1 overflow-hidden">
          <EditorialCanvas
            ref={canvasRef}
            initialZoom={100}
            showPropertiesPanel={true}
            onCanvasChange={handleCanvasChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
