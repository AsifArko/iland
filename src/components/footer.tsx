import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground">iLand</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Empowering solo software engineers with self-hosted source code
                selling platforms. Complete ownership and customizability, with
                no third-party fees.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="https://x.com/asif_imch"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link
                href="https://github.com/quantum-atmosphere"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Product
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/features"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/documentation"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground">
                  Support
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/help"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Company
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground">Legal</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/security"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/license"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      License
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 iLand. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Thank you for supporting iLand.
          </p>
        </div>
      </div>
    </footer>
  );
}
