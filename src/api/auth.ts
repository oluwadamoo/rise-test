import { GET, POST } from "../services"

interface SignupPayload {
    first_name: string;
    last_name: string;
    email_address: string;
    password: string;
    date_of_birth: Date;
    username?: string;
    phone_number?: string;
}

interface SigninPayload {
    email_address: string;
    password: string;

}

export const AUTH = {
    SIGNUP: async (payload: SignupPayload) => {
        const data = await POST("users", payload)
        return data
    },
    SIGNIN: async (payload: SigninPayload) => {
        const data = await POST("sessions", payload);
        return data
    },
    GETSESSION: async () => {
        const data = await GET("sessions")
        return data;
    }
}