import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserRound, Users, BookOpen, Code, File } from "lucide-react";

const contentModel = [
  {
    icon: BookOpen,
    title: "Courses",
    description: "Main course structure",
    fields: [
      "Title",
      "Description",
      "Price",
      "Image",
      "Modules",
      "Instructor",
      "Category",
    ],
  },
  {
    icon: File,
    title: "Modules",
    description: "Course modules",
    fields: ["Title", "Lessons", "Order"],
  },
  {
    icon: Code,
    title: "Lessons",
    description: "Individual lessons",
    fields: [
      "Title",
      "Description",
      "Video URL",
      "Content",
      "Code",
      "Images",
      "Course Material Files",
      "Completion",
    ],
  },
  {
    icon: Users,
    title: "Students",
    description: "Student profiles",
    fields: ["Profile", "Enrollments", "Progress"],
  },
  {
    icon: UserRound,
    title: "Instructors",
    description: "Instructor profiles",
    fields: ["Name", "Bio", "Photo", "Courses"],
  },
];

export function ContentModel() {
  return (
    <section id="content-model" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
            <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
              Content Model
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
            Data Structures
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm max-w-lg font-light tracking-wide">
            Comprehensive data models that power the learning platform. Each
            entity is designed for scalability and maintainability.
          </p>
        </div>

        {/* Content Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentModel.map(model => (
            <Card
              key={model.title}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-lg hover:border-border transition-all duration-300 hover:bg-card/80"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                    <model.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
                      {model.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {model.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {model.fields.slice(0, 6).map(field => (
                    <Badge
                      key={field}
                      variant="secondary"
                      className="text-xs font-medium h-6 px-2 rounded-md bg-primary/5 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {field}
                    </Badge>
                  ))}
                  {model.fields.length > 6 && (
                    <Badge
                      variant="outline"
                      className="text-xs font-medium h-6 px-2 rounded-md"
                    >
                      +{model.fields.length - 6}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
