import { PROXY_USER_BASE_URL, USER_BASE_URL } from "@/env"

export const getEmailByOtpToken = async (token?: string) => {
    const res = await fetch(`${USER_BASE_URL}/private/otp/decode`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    return data.data.email;
}

export const resendOtp = async (token?: string) => {
    const res = await fetch(`${PROXY_USER_BASE_URL}/private/otp/resend`, {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.status) {
        return data.isOneMinuteOld;
    } else {
        throw data.error;
    }
}

export const clearVerifyToken = async () => {
    await fetch("/internal_api/otp", {
        method: 'DELETE'
    });
}