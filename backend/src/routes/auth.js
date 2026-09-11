import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const r=express.Router();
r.post("/register",async(req,res)=>{
 try{
  const {name,email,password,role="owner"}=req.body;
  if(!name||!email||!password)return res.status(400).json({message:"Name, email and password are required"});
  if(!["owner","influencer"].includes(role))return res.status(400).json({message:"Invalid role"});
  if(await User.findOne({email}))return res.status(409).json({message:"Email already registered"});
  const u=await User.create({name,email,password:await bcrypt.hash(password,12),role});
  const token=jwt.sign({id:u._id,role:u.role,name:u.name},process.env.JWT_SECRET,{expiresIn:"7d"});
  res.status(201).json({token,user:{id:u._id,name:u.name,email:u.email,role:u.role}});
 }catch(e){res.status(500).json({message:e.message})}
});
r.post("/login",async(req,res)=>{
 try{
  const {email,password}=req.body,u=await User.findOne({email});
  if(!u||!(await bcrypt.compare(password,u.password)))return res.status(401).json({message:"Invalid email or password"});
  const token=jwt.sign({id:u._id,role:u.role,name:u.name},process.env.JWT_SECRET,{expiresIn:"7d"});
  res.json({token,user:{id:u._id,name:u.name,email:u.email,role:u.role}});
 }catch(e){res.status(500).json({message:e.message})}
});
export default r;
