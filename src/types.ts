export type ApiResponse = {
    code: string,
    message: string,
    data?: object | object[]
}


export type UserData = {
    id: number,
    name: string,
    email: string,
}