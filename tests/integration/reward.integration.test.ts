import { api, prisma } from "../setup";

let token: string;
let rewardId: number;

beforeAll(async () => {
  await prisma.point.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.user.deleteMany();

  const reward = await prisma.reward.create({
    data: {
      name: "Gift Card",
      description: "Amazon 50₺",
      pointsCost: 50,
      isActive: true,
      stock: 5,
    },
  });

  rewardId = reward.id;

  await api.post("/api/v1/users/register").send({
    username: "rewards",
    email: "rewards@example.com",
    password: "123456",
  });

  const loginRes = await api.post("/api/v1/users/login").send({
    email: "rewards@example.com",
    password: "123456",
  });

  token = loginRes.body.data.token;

  await api
    .post("/api/v1/points/earn")
    .set("Authorization", `Bearer ${token}`)
    .send({
      amount: 100,
      description: "Initial bonus",
    });
});

describe("Rewards API", () => {
  it("should list rewards", async () => {
    const res = await api
      .get("/api/v1/rewards")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty("name", "Gift Card");
  });

  it("should get reward details", async () => {
    const res = await api
      .get(`/api/v1/rewards/${rewardId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("id", rewardId);
    expect(res.body.data).toHaveProperty("pointsCost", 50);
  });

  it("should claim a reward if user has enough points", async () => {
    const res = await api
      .post("/api/v1/rewards/claim")
      .set("Authorization", `Bearer ${token}`)
      .send({ rewardId });

    expect(res.statusCode).toBe(200);

    const updatedReward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });

    expect(updatedReward?.stock).toBe(4);

    const balanceRes = await api
      .get("/api/v1/points/balance")
      .set("Authorization", `Bearer ${token}`);

    expect(balanceRes.body.data.balance).toBeLessThan(100);
  });
});
