import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, UserDocument } from "../../models";
import { blacklist } from "../../models/blacklist";

export async function login(
  username: string,
  password: string
): Promise<string> {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentialss");

  return jwt.sign(
    { _id: user._id }, 
    process.env.JWT_SECRET as string, 
    { expiresIn: '1d' } 
  );
}

export async function logout(token: string) {
  blacklist.add(token);
}

export async function register(
  username: string,
  password: string,
  email: string,
  confirmPassword: string
): Promise<UserDocument> {
  const registerErrors = []
  const existingUsername = await User.findOne({ username: username });

  if (existingUsername) {
    registerErrors.push("Username already exists");
  }
  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) {
    registerErrors.push("A user with this email address is already registered. Please use a different email.");
  }
  if (!confirmPassword || password !== confirmPassword) {
    registerErrors.push("Passwords do not match");
  }
  if (registerErrors.length > 0) {
    const error = new Error(registerErrors.join("\n"));
    (error as any).status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username: username,
    password: hashedPassword,
    email,
  });
  await user.save();
  return user;
}
