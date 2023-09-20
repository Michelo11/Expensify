import Next from "next"

declare module "next" {
  interface NextApiRequest {
    file?: Express.Multer.File
    files?: Express.Multer.File[]
  }
}