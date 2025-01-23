import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve(__dirname, "../../uploads/images/");
    cb(null, uploadDir); // Save to the specified directory
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    const baseName = path.basename(originalName, fileExtension);

    // Generate a new file name with the original name and UUID
    const manipulatedName = `${baseName}_${uuidv4()}${fileExtension}`;
    cb(null, manipulatedName); // Save with the new name
  },
});

// Configure Multer
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg", // JPEG images
      "image/png",  // PNG images
      "image/jpg",  // JPG images
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx files
      "application/vnd.ms-excel", // .xls files
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept file
    } else {
      cb(null, true); // Reject file
    }
  },
});
