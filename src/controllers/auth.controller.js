import { signupService, loginService } from "../services/auth.service.js";

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

// login
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