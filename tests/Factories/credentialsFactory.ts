import { faker } from '@faker-js/faker';
import Criptr from "cryptr";
import dotenv from "dotenv";
dotenv.config();

import prisma from '../../src/config/db.js';
import { CreateCredentialsData } from '../../src/controllers/credentialsController.js';

function createCredentialsBody(passwordLength = 10) {
  return ({
    title: faker.internet.domainName(),
    password: faker.internet.password(passwordLength),
    username: faker.internet.userName(),
    url: faker.internet.url()
  });
};

async function createCredentialsPrisma(credentialData: CreateCredentialsData) {
  const CRYPTR_SECRET_KEY = process.env.CRYPTR_SECRET_KEY;
  const cryptr = new Criptr(CRYPTR_SECRET_KEY);

  const data = { ...credentialData, password: cryptr.encrypt(credentialData.password) }
  const credential = await prisma.credentials.create({ data });

  return credential;
};

const credentialsFactory = {
  createCredentialsBody,
  createCredentialsPrisma
};

export default credentialsFactory;