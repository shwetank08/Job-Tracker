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

    res.status(200).json({
      message: "user logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

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

        res.status(200).json({
            message: "user signed up successfully",
            user:{
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })
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