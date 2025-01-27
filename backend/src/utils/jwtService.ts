import jwt from "jsonwebtoken"

const signJwtToken = (payload: any) => jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" })

const decodeJwtToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET as string)

export { signJwtToken, decodeJwtToken }

