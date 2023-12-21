export interface IData {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    description?: string
    address?: {
        streetAddress: string
        city: string
        state: string
        zip: string
    }
}