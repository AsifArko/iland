import React, { useState } from "react";
import {
  generateDownloadEmailHTML,
  generateOrderConfirmationEmailHTML,
} from "@/lib/email/templates";

export function EmailPreview() {
  const [emailType] = useState<"download" | "confirmation">("download");
  const [customerEmail] = useState("john@example.com");
  const [downloadUrl] = useState("https://example.com/download/123");
  const [orderId] = useState("ord_123456789");
  const [orderAmount] = useState("99.00");
  const [orderStatus] = useState("confirmed");

  const downloadEmailHTML = generateDownloadEmailHTML(
    customerEmail,
    downloadUrl
  );

  const confirmationEmailHTML = generateOrderConfirmationEmailHTML(
    customerEmail,
    {
      id: orderId,
      amount: parseFloat(orderAmount),
      status: orderStatus,
    }
  );

  const currentEmailHTML =
    emailType === "download" ? downloadEmailHTML : confirmationEmailHTML;

  return (
    <div
      style={{
        border: "none",
        borderRadius: "4px",
        overflow: "hidden",
        height: "800px",
        width: "100%",
      }}
    >
      <iframe
        srcDoc={currentEmailHTML}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          backgroundColor: "#fafafa",
        }}
        title="Email Preview"
      />
    </div>
  );
}
