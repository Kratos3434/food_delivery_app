export interface UserProps {
    id: number,
    email: string
}

export interface ProfileProps {
    id: number,
    firstName: string,
    lastName: string,
    userId: number,
    user: UserProps,
    createdAt: Date,
    updatedAt?: Date
}