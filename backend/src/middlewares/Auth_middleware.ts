
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const JWT_SECRET = process.env.JWT_SECRET_KEY

if(!JWT_SECRET){
    console.log("FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
}
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const secret = process.env.SECRET_KEY;

const Authentication_token = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token found"
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || typeof decoded !== 'object' || !('user_id' in decoded)) {
      return res.status(401).json({
        message: "Invalid token payload"
      });
    }
    //@ts-ignore
    req.user = decoded; // will have userId inside
    next();
  } catch (er) {
    return res.status(401).json({
      message: "Invalid token",
      //@ts-ignore
      error: er.message
    });
  }
};

export default Authentication_token;
