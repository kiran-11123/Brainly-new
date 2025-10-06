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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const Users_1 = __importDefault(require("../Database_Schema/Users"));
const Auth_Router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || undefined;
if (!JWT_SECRET_KEY) {
    console.log("FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
}
Auth_Router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user_check = yield Users_1.default.findOne({ email: email });
        if (!user_check) {
            return res.status(400).json({
                message: "Email not found. Please Register..."
            });
        }
        const Password_check = yield bcryptjs_1.default.compare(password, user_check.password);
        if (!Password_check) {
            return res.status(400).json({
                message: "Password is Wrong.."
            });
        }
        const user_details = { "user_id": user_check._id, "username": user_check.username, "email": user_check.email };
        const token = jsonwebtoken_1.default.sign(user_details, JWT_SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000
        });
        return res.status(200).json({
            message: "User Logged In Successfully..",
            token: token
        });
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: er
        });
    }
}));
Auth_Router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        /*  //zod validation
  
         const zod_validation = zod.object({
          email : zod.string().email({message:"Invalid Email Address"}),
          username:zod.string().min(3 , {message:"Username must be at least 3 Characters"}),
          password :zod.string().min(5 ,{message:"Password must be at least 8 characters long"}).regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
           .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
         });
  
  
         const validation_check = zod_validation.safeParse({email,username,password});
         
         if(!validation_check.success){
          console.log(validation_check);
  
               
          return res.status(411).json({
              ok:false,
              errors:validation_check.error.format(),
              message:validation_check.error
          });
         }
      */
        const username_check = yield Users_1.default.findOne({ username: username });
        if (username_check) {
            return res.status(400).json({
                message: "Username Already taken..."
            });
        }
        const hashed_password = yield bcryptjs_1.default.hash(password, 10);
        yield Users_1.default.create({
            email: email,
            username: username,
            password: hashed_password
        });
        return res.status(200).json({
            ok: true,
            message: "User Registered Successfully.."
        });
    }
    catch (er) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: er
        });
    }
}));
exports.default = Auth_Router;
