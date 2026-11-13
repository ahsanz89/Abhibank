/**
 * Pakistani IBAN generation for ABHI accounts — the same algorithm and
 * validation rules as the IBAN calculator on the original abhibank.com.
 * IBAN = PK + 2 check digits + bank code "ABHI" + 16-digit account number.
 */

export type AccountKind = "branch" | "wallet";

export interface IbanResult {
  ok: boolean;
  iban?: string;
  formatted?: string;
  error?: string;
}

const BANK_CODE = "ABHI";

function normaliseWallet(input: string): string {
  let n = input;
  if (n.startsWith("0092")) n = n.slice(2);
  if (/^03\d{9}$/.test(n)) n = "92" + n.slice(1);
  return n;
}

export function validateAccount(kind: AccountKind, raw: string): string | null {
  const n = raw.replace(/[\s-]/g, "");
  if (!n) return "Enter your account number.";
  if (!/^\d+$/.test(n)) return "Use digits only.";
  if (kind === "branch") {
    return /^\d{16}$/.test(n) ? null : "For an ABHI Branch Account, enter exactly 16 digits.";
  }
  const valid =
    (n.startsWith("92") && n.length === 12) || (n.startsWith("03") && n.length === 11) || (n.startsWith("0092") && n.length === 14);
  return valid ? null : "Wallet numbers start with 03 (11 digits), 92 (12 digits) or 0092 (14 digits).";
}

export function generateIban(kind: AccountKind, raw: string): IbanResult {
  const err = validateAccount(kind, raw);
  if (err) return { ok: false, error: err };
  let account = raw.replace(/[\s-]/g, "");
  if (kind === "wallet") account = normaliseWallet(account);
  const padded = account.padStart(16, "0");
  const rearranged = BANK_CODE + padded + "PK00";
  const numeric = rearranged
    .toUpperCase()
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      return code >= 65 && code <= 90 ? String(code - 55) : c;
    })
    .join("");
  const mod = BigInt(numeric) % BigInt(97);
  const check = String(BigInt(98) - mod).padStart(2, "0");
  const iban = `PK${check}${BANK_CODE}${padded}`;
  return { ok: true, iban, formatted: iban.match(/.{1,4}/g)!.join(" ") };
}
