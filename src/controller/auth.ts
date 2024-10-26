import { USER_BASE_URL } from "@/env"

export const authenticateBearerToken = async (token?: string) => {
    const res = await fetch(`${USER_BASE_URL}/auth/authenticate`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.status) {
        return true;
    } else {
        return false;
    }
}