import { Amenities } from "./Amenities"

interface Village {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    location: string,
    address: string,
    phone: string,
    email: string,
    website: string,
    amenities: Amenities[]
}

export type { Village }