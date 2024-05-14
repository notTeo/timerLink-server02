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

  const currentTimestamp: number = Math.floor(Date.now() / 1000);
  const expirationTimestamp: number = currentTimestamp + 3600;

  return jwt.sign(
    { _id: user._id, exp: expirationTimestamp },
    process.env.JWT_SECRET
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
  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    throw new Error("User already exists");
  }
  if (!confirmPassword || password !== confirmPassword) {
    throw new Error("Passwords do not match");
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
