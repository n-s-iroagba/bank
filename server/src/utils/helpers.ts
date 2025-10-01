// utils/helpers.ts

import * as XLSX from "xlsx";

export const parseExcelFile = async (fileBuffer: Buffer): Promise<any[]> => {
  try {
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });
    return jsonData;
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    throw new Error("Failed to parse Excel file");
  }
};

/**
 * Generate a US-style account number (12 digits).
 * Format: BBXXXXXXXXXX
 *  - BB = bank code (2 digits, defaults to 12)
 *  - X = random digits
 */
export function generateAccountNumber(bankCode: string = "12"): string {
  if (!/^\d{2}$/.test(bankCode)) {
    throw new Error("Bank code must be exactly 2 digits");
  }

  // Generate 9 random digits
  let randomDigits = "";
  for (let i = 0; i < 9; i++) {
    randomDigits += Math.floor(Math.random() * 10).toString();
  }

  // Optional: compute check digit (mod 10 of sum of digits)
  const baseNumber = bankCode + randomDigits;
  const checkDigit =
    baseNumber
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0) % 10;

  return baseNumber + checkDigit;
}
