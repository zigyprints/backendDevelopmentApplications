// image.controller.js

// Import any necessary dependencies and models
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

// Function to handle image uploads
export function uploadImage(req: Request, res: Response) {
  try {
    // You can access uploaded file details from req.file
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Perform any additional processing (e.g., saving the image URL to a database)

    // Return a response with the image URL or any other relevant data
    return res.status(201).json({ imageUrl: `/uploads/${req.file.filename}` });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to handle image deletion
export async function deleteImage(req: Request, res: Response) {
  try {
    const url: string = req.query.url as string;
    const imagePath: string = path.join(req.app.get("root_dir"), url);

    // Check if the file exists
    const fileExists = await fs.promises
      .access(imagePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete the file
    await fs.promises.unlink(imagePath);

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
