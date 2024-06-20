import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    organization: {
      sub: string;
      role: "ADMIN" | "MEMBER";
    }; // user type is return type of `request.user` object
  }
}
