import type { StructureResolver } from "sanity/desk";
import { AnalyticsDashboard } from "./components/analytics-dashboard";
import { MonitoringDashboard } from "./components/monitoring-dashboard";
import { UserDownloads } from "./components/user-downloads";
import { StripePayments } from "./components/stripe-payments";
import { EmailPreview } from "./components/email-preview";
import { SuccessPreview } from "./components/success-preview";
import {
  Download,
  Code,
  Bubbles,
  CreditCard,
  Mail,
  CheckCircle,
  Activity,
  Shield,
  Eye,
  BarChart3,
  Monitor,
} from "lucide-react";

export const structure: StructureResolver = S => {
  return S.list()
    .title("Content")
    .items([
      // Add download and order schemas separately
      S.listItem()
        .title("Source Code")
        .icon(Code)
        .child(S.documentTypeList("download").title("Source Code")),

      // Add a divider
      S.divider(),
      // Analytics Dashboard
      S.listItem()
        .title("Site Analytics")
        .icon(Activity)
        .child(S.component(AnalyticsDashboard).title("Analytics Dashboard")),

      // Monitoring Dashboard
      S.listItem()
        .title("System Monitoring")
        .icon(Monitor)
        .child(S.component(MonitoringDashboard).title("Monitoring Dashboard")),

      // Divider
      S.divider(),

      // Add the downloads tool as a custom item
      S.listItem()
        .title("User Downloads")
        .icon(Download)
        .child(S.component(UserDownloads).title("User Download Management")),

      S.listItem()
        .title("Stripe Payments")
        .icon(CreditCard)
        .child(S.component(StripePayments).title("Payments Management")),

      // Add a divider
      S.divider(),

      // Group 1: Secure Token and Proxy URLs
      S.listItem()
        .title("Security & Access")
        .icon(Shield)
        .child(
          S.list()
            .title("Security & Access")
            .items([
              S.listItem()
                .title("Secure Tokens")
                .child(
                  S.documentTypeList("secureToken").title("Secure Tokens")
                ),
              S.listItem()
                .title("Proxy URLs")
                .icon(Bubbles)
                .child(
                  S.documentTypeList("proxyUrl").title("Proxy URL Management")
                ),
            ])
        ),

      // Group 2: Page View and User Event
      S.listItem()
        .title("User Activity")
        .icon(Eye)
        .child(
          S.list()
            .title("User Activity")
            .items([
              S.listItem()
                .title("Page Views")
                .child(S.documentTypeList("pageView").title("Page Views")),
              S.listItem()
                .title("User Events")
                .child(S.documentTypeList("userEvent").title("User Events")),
            ])
        ),

      // Group 3: System Metric, Performance Metric, and Error Log
      S.listItem()
        .title("System Metrics")
        .icon(BarChart3)
        .child(
          S.list()
            .title("System Metrics")
            .items([
              S.listItem()
                .title("System Metrics")
                .child(
                  S.documentTypeList("systemMetric").title("System Metrics")
                ),
              S.listItem()
                .title("Performance Metrics")
                .child(
                  S.documentTypeList("performanceMetric").title(
                    "Performance Metrics"
                  )
                ),
              S.listItem()
                .title("Error Logs")
                .child(S.documentTypeList("errorLog").title("Error Logs")),
            ])
        ),

      // Include remaining document types (excluding the ones we've grouped)
      ...S.documentTypeListItems().filter(
        listItem =>
          ![
            "download",
            "order",
            "proxyUrl",
            "secureToken",
            "pageView",
            "userEvent",
            "systemMetric",
            "performanceMetric",
            "errorLog",
          ].includes(listItem.getId() as string)
      ),

      // Add a divider
      S.divider(),

      // Add email preview tool
      S.listItem()
        .title("Email Preview")
        .icon(Mail)
        .child(S.component(EmailPreview).title("Email Template Preview")),

      // Add success page preview tool
      S.listItem()
        .title("Success Page Preview")
        .icon(CheckCircle)
        .child(S.component(SuccessPreview).title("Success Page Preview")),
    ]);
};
