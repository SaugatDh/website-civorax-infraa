export type ContactChannel =
  | "website"
  | "email"
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "phone";

export type InquiryPayload = {
  fullname: string;
  contact: string;
  address?: string;
  contact_channel: ContactChannel;
  message: string;
  service?: string;
  budget?: string;
};

export type InquiryActionResult =
  | { success: true }
  | { success: false; error: string };
