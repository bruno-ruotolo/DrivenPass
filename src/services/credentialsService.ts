import { CreateCredentialsData } from "../controllers/credentialsController";
import * as credentialsRepository from "../repositories/credentialsRepository.js"

export async function createCredentials(credentialsData: CreateCredentialsData) {


  await credentialsRepository.create(credentialsData);
};