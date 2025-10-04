"use strict";
// utils/helpers.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExcelFile = void 0;
exports.generateAccountNumber = generateAccountNumber;
const XLSX = __importStar(require("xlsx"));
const parseExcelFile = (fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workbook = XLSX.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });
        return jsonData;
    }
    catch (error) {
        console.error("Error parsing Excel file:", error);
        throw new Error("Failed to parse Excel file");
    }
});
exports.parseExcelFile = parseExcelFile;
/**
 * Generate a US-style account number (12 digits).
 * Format: BBXXXXXXXXXX
 *  - BB = bank code (2 digits, defaults to 12)
 *  - X = random digits
 */
function generateAccountNumber(bankCode = "12") {
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
    const checkDigit = baseNumber
        .split("")
        .map(Number)
        .reduce((a, b) => a + b, 0) % 10;
    return baseNumber + checkDigit;
}
