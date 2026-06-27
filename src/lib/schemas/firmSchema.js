import { z } from "zod";

export const firmSchema = z.object({
  firmName: z.string().min(2, "Firm Name is required"),
  shortName: z.string().min(2, "Short Name is required"),
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST Number"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Number"),
  cinNumber: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid Pincode"),
  contactPerson: z.string().min(2, "Contact Person is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid Mobile Number"),
  email: z.string().email("Invalid email address"),
  bankName: z.string().min(2, "Bank Name is required"),
  accountNumber: z.string().min(9, "Account Number is required"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});
