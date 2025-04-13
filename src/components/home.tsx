import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  PlusCircle,
  Search,
  FileText,
  Clock,
  Star,
  Settings,
  Layout,
} from "lucide-react";
import TemplateGallery from "./TemplateGallery";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for drafts
  const drafts = [
    {
      id: 1,
      title: "The Future of AI in Content Creation",
      lastEdited: "2 hours ago",
      status: "draft",
    },
    {
      id: 2,
      title: "Travel Guide: Hidden Gems of Portugal",
      lastEdited: "1 day ago",
      status: "draft",
    },
    {
      id: 3,
      title: "Interview with Tech Industry Leaders",
      lastEdited: "3 days ago",
      status: "draft",
    },
    {
      id: 4,
      title: "Culinary Adventures: Street Food Around the World",
      lastEdited: "1 week ago",
      status: "draft",
    },
    {
      id: 5,
      title: "Photography Tips for Urban Landscapes",
      lastEdited: "2 weeks ago",
      status: "draft",
    },
  ];

  // Mock data for recent articles
  const recentArticles = [
    {
      id: 6,
      title: "The Art of Storytelling in Digital Media",
      lastEdited: "3 weeks ago",
      status: "published",
    },
    {
      id: 7,
      title: "Sustainable Fashion: Trends and Innovations",
      lastEdited: "1 month ago",
      status: "published",
    },
    {
      id: 8,
      title: "Book Review: Latest Fiction Bestsellers",
      lastEdited: "2 months ago",
      status: "published",
    },
  ];

  // Filter drafts based on search query
  const filteredDrafts = drafts.filter((draft) =>
    draft.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6" />
            <h1 className="text-xl font-bold">Magazine Editor</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Tabs defaultValue="drafts" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="drafts" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                My Drafts
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Recent Articles
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center">
                <Layout className="mr-2 h-4 w-4" />
                Templates
              </TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="drafts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-primary/5 border-dashed cursor-pointer hover:bg-primary/10 transition-colors">
                <CardContent className="flex flex-col items-center justify-center h-[220px]">
                  <PlusCircle className="h-10 w-10 text-primary mb-4" />
                  <p className="text-lg font-medium">Create New Article</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start from scratch or use a template
                  </p>
                </CardContent>
              </Card>

              {filteredDrafts.map((draft) => (
                <Card
                  key={draft.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2">
                      {draft.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Last edited{" "}
                      {draft.lastEdited}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredDrafts.length === 0 && searchQuery && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  No drafts found matching "{searchQuery}"
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentArticles.map((article) => (
                <Card
                  key={article.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Published
                      </div>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.lastEdited}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Duplicate
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Article Templates</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Star className="mr-2 h-4 w-4" />
                  Favorites
                </Button>
                <Button variant="outline" size="sm">
                  All Categories
                </Button>
              </div>
            </div>
            <Separator className="my-4" />
            <TemplateGallery />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Home;
