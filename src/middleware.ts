export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/autoswitch", "/:id*/dashboard"] };