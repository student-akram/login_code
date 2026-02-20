const details=require('../models/user');
exports.signup=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        //validation
        if(!name||!email||!password){
            return res.status(400).json({message:"All fields are required"});

        }
        //check if user already exists
        const existingUser=await details.findOne({where:{email}})
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        //create new user
        await details.create({name,email,password});
        res.status(201).json({message:"User created successfully"});

    }
    catch(err){
        res.status(500).json({message:"Server error"});

    }
};