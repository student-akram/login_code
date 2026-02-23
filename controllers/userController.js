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
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN HIT");

    const user = await details.findOne({ where: { email } });

    if (!user) {
      console.log("User not found block");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Entered:", password);
    console.log("DB:", user.password);

    if (user.password !== password) {
      console.log("Password mismatch block");
      return res.status(401).json({
        message: "User not authorized"
      });
    }

    console.log("Login success block");
    return res.status(200).json({
  message: "User login successful"
});

  } catch (err) {
    console.log("Catch block:", err);
    return res.status(500).json({ message: "Server error" });
  }
  
};
