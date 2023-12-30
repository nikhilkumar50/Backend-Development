const express = require("express");
const users = require("../MOCK_DATA.json");
const fs = require("fs");
const User=require('../models/user.model');
const mongoose=require("mongoose");



exports.checkId=async(req,res,next,value)=>{
  console.log(`User ID is ${value}`);
  const user=await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ status: "error", message: "Failed to found user" });
  }
  next();
}
     
exports.validateBody=(req,res,next)=>{
  if(!req.body.first_name ||!req.body.last_name|| !req.body.email ||!req.body.gender ||!req.body.job_title){
    return res.status(400).json({
      status:"fail",
      message:"Not a valid data"
    })
  }
  next();
}



exports.getIndividualUser =async (req, res) => {
  const user=await User.findById(req.params.id);
  // if (user == null) {
  //   return res.json({ status: "error", message: "Failed to update user" });
  // }
  return res.json(user);
};



exports.updateUser =async (req, res) => {
  const body=req.body;
  const id=req.params.id;

  const updateUser=await User.findByIdAndUpdate(id,{$set:body});
  if(!updateUser){
    return res.status(404).json({message:"user not find!!!"})
  }
  return res.status(200).json({message:"success"});
  
};

exports.deleteUser =async (req, res) => {

  await User.findByIdAndDelete(req.params.id);
  return resstatus(200).json({status:"Success"});

};

exports.createUser = async(req, res) => {

  const body = req.body;

  const result=await User.create({
    firstName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title,

  });

  return res.status(201).json({msg:"user created",id:result._id});
};

exports.getAllusers = async(req, res) => {
  const allDbUsers=await User.find({});
  return res.status(200).json(allDbUsers);
};

