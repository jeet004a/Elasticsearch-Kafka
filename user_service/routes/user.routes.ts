import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {db} from '../db/db'
import { JWT_EXPIRES_IN,JWT_SECRET } from '../config';

require("dotenv").config();

const router = express.Router();

export const gereateToken=async(payload: object)=>{
    try {
        return  jwt.sign(payload,JWT_SECRET,{expiresIn: '1h'})
    } catch (error) {
        console.log(error)
    }
}


router.post("/register", async (req:Request, res:Response,next:NextFunction):Promise<any> => {
  const { username, email, password } = req.body;

  const userExists = await db.query("SELECT * FROM users1 WHERE email = $1", [
    email,
  ]);

  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.query(
    "INSERT INTO users1 (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, hashedPassword]
  );

  return res
    .status(201)
    .json({ message: "User created", user: newUser.rows[0] });
});

router.post("/login", async (req:Request, res:Response,next:NextFunction):Promise<any> => {
  const { email, password } = req.body;

  const user = await db.query("SELECT * FROM users1 WHERE email = $1", [email]);

  if (user.rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  let userData:any=user.rows[0]
  const validPassword = await bcrypt.compare(password, userData?.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // console.log(userData?.id,userData?.email)
  const token = await gereateToken({
    id: userData?.id,
    email: userData?.email,
  });

  return res.status(200).json({ message: "Login successful", token });
});

router.get("/validate", async (req:Request, res:Response,next:NextFunction):Promise<any> => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tokenData = token.split(" ")[1];
    const user = jwt.verify(tokenData, JWT_SECRET);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

export default router

/*
if you would like to use middleware to authorize routes, you can use the following code:

// Middleware to authorize routes
const requestAuthorizer = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const tokenData = token.split(" ")[1];
  jwt.verify(tokenData, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

// Example of a protected route
 router.get("/profile", requestAuthorizer, async (req, res) => {

  // if user is authorized, their details will be available in req
  const authorisedUser = req.user;

   return res.json({ 
      message: "User profile fetched successfully",
      user: req.user,
    });
 });

 */