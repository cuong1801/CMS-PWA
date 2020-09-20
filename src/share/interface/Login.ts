export interface UserLoginState extends Record<string, unknown> {
    accessToken?: string
    email?: string
    id?: string
    name?: string
}

export interface LoginResponse {
    accessToken?: string
    expiresIn?: string
}
