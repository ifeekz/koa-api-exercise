import "reflect-metadata"
import { Container } from "typedi";
import { createKoaServer, useContainer } from "routing-controllers"

/**
 * Setup routing-controllers to use typedi container.
 */
 useContainer(Container);

// Process.env comprised of strings, typecast the port to a number.
const HOST: string = process.env.HOST || 'localhost'
const PORT: number = Number(process.env.PORT) || 3000

createKoaServer({
  controllers: [__dirname + '/*/*.controller.ts']
}).listen(PORT, () => {
  console.log(`==========================================`)
  console.log(`Server running on http://${HOST}:${PORT}`)
  console.log(`==========================================`)
})
