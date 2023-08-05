import { Village  } from "./Village"
interface User {
    id: number,
    username: string,
    password: string,
    jwt: string
    villages: Village[]
}

export type { Village, User }