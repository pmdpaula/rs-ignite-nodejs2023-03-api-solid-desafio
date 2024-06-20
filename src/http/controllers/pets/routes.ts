import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { search } from "./search";
import { create } from "./create";
import { fetchByCity } from "./fetch-by-city";
import { getById } from "./get-by-id";
// import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export const petsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/pets", create);
  app.get("/pets/city", fetchByCity);
  app.get("/pets/:id", getById);
  app.get("/pets/search", search);

  // app.post('/pets', { onRequest: [verifyUserRole('ADMIN')] }, create);
};
