import { api, prisma } from "../setup";

let token: string;

beforeAll(async () => {
  await prisma.point.deleteMany();
  await prisma.user.deleteMany();

  await api.post("/api/v1/users/register").send({
    username: "points",
    email: "points@example.com",
    password: "123456",
  });

  const loginRes = await api.post("/api/v1/users/login").send({
    email: "points@example.com",
    password: "123456",
  });

  token = loginRes.body.data.token;
});

describe("Points API", () => {
  it("should earn points", async () => {
    const res = await api
      .post("/api/v1/points/earn")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 100,
        description: "Shopping",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("amount", 100);

    const points = await prisma.point.findMany({
      where: { userId: res.body.userId },
    });

    expect(points.length).toBeGreaterThan(0);
  });

  it("should redeem points", async () => {
    const res = await api
      .post("/api/v1/points/redeem")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 50,
        description: "Shopping",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("amount", 50);

    const points = await prisma.point.findMany({
      where: { userId: res.body.userId },
    });

    expect(points.length).toBeGreaterThan(0);
  });

  it("should return user balance", async () => {
    const res = await api
      .get("/api/v1/points/balance")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("balance");
    expect(res.body.data.balance).toBeGreaterThanOrEqual(50);
  });

  it("should return points history", async () => {
    const res = await api
      .get("/api/v1/points/history")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
