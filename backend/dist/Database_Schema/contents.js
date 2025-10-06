"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Content_Schema = new mongoose_1.default.Schema({
    title: { type: String },
    link: { type: String },
    type: { type: String, enum: ["youtube", "twitter", "pdf", "image", "text"] },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'Users', required: true }
});
const Contents = mongoose_1.default.model("Contents", Content_Schema);
exports.default = Contents;
