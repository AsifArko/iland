import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface BusinessHoursProps {
  className?: string;
}

export function BusinessHours({ className = "" }: BusinessHoursProps) {
  return (
    <Card
      className={`group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Business Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground/70 font-medium">
                Monday - Friday
              </span>
              <span className="text-foreground font-medium">
                9:00 AM - 6:00 PM PST
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground/70 font-medium">
                Saturday
              </span>
              <span className="text-foreground font-medium">
                10:00 AM - 4:00 PM PST
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground/70 font-medium">
                Sunday
              </span>
              <span className="text-foreground font-medium">Closed</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              We typically respond within 24 hours during business days. For
              urgent technical issues, please include &ldquo;URGENT&rdquo; in
              your subject line.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
