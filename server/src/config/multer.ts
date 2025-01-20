import express from "express";
import multer from "multer";
import path from "path";



export const upload = multer({
  dest: path.resolve(__dirname, "../uploads/"),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});


