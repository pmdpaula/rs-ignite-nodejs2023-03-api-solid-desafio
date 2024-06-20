import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { getByEmail } from "./get-by-email";

export const organizationsRoutes = async (app: FastifyInstance) => {
  app.post("/organizations", register);
  app.post("/sessions", authenticate);
  app.get("/organizations/email", getByEmail);
};
