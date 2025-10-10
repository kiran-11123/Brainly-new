"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contents_1 = __importDefault(require("../Database_Schema/contents"));
const Contents_Router = express_1.default.Router();
const Auth_middleware_1 = __importDefault(require("../middlewares/Auth_middleware"));
const Links_1 = __importDefault(require("../Database_Schema/Links"));
const utils_1 = require("./utils");
const Users_1 = __importDefault(require("../Database_Schema/Users"));
const inspector_1 = require("inspector");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDir = path_1.default.join(process.cwd(), "uploads");
// ✅ Ensure uploads folder exists
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
Contents_Router.get("/content", Auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.user.user_id;
        const content_data = yield contents_1.default.find({
            userId: userId
        }).populate("userId", "username");
        if (content_data.length === 0) {
            return res.status(403).json({
                message: "Contents are Empty...",
                ok: false,
            });
        }
        return res.status(200).json({
            message: "Data Feteched Successfully...",
            ok: true,
            result: content_data
        });
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            ok: false
        });
    }
}));
// POST /content
Contents_Router.post('/content', upload.single('EventImage'), Auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Basic validation (expand with Joi/Zod for production)
        const { title, link, type, description } = req.body;
        const image = req.file ? req.file.path : null;
        const userId = req.user.user_id;
        // Handle image: Use req.file.path (full path) or req.file.filename (just name)
        // For frontend access, you might want to serve via /uploads/:filename, so store relative path
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Relative URL for easy serving
        const data = {};
        if (title)
            data['title'] = title;
        if (link)
            data['link'] = link;
        if (type)
            data['type'] = type;
        if (description)
            data['description'] = description;
        if (image)
            data['image'] = imagePath;
        if (userId)
            data['userId'] = userId;
        const createdContent = yield contents_1.default.create(data);
        return res.status(200).json({
            ok: true,
            message: 'Content added successfully',
            result: createdContent, // Optional: return the created doc
        });
    }
    catch (er) {
        inspector_1.console.error('POST /content error:', er); // Log raw error
        if (er instanceof multer_1.default.MulterError) {
            return res.status(400).json({
                message: 'File upload error: ' + er.message,
                ok: false,
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error',
            ok: false,
        });
    }
}));
Contents_Router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentId } = req.body;
        if (!contentId) {
            return res.status(400).json({
                message: "Content ID is required..",
                ok: false,
            });
        }
        const deleted = yield contents_1.default.findByIdAndDelete(contentId);
        if (!deleted) {
            return res.status(404).json({
                message: "Content not found..",
                ok: false,
            });
        }
        return res.status(200).json({
            message: "Content Deleted Successfully..",
            ok: true,
        });
    }
    catch (er) {
        inspector_1.console.error("❌ Delete Error:", er);
        return res.status(500).json({
            message: "Internal Server Error..",
            error: er,
            ok: false,
        });
    }
}));
Contents_Router.post("/share", Auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.user.user_id;
        const share = req.body.share;
        if (share) {
            //@ts-ignore
            const existing_link = yield Links_1.default.findOne({ userId: req.user.userId });
            if (existing_link) {
                return res.json({
                    message: "Link Already Generated",
                    link: existing_link.hash
                });
            }
            const hash = (0, utils_1.random)(10);
            yield Links_1.default.create({
                userID: userId,
                hash: hash
            });
            return res.status(200).json({
                message: "Updated Sharable Link",
                link: "/share" + hash
            });
        }
        else {
            yield Links_1.default.deleteOne({
                //@ts-ignore
                userId: req.user.user_id
            });
            return res.status(200).json({
                message: "Removed Sharable Link"
            });
        }
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            ok: false,
            error: er
        });
    }
}));
Contents_Router.get("/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.shareLink;
        const Link = yield Links_1.default.findOne({
            hash: hash
        });
        if (!Link) {
            return res.status(411).json({
                message: "Sorry incorrect input.."
            });
        }
        const content = yield contents_1.default.find({
            userId: Link.userId
        });
        const user = yield Users_1.default.find({
            _id: Link.userId
        });
        return res.status(200).json({
            username: user,
            content: content
        });
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            ok: false,
            error: er
        });
    }
}));
exports.default = Contents_Router;
