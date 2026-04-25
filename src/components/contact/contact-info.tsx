import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className = "" }: ContactInfoProps) {
  return (
    <Card
      className={`group relative overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] h-full rounded-lg ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50 mt-0.5">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <Badge
                variant="outline"
                className="text-xs font-medium h-6 px-2 rounded-md"
              >
                Phone
              </Badge>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50 mt-0.5">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <Badge
                variant="outline"
                className="text-xs font-medium h-6 px-2 rounded-md"
              >
                Email
              </Badge>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                support@iland.com
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/50 mt-0.5">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <Badge
                variant="outline"
                className="text-xs font-medium h-6 px-2 rounded-md"
              >
                Address
              </Badge>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                123 Tech Street
                <br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
