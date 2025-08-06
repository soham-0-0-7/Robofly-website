/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "redis";

const client = await createClient({
  url: "redis://default:KqAkXoYr0KDxrZHFZTu51CdeKWW4B0TV@redis-13860.crce182.ap-south-1-1.ec2.redns.redis-cloud.com:13860",
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

await client.set("key", "value");
const value = await client.get("key");
client.destroy();

// Redis Client Error Error: connect ECONNREFUSED 43.205.135.29:13860
//     at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1605:16) {
//   errno: -4078,
//   code: 'ECONNREFUSED',
//   syscall: 'connect',
//   address: '43.205.135.29',
//   port: 13860
// }
// Redis Client Error Error: connect ECONNREFUSED 43.205.135.29:13860
//     at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1605:16) {
//   errno: -4078,
//   code: 'ECONNREFUSED',
//   syscall: 'connect',
//   address: '43.205.135.29',
//   port: 13860
// }