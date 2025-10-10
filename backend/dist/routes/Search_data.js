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
const Search_Router = express_1.default.Router();
const Auth_middleware_1 = __importDefault(require("../middlewares/Auth_middleware"));
Search_Router.get("/tweet", Auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userID = req.user.user_id;
        const result = yield contents_1.default.find({ userId: userID, type: "twitter" });
        if (result.length === 0) {
            return res.status(400).json({
                message: "No Data present"
            });
        }
        return res.status(200).json({
            message: "Data Feteched Successfully..",
            result: result
        });
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: er
        });
    }
}));
Search_Router.get("/videos", Auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userID = req.user.user_id;
        const result = yield contents_1.default.find({ userId: userID, type: "youtube" });
        if (result.length === 0) {
            return res.status(400).json({
                message: "No Data present"
            });
        }
        return res.status(200).json({
            message: "Data Feteched Successfully..",
            result: result
        });
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: er
        });
    }
}));
Search_Router.get("/notes", Auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userID = req.user.user_id;
        const result = yield contents_1.default.find({ userId: userID, type: "text" });
        if (result.length === 0) {
            return res.status(204).json({
                message: "No Data present",
                result: result
            });
        }
        return res.status(200).json({
            message: "Data Feteched Successfully..",
            result: result
        });
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: er
        });
    }
}));
Search_Router.get("/images", Auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userID = req.user.user_id;
        const result = yield contents_1.default.find({ userId: userID, type: "image" });
        if (result.length === 0) {
            return res.status(204).json({
                message: "No Data present",
                result: result
            });
        }
        return res.status(200).json({
            message: "Data Feteched Successfully..",
            result: result
        });
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: er
        });
    }
}));
Search_Router.get("/files", Auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userID = req.user.user_id;
        const result = yield contents_1.default.find({ userId: userID, type: "file" });
        if (result.length === 0) {
            return res.status(204).json({
                message: "No Data present",
                result: result
            });
        }
        return res.status(200).json({
            message: "Data Feteched Successfully..",
            result: result
        });
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: er
        });
    }
}));
exports.default = Search_Router;
