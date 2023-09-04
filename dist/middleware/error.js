"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    // Log to console for dev
    console.log(err);
    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found`;
        error = new errorResponse_1.default(message, 404);
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new errorResponse_1.default(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
};
exports.default = errorHandler;
