import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, File, ChevronRight } from "lucide-react";

const projectStructure = [
  {
    icon: Folder,
    name: "/src",
    description: "Source code root",
    children: [
      {
        name: "/actions",
        type: "folder",
        files: [
          "completeLessonAction.ts",
          "createStripeCheckout.ts",
          "getLessonCompletionStatusAction.ts",
          "uncompleteLessonAction.ts",
        ],
      },
      {
        name: "/app",
        type: "folder",
        files: ["page.tsx", "layout.tsx", "globals.css"],
      },
      {
        name: "/components",
        type: "folder",
        files: [
          "CourseCard.tsx",
          "LessonCompleteButton.tsx",
          "Sidebar.tsx",
          "VideoPlayer.tsx",
        ],
      },
      {
        name: "/lib",
        type: "folder",
        files: ["auth.ts", "stripe.ts", "utils.ts"],
      },
      {
        name: "/sanity",
        type: "folder",
        files: ["schemaTypes/", "lib/", "env.ts"],
      },
    ],
  },
  {
    icon: Folder,
    name: "/app",
    description: "Next.js App Router",
    children: [
      {
        name: "/(admin)",
        type: "folder",
        files: ["studio/", "asset-manager/"],
      },
      {
        name: "/(dashboard)",
        type: "folder",
        files: ["dashboard/courses/", "layout.tsx"],
      },
      {
        name: "/(user)",
        type: "folder",
        files: ["courses/", "my-courses/", "search/"],
      },
      {
        name: "/api",
        type: "folder",
        files: ["stripe/", "files/", "draft-mode/"],
      },
    ],
  },
  {
    icon: Folder,
    name: "/sanity",
    description: "CMS & Content Management",
    children: [
      {
        name: "/schemaTypes",
        type: "folder",
        files: [
          "courseType.ts",
          "lessonType.ts",
          "studentType.tsx",
          "enrollmentType.tsx",
        ],
      },
      {
        name: "/lib",
        type: "folder",
        files: [
          "client.ts",
          "adminClient.ts",
          "courses/",
          "lessons/",
          "student/",
        ],
      },
    ],
  },
];

export function Architecture() {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
              Project Overview
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Architecture
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
            A modern learning platform built with Next.js, Sanity CMS, and
            Stripe payments. Explore the structure and data models below.
          </p>
        </div>

        {/* Project Structure */}
        <div className="mb-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projectStructure.map(folder => (
              <Card
                key={folder.name}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-lg hover:border-border transition-all duration-300 hover:bg-card/80"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0">
                        <folder.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-col justify-center min-h-[40px]">
                        <CardTitle className="text-lg font-semibold tracking-tight text-foreground font-mono leading-tight">
                          {folder.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground leading-tight">
                          {folder.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {folder.children.slice(0, 6).map(child => (
                      <div
                        key={child.name}
                        className="flex items-center gap-2 p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors group/child"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          {child.type === "folder" ? (
                            <Folder className="h-3 w-3 text-primary" />
                          ) : (
                            <File className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        <span className="font-mono text-sm text-foreground/80 group-hover/child:text-foreground transition-colors">
                          {child.name}
                        </span>
                      </div>
                    ))}
                    {folder.children.length > 6 && (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted/20">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <File className="h-3 w-3 text-muted-foreground/60" />
                        </div>
                        <span className="text-sm text-muted-foreground/60 font-mono">
                          +{folder.children.length - 6} more
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
