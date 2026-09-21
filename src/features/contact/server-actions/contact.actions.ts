"use server";

import type { InquiryActionResult, InquiryPayload } from "../types/contact.types";

export async function submitInquiryAction(
  payload: InquiryPayload
): Promise<InquiryActionResult> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return { success: false, error: "Inquiry service is not configured." };
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, error: "Could not submit your inquiry. Please try again." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Could not reach the server. Please try again." };
  }
}
