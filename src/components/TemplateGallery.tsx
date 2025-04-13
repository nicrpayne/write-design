import React, { useState } from "react";
import { Search, Filter, Grid3X3, List, Plus } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Template {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
}

const TemplateGallery = ({
  onSelectTemplate = () => {},
  onPreviewTemplate = () => {},
}: {
  onSelectTemplate?: (templateId: string) => void;
  onPreviewTemplate?: (templateId: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock template data
  const templates: Template[] = [
    {
      id: "1",
      title: "Feature Article",
      description:
        "Classic magazine layout with large hero image and multi-column text.",
      thumbnail:
        "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=800&q=80",
      category: "article",
      tags: ["featured", "multi-column"],
    },
    {
      id: "2",
      title: "Interview",
      description: "Q&A format with pull quotes and sidebar elements.",
      thumbnail:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80",
      category: "interview",
      tags: ["q&a", "quotes"],
    },
    {
      id: "3",
      title: "Photo Essay",
      description: "Image-focused layout with minimal text and captions.",
      thumbnail:
        "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80",
      category: "visual",
      tags: ["photos", "gallery"],
    },
    {
      id: "4",
      title: "Review",
      description: "Product or media review with rating system and highlights.",
      thumbnail:
        "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80",
      category: "review",
      tags: ["ratings", "product"],
    },
    {
      id: "5",
      title: "Opinion Piece",
      description: "Bold typography with callouts and author emphasis.",
      thumbnail:
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
      category: "opinion",
      tags: ["editorial", "typography"],
    },
    {
      id: "6",
      title: "How-To Guide",
      description: "Step-by-step layout with numbered sections and tips.",
      thumbnail:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
      category: "guide",
      tags: ["tutorial", "steps"],
    },
  ];

  // Categories derived from templates
  const categories = [
    "all",
    ...Array.from(new Set(templates.map((t) => t.category))),
  ];

  // Filter templates based on search query and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full h-full bg-background p-6 overflow-auto">
      <div className="flex flex-col space-y-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Template Gallery</h1>
          <Button variant="outline" onClick={() => onSelectTemplate("blank")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Blank
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Tabs defaultValue="grid" className="w-auto">
              <TabsList className="grid w-20 grid-cols-2">
                <TabsTrigger value="grid" onClick={() => setViewMode("grid")}>
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" onClick={() => setViewMode("list")}>
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Filter className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any templates matching your search criteria. Try
              adjusting your filters or search query.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                  <div
                    className="aspect-video w-full overflow-hidden bg-muted cursor-pointer"
                    onClick={() => onPreviewTemplate(template.id)}
                  >
                    <img
                      src={template.thumbnail}
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{template.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-muted-foreground text-sm">
                      {template.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-4 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => onSelectTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="md:w-48 h-32 overflow-hidden bg-muted cursor-pointer"
                      onClick={() => onPreviewTemplate(template.id)}
                    >
                      <img
                        src={template.thumbnail}
                        alt={template.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">
                          {template.title}
                        </h3>
                        <Badge>{template.category}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {template.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onSelectTemplate(template.id)}
                        >
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateGallery;
