'use client'

import { resetPassword } from "@/controller/user";
import { Home } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { useState } from "react";

const ResetPassword = ({ authResult }: { authResult: boolean }) => {
    const [revealPass, setRevealPass] = useState(false);
    const [revealPass2, setRevealPass2] = useState(false);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        try {
            await resetPassword(password, password2);
        } catch (err: any) {
            setError(err);
        }
    }

    return (
        <div className="tw-w-full tw-h-[100dvh] tw-flex tw-justify-center tw-items-center">
            <div className="tw-rounded-md tw-max-w-[500px] tw-w-full tw-shadow-lg tw-bg-white tw-px-[16px] tw-py-[8px]">
                {
                    authResult ?
                        (
                            <>
                                <h1 className="tw-text-4xl tw-font-bold">Reset Password</h1>
                                <form className="tw-flex tw-flex-col" onSubmit={handleResetPassword}>
                                    <div className="tw-mt-5">
                                        <label className="tw-text-xl">
                                            Password
                                        </label>
                                        <div className="tw-w-full tw-rounded-md tw-border-[2px] tw-border-black tw-p-[8px] tw-flex">
                                            <input type={!revealPass ? "password" : "text"} className="tw-w-full tw-outline-none" onChange={e => setPassword(e.target.value)} />
                                            <div className="tw-cursor-pointer" onClick={() => setRevealPass(!revealPass)}>
                                                {!revealPass ? <Visibility /> : <VisibilityOff />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tw-mt-5">
                                        <label className="tw-text-xl">
                                            Confirm password
                                        </label>
                                        <div className="tw-w-full tw-rounded-md tw-border-[2px] tw-border-black tw-p-[8px] tw-flex">
                                            <input type={!revealPass2 ? "password" : "text"} className="tw-w-full tw-outline-none" onChange={e => setPassword2(e.target.value)} />
                                            <div className="tw-cursor-pointer" onClick={() => setRevealPass2(!revealPass2)}>
                                                {!revealPass2 ? <Visibility /> : <VisibilityOff />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tw-flex tw-w-full tw-items-center tw-flex-col tw-mt-5">
                                        {error && <small className="tw-text-red-500 tw-font-bold">*{error}</small>}
                                        <button className="tw-px-[50px] tw-py-[8px] tw-bg-indigo-500 hover:tw-brightness-95 tw-rounded-md tw-text-white tw-font-bold">
                                            Reset Password
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) :
                        (
                            <>
                                <h1 className="tw-text-4xl tw-font-bold">This link has expired or Invalid!</h1>
                                <p className="tw-mt-3">This happend when you wait too long to change your password or this link is invalid</p>
                                <div className="tw-w-full tw-flex tw-justify-center tw-my-5 tw-items-center">
                                    <Link href="/" className="tw-px-[50px] tw-py-[8px] tw-rounded-md tw-bg-indigo-500 tw-text-white tw-font-bold tw-flex tw-items-center tw-gap-1">
                                        <Home /> Home
                                    </Link>
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    );
}

export default ResetPassword;