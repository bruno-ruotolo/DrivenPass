import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";

import prisma from '../../src/config/db.js';
import { CreateUserData } from '../../src/controllers/authController.js';

function createUserBody(email = "admin@admin.com", passwordLength = 10) {
  return ({
    email,
    password: faker.internet.password(passwordLength)
  });
};

async function createUserPrisma(body: CreateUserData) {
  const SALT = 10;
  const userCreated = await prisma.users.create({
    data: {
      email: body.email,
      password: bcrypt.hashSync(body.password, SALT)
    }
  });
  return userCreated;
};

const authFactory = {
  createUserBody,
  createUserPrisma
};

export default authFactory;