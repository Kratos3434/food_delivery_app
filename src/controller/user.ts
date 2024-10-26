import { PROXY_USER_BASE_URL, USER_BASE_URL } from "@/env";

export const signin = async (email: string, password: string) => {
    try {
        if (!email) throw "Email is required";
        if (!password) throw "Password is required";

        const res = await fetch(`${PROXY_USER_BASE_URL}/public/user/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();

        if (!data.status) {
            throw data.error;
        }

        return data;
    } catch (err) {
        console.log(err)
        throw {
            status: false,
            code: 400,
            error: err
        }
    }
}

export const getProfileByBearerToken = async (token?: string) => {
    const res = await fetch(`${USER_BASE_URL}/private/user/profile`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        cache: 'no-store'
    });

    const data = await res.json();

    return data.data;
}

export const logout = async () => {
    const res = await fetch('/internal_api/logout', {
        method: 'DELETE'
    });

    if (res.ok) {
        return true;
    }

    return false;
}

export const signup = async (user: {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    password2: string
}) => {
    if (!user.email) throw "Email is required";
    if (!user.firstName) throw "First name is required";
    if (!user.lastName) throw "Last name is required";
    if (!user.password) throw "Password is required";
    if (!user.password2) throw "Please confirm your password";
    if (user.password !== user.password2) throw "Passwords do not match";

    //use PROXY_USER_BASE_URL
    const res = await fetch(`${PROXY_USER_BASE_URL}/public/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            password2: user.password2
        })
    });

    const data = await res.json();

    if (data.status) {
        return true;
    } else {
        throw data.error;
    }
}

export const verify = async (otp: string, token?: string) => {
    if (!otp) throw "OTP is required";
    if (!token) throw "Token is missing";

    const res = await fetch(`${PROXY_USER_BASE_URL}/private/user/verify/${otp}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (data.status) {
        return true;
    } else {
        throw data.error;
    }
}

export const sendPasswordResetLink = async (email: string) => {
    if (!email) throw "Email is required";

    const res = await fetch(`${PROXY_USER_BASE_URL}/public/user/forgot/${email}`);

    const data = await res.json();

    if (data.status) {
        return true;
    } else {
        throw data.error;
    }
}
