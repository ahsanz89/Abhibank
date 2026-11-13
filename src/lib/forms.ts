/**
 * Form definitions shared by the browser (inline validation) and the API
 * (authoritative validation). Field sets mirror the forms on the original
 * abhibank.com so no existing data collection is lost.
 */
import options from "@/data/form-options.json";

export type Rule = "required" | "email" | "cnic" | "mobile" | "phone" | "number" | "accountNumber";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "select" | "textarea" | "radio" | "file" | "checkbox";
  rules?: Rule[];
  options?: readonly string[];
  placeholder?: string;
  hint?: string;
  span?: 2;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  min?: number;
  max?: number;
}

export interface FormDef {
  id: FormId;
  title: string;
  fields: FieldDef[];
  successTitle: string;
  successText: string;
  referencePrefix: string;
}

export type FormId = "complaint" | "deposit-application" | "loan-application" | "ewa-enquiry" | "whistleblow";

const CNIC_HINT = "13 digits, e.g. 42000-1462196-2";

export const FORMS: Record<FormId, FormDef> = {
  complaint: {
    id: "complaint",
    title: "Complaint and feedback form",
    referencePrefix: "CMP",
    successTitle: "We’ve received your complaint",
    successText: "Our Customer Experience Unit will review it and contact you. Keep your reference number for follow-up with the helpline.",
    fields: [
      { name: "fullName", label: "Full name", type: "text", rules: ["required"], autoComplete: "name" },
      { name: "cnic", label: "CNIC", type: "text", rules: ["required", "cnic"], placeholder: "42000-1462196-2", hint: CNIC_HINT, inputMode: "numeric" },
      { name: "contactNumber", label: "Contact number", type: "tel", rules: ["required", "phone"], placeholder: "03XX XXXXXXX", autoComplete: "tel" },
      { name: "email", label: "Email address", type: "email", rules: ["email"], autoComplete: "email" },
      { name: "nature", label: "Nature of complaint", type: "select", rules: ["required"], options: options.complaintNatures },
      { name: "accountNumber", label: "Account number", type: "text", rules: ["required", "accountNumber"], inputMode: "numeric" },
      { name: "walletNumber", label: "Mobile wallet number", type: "tel", rules: ["mobile"], placeholder: "03XX XXXXXXX" },
      { name: "details", label: "Complaint / feedback details", type: "textarea", rules: ["required"], span: 2, placeholder: "Tell us what happened, including dates and transaction references if any." },
    ],
  },
  "deposit-application": {
    id: "deposit-application",
    title: "Deposit online application",
    referencePrefix: "DEP",
    successTitle: "Application received",
    successText: "Thank you. An ABHI representative from your nearest branch will call you to complete account opening.",
    fields: [
      { name: "accountType", label: "Account type", type: "select", rules: ["required"], options: options.accountTypes, span: 2 },
      { name: "fullName", label: "Full name", type: "text", rules: ["required"], autoComplete: "name" },
      { name: "cnic", label: "CNIC", type: "text", rules: ["required", "cnic"], placeholder: "42000-1462196-2", hint: CNIC_HINT, inputMode: "numeric" },
      { name: "mobile", label: "Mobile number", type: "tel", rules: ["required", "mobile"], placeholder: "03XX XXXXXXX", autoComplete: "tel" },
      { name: "otherPhone", label: "Other phone number", type: "tel", rules: ["phone"] },
      { name: "city", label: "City", type: "select", rules: ["required"], options: options.cities },
      { name: "heardAbout", label: "Where did you hear about us?", type: "select", options: options.heardAbout },
    ],
  },
  "loan-application": {
    id: "loan-application",
    title: "Apply for a loan",
    referencePrefix: "LON",
    successTitle: "Loan application received",
    successText: "Thank you. A loan officer from your nearest ABHI branch will contact you to discuss eligibility and documents.",
    fields: [
      { name: "loanType", label: "Type of loan", type: "select", rules: ["required"], options: options.loanTypes, span: 2 },
      { name: "ownsGold", label: "Do you own gold? (required for Sunheri Karza)", type: "radio", options: ["Yes", "No"], span: 2 },
      { name: "loanAmount", label: "Loan amount (PKR)", type: "number", rules: ["required", "number"], min: 10000, max: 2000000, inputMode: "numeric" },
      { name: "employment", label: "Employment", type: "radio", rules: ["required"], options: ["Salaried", "Self-employed / business"] },
      { name: "fullName", label: "Full name", type: "text", rules: ["required"], autoComplete: "name" },
      { name: "cnic", label: "CNIC", type: "text", rules: ["required", "cnic"], placeholder: "42000-1462196-2", hint: CNIC_HINT, inputMode: "numeric" },
      { name: "phone", label: "Phone", type: "tel", rules: ["required", "mobile"], placeholder: "923331234567", autoComplete: "tel" },
      { name: "landline", label: "Landline phone number", type: "tel", rules: ["phone"] },
      { name: "address", label: "Address", type: "text", rules: ["required"], span: 2, autoComplete: "street-address" },
    ],
  },
  "ewa-enquiry": {
    id: "ewa-enquiry",
    title: "EWA employee / employer enquiry",
    referencePrefix: "EWA",
    successTitle: "Thank you — we’ll be in touch",
    successText: "Our Earned Wage Access team will contact you shortly.",
    fields: [
      { name: "role", label: "Are you an employee or employer?", type: "select", rules: ["required"], options: ["Employee", "Employer"], span: 2 },
      { name: "fullName", label: "Full name", type: "text", rules: ["required"], autoComplete: "name" },
      { name: "mobile", label: "Mobile number / WhatsApp", type: "tel", rules: ["required", "mobile"], placeholder: "923331234567", autoComplete: "tel" },
      { name: "email", label: "Email address", type: "email", rules: ["required", "email"], autoComplete: "email" },
      { name: "cnic", label: "CNIC", type: "text", rules: ["required", "cnic"], placeholder: "42000-1462196-2", inputMode: "numeric" },
      { name: "city", label: "City", type: "text", rules: ["required"], autoComplete: "address-level2" },
      { name: "landline", label: "Landline phone number", type: "tel", rules: ["phone"] },
      { name: "officialEmail", label: "Official email address", type: "email", rules: ["required", "email"] },
      { name: "designation", label: "Designation", type: "text", rules: ["required"], autoComplete: "organization-title" },
      { name: "company", label: "Company name", type: "text", rules: ["required"], autoComplete: "organization" },
      { name: "hrContact", label: "HR contact number", type: "tel", rules: ["required", "phone"] },
      { name: "employees", label: "Number of employees", type: "select", rules: ["required"], options: options.ewaEmployees },
      { name: "industry", label: "Industry type", type: "select", rules: ["required"], options: options.ewaIndustries },
      { name: "heardAbout", label: "How did you hear about us?", type: "select", rules: ["required"], options: options.ewaHeard, span: 2 },
      { name: "comments", label: "Comments", type: "textarea", span: 2 },
    ],
  },
  whistleblow: {
    id: "whistleblow",
    title: "Whistle-blowing form",
    referencePrefix: "WB",
    successTitle: "Report submitted confidentially",
    successText: "Thank you for speaking up. Reports go only to the whistle-blowing team and are handled in confidence.",
    fields: [
      { name: "fullName", label: "Full name", type: "text", rules: ["required"], autoComplete: "name" },
      { name: "phone", label: "Phone number", type: "tel", rules: ["phone"] },
      { name: "role", label: "You are submitting as", type: "select", rules: ["required"], options: options.whistleRoles },
      { name: "email", label: "Email address", type: "email", rules: ["email"] },
      { name: "location", label: "Location of the incident", type: "textarea", rules: ["required"], span: 2 },
      { name: "details", label: "Details of the incident", type: "textarea", rules: ["required"], span: 2 },
      { name: "suspects", label: "Full name(s) and/or title(s) of individuals suspected of wrongdoing or misconduct", type: "textarea", rules: ["required"], span: 2 },
      { name: "attachment", label: "Supporting document (optional)", type: "file", span: 2, hint: "PDF, JPG, PNG or DOCX, up to 4 MB." },
    ],
  },
};

const digits = (v: string) => v.replace(/[\s\-()+]/g, "");

export function checkRule(rule: Rule, value: string, field: FieldDef): string | null {
  const v = value.trim();
  if (rule === "required") return v ? null : `Please enter ${field.label.toLowerCase()}.`;
  if (!v) return null; // optional & empty
  switch (rule) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : "Enter a valid email address.";
    case "cnic":
      return /^\d{5}-?\d{7}-?\d$/.test(v) ? null : "Enter a 13-digit CNIC (e.g. 42000-1462196-2).";
    case "mobile":
      return /^(92|0)?3\d{9}$/.test(digits(v)) ? null : "Enter a Pakistani mobile number (e.g. 03001234567).";
    case "phone":
      return /^\d{9,13}$/.test(digits(v)) ? null : "Enter a valid phone number.";
    case "accountNumber":
      return /^\d{6,24}$/.test(digits(v)) ? null : "Account numbers contain 6–24 digits.";
    case "number": {
      const n = Number(v.replace(/,/g, ""));
      if (!Number.isFinite(n)) return "Enter a number.";
      if (field.min !== undefined && n < field.min) return `Minimum is ${field.min.toLocaleString("en-PK")}.`;
      if (field.max !== undefined && n > field.max) return `Maximum is ${field.max.toLocaleString("en-PK")}.`;
      return null;
    }
  }
  return null;
}

export function validateField(field: FieldDef, value: string): string | null {
  if (field.options && value && field.type !== "file" && !field.options.includes(value)) return "Choose one of the options.";
  for (const r of field.rules ?? []) {
    const e = checkRule(r, value, field);
    if (e) return e;
  }
  if (value.length > 4000) return "This is too long.";
  return null;
}

export function validateForm(def: FormDef, values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of def.fields) {
    if (f.type === "file") continue;
    const e = validateField(f, values[f.name] ?? "");
    if (e) errors[f.name] = e;
  }
  return errors;
}

export const ATTACHMENT = {
  maxBytes: 4 * 1024 * 1024,
  types: ["application/pdf", "image/jpeg", "image/png", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
};
