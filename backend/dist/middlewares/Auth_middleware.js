"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
    console.log("FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
}
dotenv_1.default.config();
const secret = process.env.SECRET_KEY;
const Authentication_token = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token found"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded || typeof decoded !== 'object' || !('user_id' in decoded)) {
            return res.status(401).json({
                message: "Invalid token payload"
            });
        }
        //@ts-ignore
        req.user = decoded; // will have userId inside
        next();
    }
    catch (er) {
        return res.status(401).json({
            message: "Invalid token",
            //@ts-ignore
            error: er.message
        });
    }
};
exports.default = Authentication_token;
