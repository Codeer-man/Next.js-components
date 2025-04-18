import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface userData {
  id: string | Types.ObjectId;
  email: string;
}

export const tokenGenerate = async (user: userData) => {
  const refreshTokenKey = process.env.JWT_REFRESH_TOKEN;
  const accessTokenKey = process.env.JWT_ACCESS_TOKEN;

  if (!accessTokenKey || !refreshTokenKey) {
    throw new Error(
      "JWT secrets are not configured. Please check your environment variables."
    );
  }

  const accessToken = jwt.sign(
    { email: user.email, id: user.id },
    accessTokenKey,
    { expiresIn: "15m" }
  );

  const refreshAccessToken = jwt.sign({ id: user.id }, refreshTokenKey, {
    expiresIn: "7d",
  });

  return { accessToken, refreshAccessToken };
};
