import "reflect-metadata";
import * as Koa from "koa";
import * as HttpStatus from "http-status-codes";
import { Container } from "typedi";
import { createKoaServer, useContainer } from "routing-controllers";

/**
 * Setup routing-controllers to use typedi container.
 */
useContainer(Container);

// Process.env comprised of strings, typecast the port to a number.
const HOST: string = process.env.HOST || "localhost";
const PORT: number = Number(process.env.PORT) || 3000;

const app = createKoaServer({
  routePrefix: "/api",
  controllers: [__dirname + "/*/*.controller.ts"],
});

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status =
      error.statusCode ||
      error.status ||
      HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit("error", error, ctx);
  }
});

app.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log(`==========================================`);
});
