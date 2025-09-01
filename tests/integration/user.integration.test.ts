import { prisma, api } from "../setup";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await api.post("/api/v1/users/register").send({
      username: "register",
      email: "register@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("id");

    const user = await prisma.user.findUnique({
      where: { email: "register@example.com" },
    });
    expect(user).not.toBeNull();
  });

  it("should login and return JWT", async () => {
    await api.post("/api/v1/users/register").send({
      username: "login",
      email: "login@example.com",
      password: "123456",
    });

    const res = await api.post("/api/v1/users/login").send({
      email: "login@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("token");
  });

  it("should return user information", async () => {
    await api.post("/api/v1/users/register").send({
      username: "login",
      email: "login@example.com",
      password: "123456",
    });

    const loginRes = await api.post("/api/v1/users/login").send({
      email: "login@example.com",
      password: "123456",
    });

    const profileRes = await api
      .get("/api/v1/users/profile")
      .set("Authorization", "Bearer " + loginRes.body.data.token);

    expect(profileRes.statusCode).toBe(200);
    expect(profileRes.body.data).toHaveProperty("id");
  });
});
