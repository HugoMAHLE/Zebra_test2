import { UserModel } from "../models/users.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


// api/v1/users/register
const register = async(req, res) => {
  try{
    console.log(3)
    const {userid, email, pass} = req.body

    if(!userid || !email || !pass){
      return res.status(400).json({ ok: false, msg: "Missing Data" })
    }

    const user = await UserModel.findOneByEmail(email)
    if(user) {
      return res.status(409).json({ ok: false, msg: "User already exist" })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashpass = await bcryptjs.hash(pass, salt)

    const newUser = await UserModel.createUser({userid, email, pass: hashpass, utype:1})

    const token = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn:  "1h" }
    )

    return res.status(201).json({ok:true, token: token})

  }catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor' + error
    })

  }
}

// api/v1/users/login
const login = async (req, res) => {
  try {

    const { userid, pass } = req.body;
    if (!userid || !pass) {
      console.log("Missing userid or pass");
      return res.status(400).json({ ok: false, msg: "Missing Data" });
    }

    const user = await UserModel.findOneById(userid);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ ok: false, msg: "User does not exist" });
    }

    const isMatch = await bcryptjs.compare(pass, user.pass);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ ok: false, msg: "Password is incorrect" });
    }

    // defining expiration time for the token depending on user type
    let expiresIn;
    switch (user.type) {
      case "admin":
        expiresIn = "15m";
        break;
      case "user":
        expiresIn = "3d";
        break;
      case "general":
        expiresIn = "0";
        break;
      default:
        return res.status(400).json({ ok: false, msg: "Invalid user type" });
    }

    const token = jwt.sign(
      { userid: user.userid, type: user.type },
      process.env.JWT_SECRET,
      expiresIn === "0" ? undefined : { expiresIn }
    );

    return res.json({ ok: true, token: token, type: user.type });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

// api/v1/users/profile
const getProfile = async(req, res) => {
  try{
    const user = await UserModel.findOneById(req.userid)
    return res.status(500).json({ ok: true, msg: user})
  }catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error server'
    })
  }
}

export const UserController = {
  register,
  login,
  getProfile
}
