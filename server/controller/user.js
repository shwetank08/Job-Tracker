import cookieToken from "../utils/cookieToken.js";
import User from "../model/user.js"

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if(!user){
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    cookieToken(user,res);

  } catch (err) {
    res.status(500).json({ error: "server error", detail: err.message });
  }
};

export const signup = async(req,res) => {
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                error: "All fields are mandatory"
            })
        }

        const newUser = await User.create({
            name, email, password
        })

        cookieToken(user,res);
    }catch(err){
        res.status(500).json({ error: "server error", detail: err.message });
    }
}

export const logout = async(req,res) => {
  try{
    res.cookie("token",null,{
      expiry: new Date(Date.now()),
      httpOnly: true
    })
    res.status(200).send({
      message: "user logged out",
    })
  }catch(err){
    res.status(400).json({error: "server error", detail: err.message});
  }
}

export const getUser = async(req,res) => {
  try{
    const showUser = await User.findById(req.params.id);
    if(!showUser){
      return res.status(400).json({message:"user does not exists"})
    }
    res.status(200).json({
      success: "true",
      showUser
    })
  }catch(err){
    return res.status(400).json({message: "user does not exists"})
  }
}
export const getAllUser = async(req,res) => {
  try{
    const showAllUser = await User.find()
    if(!showAllUser){
      return res.status(400).json({message:"user does not exists"})
    }
    res.status(200).json({
      success: "true",
      showAllUser
    })
  }catch(err){
    return res.status(400).json({message: "user does not exists"})
  }
}