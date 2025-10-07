"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth_Middleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
    console.log("FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
}
const Auth_Middleware = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token found"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        //@ts-ignore
        if (!decoded.user_id) {
            return res.status(401).json({
                message: "Invalid token payload"
            });
        }
        if (decoded) {
            //@ts-ignore
            req.user = decoded;
        }
    }
    catch (er) {
        return res.status(403).json({
            message: "Invalid or Expired Token",
            error: er
        });
    }
};
exports.Auth_Middleware = Auth_Middleware;
