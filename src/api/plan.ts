import { GET, POST } from "../services"

interface CreatePlanPayload {
    plan_name: string;
    target_amount: number;
    maturity_date: Date;
}

interface ProjectionQueryPayload {
    monthly_investment?: string;
    target_amount?: string;

}

export const PLAN = {
    CREATE: async (payload: CreatePlanPayload) => {
        const data = await POST("plans", payload)
        return data
    },
    GETALL: async () => {
        const data = await GET("plans");
        return data
    },
    GETPLAN: async (id: string) => {
        const data = await GET(`plans/${id}`);
        return data
    },
    GETPLANPROJECTION: async (queries: ProjectionQueryPayload) => {
        const data = await GET(`plans/projection?monthly_investment=${queries.monthly_investment}&target_amount=${queries.target_amount}`)
        return data;
    },
    GETBANKS: async () => {
        const data = await GET("banks");
        return data
    },
    GETRATES: async () => {
        const data = await GET("rates");
        return data
    },
    GETQUOTES: async () => {
        const data = await GET("quotes");
        return data
    },

}