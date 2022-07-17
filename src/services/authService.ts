import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CreateUserData } from "../controllers/authController.js";
import * as authRepository from "../repositories/authRepository.js";
import * as utils from "../utils/utils.js";

//SERVICES
export async function register(userData: CreateUserData) {
  await isEmailConflicting(userData.email);

  const passwordHash = bcrypt.hashSync(userData.password, 10);
  userData = { ...userData, password: passwordHash };
  await authRepository.register(userData);
};

export async function login(userData: CreateUserData) {
  const user = await isEmailExisting(userData.email);
  await isCredentialsValid(userData.password, user.password,);
  const token = await generateJWTToken(user);

  await authRepository.createSession({ userId: user.id, token });

  return { token };
};

//AUXILIARY FUNCTIONS
async function isEmailConflicting(email: string) {
  const result = await authRepository.getUserByEmail(email);
  if (result) await utils.errorTypes("conflict", "This email already exists in our database");
};

async function isEmailExisting(email: string) {
  const result = await authRepository.getUserByEmail(email);
  if (!result) await utils.unauthorizedAuthError();
  return result;
};

async function isCredentialsValid(password: string, passwordHash: string) {
  if (!bcrypt.compareSync(password, passwordHash)) {
    await utils.unauthorizedAuthError()
  };
};

async function generateJWTToken(user: Users) {
  const { id, email } = user;

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
  const EXPIRATION_DATE = { expiresIn: "7d" }
  const token = jwt.sign({ email, id }, JWT_SECRET_KEY, EXPIRATION_DATE);

  return token;
};