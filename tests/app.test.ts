import supertest from "supertest";

import app from "../src/app.js";
import prisma from "../src/config/db.js";
import authFactory from "./Factories/authFactory.js";
import credentialsFactory from "./Factories/credentialsFactory.js";

afterEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE sessions`;
  await prisma.$executeRaw`TRUNCATE TABLE credentials`;
  await prisma.$executeRaw`DELETE FROM users WHERE email = 'admin@admin.com'`;
});

describe("Auth Register Suite", () => {
  it("given a valid user it should return 201", async () => {
    const userBody = authFactory.createUserBody();

    const result = await supertest(app).post("/sign-up").send(userBody);
    const status = result.status;

    const user = await prisma.users.findUnique({ where: { email: userBody.email } });

    expect(user.email).toBe(userBody.email);
    expect(status).toEqual(201);
  });

  it("given a invalid body it should return 422", async () => {
    const userBody = authFactory.createUserBody();

    const result = await supertest(app).post("/sign-up").send({ email: userBody.email });
    const status = result.status;

    const user = await prisma.users.findUnique({ where: { email: userBody.email } });

    expect(user).toBeNull();
    expect(status).toEqual(422);
  });

  it("given a conflict email it should return 409", async () => {
    const userBody = authFactory.createUserBody();
    await authFactory.createUserPrisma(userBody);

    const result = await supertest(app).post("/sign-up").send(userBody);
    const status = result.status;

    expect(status).toEqual(409);
  });
});

describe("Auth Login Suite", () => {
  it("given a valid user it should return 201 and a token", async () => {
    const userBody = authFactory.createUserBody();
    await authFactory.createUserPrisma(userBody);

    const result = await supertest(app).post("/").send(userBody);
    const status = result.status;
    const token = result.body.token;

    expect(token).not.toBeUndefined;
    expect(status).toEqual(200);
  });

  it("given a invalid body it should return 422", async () => {
    const userBody = authFactory.createUserBody();
    await authFactory.createUserPrisma(userBody);

    const result = await supertest(app).post("/").send({ email: userBody.email });
    const status = result.status;
    const token = result.body.token;

    expect(token).toBeUndefined;
    expect(status).toEqual(422);
  });

  it("given a invalid credential it should return 401", async () => {
    const userBody = authFactory.createUserBody();
    await authFactory.createUserPrisma(userBody);

    const result = await supertest(app).post("/").send({ ...userBody, password: "0123456789" });
    const status = result.status;
    const token = result.body.token;

    expect(token).toBeUndefined;
    expect(status).toEqual(401);
  });
});


//CREDENTIALS
describe("Credentials Suite", () => {
  it("given a valid credential body it should return 201", async () => {
    const user = await supertest(app)
      .post("/")
      .send({ email: "superadmin@admin.com", password: "0123456789" });
    const token = user.body.token;

    const credentialBody = credentialsFactory.createCredentialsBody();

    const result = await supertest(app)
      .post("/credentials")
      .set("Authorization", `Bearer ${token}`)
      .send(credentialBody);
    const status = result.status;

    console.log(result);

    expect(status).toEqual(201);
  });
});
