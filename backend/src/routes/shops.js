import express from "express";
import Shop from "../models/Shop.js";
import {auth,role} from "../middleware/auth.js";
const r=express.Router();
r.get("/",async(req,res)=>{
 const q={};
 if(req.query.category)q.category=new RegExp(req.query.category,"i");
 if(req.query.city)q.city=new RegExp(req.query.city,"i");
 if(req.query.search)q.$or=[{name:new RegExp(req.query.search,"i")},{description:new RegExp(req.query.search,"i")}];
 res.json(await Shop.find(q).populate("owner","name").sort({createdAt:-1}));
});
r.get("/:id",async(req,res)=>{
 const s=await Shop.findById(req.params.id).populate("owner","name email");
 if(!s)return res.status(404).json({message:"Shop not found"});res.json(s);
});
r.post("/",auth,role("owner"),async(req,res)=>res.status(201).json(await Shop.create({...req.body,owner:req.user.id})));
r.put("/:id",auth,role("owner"),async(req,res)=>{
 const s=await Shop.findOneAndUpdate({_id:req.params.id,owner:req.user.id},req.body,{new:true});
 if(!s)return res.status(404).json({message:"Shop not found"});res.json(s);
});
r.delete("/:id",auth,role("owner"),async(req,res)=>{await Shop.deleteOne({_id:req.params.id,owner:req.user.id});res.json({message:"Deleted"})});
export default r;
