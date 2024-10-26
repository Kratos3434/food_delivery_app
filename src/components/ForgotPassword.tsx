'use client'
import { sendPasswordResetLink } from "@/controller/user";
import { Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const ForgotPassword = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, isLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e: any) => {
        e.preventDefault();
        setError("");
        isLoading(true);
        setOpenModal(true);
        try {
            await sendPasswordResetLink(email);
            isLoading(false);
        } catch (err: any) {
            setError(err);
            setOpenModal(false);
            isLoading(false);
        }
    }

    return (
        <div className="tw-w-full tw-h-[100dvh] tw-items-center tw-justify-center tw-flex">
            <div className="tw-max-w-[500px] tw-w-full tw-px-[8px] tw-py-[16px] tw-bg-white tw-shadow-xl tw-rounded-md">
                <h1 className="tw-text-4xl tw-font-bold">
                    Forgot Password
                </h1>
                <p className="tw-my-3">Please enter your email:</p>
                <form onSubmit={handleForgotPassword}>
                    <div className="tw-w-full">
                        <input type="email" className="tw-w-full tw-outline-none tw-border-[1px] tw-border-black tw-p-[16px] tw-rounded-md" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="tw-flex tw-justify-center tw-items-center tw-mt-3 tw-flex-col tw-gap-1">
                        {error && <small className="tw-text-red-500 tw-font-bold">*{error}</small>}
                        <button className="tw-px-[25px] tw-py-[8px] tw-rounded-md tw-bg-indigo-500 tw-text-white tw-font-bold tw-text-lg hover:tw-brightness-95">
                            Send
                        </button>
                    </div>
                </form>
            </div>

            {/** Modal */}
            {
                openModal &&
                (
                    <div className="tw-fixed tw-top-0 tw-left-0 tw-h-[100dvh] tw-w-full tw-flex tw-justify-center tw-items-center tw-bg-[rgba(0,0,0,0.5)]">
                        <div className="tw-max-w-[500px] tw-w-full tw-bg-white tw-shadow-lg tw-py-[16px] tw-px-[8px] tw-rounded-md tw-relative">
                            {
                                loading ?
                                    (
                                        <div className="tw-flex tw-justify-center tw-items-center">
                                            <CircularProgress />
                                        </div>
                                    ) :
                                    (
                                        <>
                                            <div className="tw-absolute tw-right-[16px] tw-cursor-pointer" onClick={() => setOpenModal(false)}>
                                                <Close fontSize="large" className="tw-text-indigo-500" />
                                            </div>
                                            <div className="tw-text-center">
                                                <p className="tw-text-4xl tw-font-bold tw-text-indigo-500">Email sent!</p>
                                                <p className="tw-my-10 tw-text-xl tw-font-bold">
                                                    If this email exists, a password reset link will be sent to your inbox
                                                </p>
                                                <Link className="tw-px-[25px] tw-py-[8px] tw-rounded-md tw-bg-indigo-500 tw-text-white tw-font-bold tw-text-lg hover:tw-brightness-95" href="/signin">
                                                    Sign in
                                                </Link>
                                            </div>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ForgotPassword;