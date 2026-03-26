import { signupService, loginService, logoutAllService } from "../services/auth.service.js";
import { refreshService } from "../services/auth.service.js";
// signup
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signupService(email, password);
    res.status(201).json({
      message: "User created successfully",
      userId: user.id,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// login..
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokens = await loginService(email, password);
    res.status(200).json({
      message: "Login success",
      ...tokens,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
//refrehs service
export const  refresh=async(req,res)=>{
  try {
    const {token}=req.body;
    const data=await refreshService(token);
    res.json(data);
  } catch (error) {
    res.status(403).json({message:error.messgae});
  }
};
//. logout 
export const logoutAll = async (req, res) => {
  try {
    await logoutAllService(req.user.id);

    res.json({ message: "Logged out from all devices" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};