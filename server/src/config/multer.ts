import express from "express";
import multer from "multer";
import path from "path";



export const upload = multer({
  dest: path.resolve(__dirname, "../uploads/"),
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