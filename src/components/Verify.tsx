'use client'

import { clearVerifyToken, resendOtp } from "@/controller/otp";
import { verify } from "@/controller/user";
import { Email } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Verify = ({ email, token }: { email?: string, token?: string }) => {
    const router = useRouter();
    const [loading, isLoading] = useState(false);
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [resendLoading, setResendLoading] = useState(true);
    const [oneMinuteOld, isOneMinuteOld] = useState(false);
    const [resendError, setResendError] = useState("");

    const handleVerify = async (e: any) => {
        e.preventDefault();
        setError("");
        isLoading(true);
        try {
            await verify(otp, token);
            //Clear the verify token
            await clearVerifyToken();
            //Go to the signin page
            router.replace("/signin");
        } catch (err: any) {
            isLoading(false);
            setError(err);
        }
    }

    const handleResend = async () => {
        setResendLoading(true);
        setOpenModal(true);
        try {
            const result = await resendOtp(token);
            isOneMinuteOld(result);
        } catch (err: any) {
            setResendError(error);
        }
        setResendLoading(false);
    }

    return (
        <div className="tw-w-full tw-h-[100dvh]">
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
                <div className="tw-max-w-[500px] tw-w-full tw-px-[16px] tw-py-[8px] tw-rounded-md tw-shadow-xl">
                    <h1 className="tw-text-4xl tw-font-bold">Verify <span className="tw-text-indigo-500">OTP</span></h1>
                    <p className="tw-my-3 tw-text-base">An email has been sent to <span className="tw-font-bold">{email}</span></p>
                    <form className="tw-my-5" onSubmit={handleVerify}>
                        <div className="tw-flex tw-items-center tw-w-full tw-gap-1">
                            <input type="text" placeholder="XXXXXX" className="tw-outline-none tw-border-[1px] tw-border-black tw-rounded-md tw-w-full tw-p-2" onChange={(e) => setOtp(e.target.value)} />
                            <button className={`tw-bg-indigo-500 tw-rounded-md tw-p-2 tw-text-white tw-font-bold hover:tw-brightness-95 ${loading && "tw-cursor-not-allowed"}`} disabled={loading}>
                                {loading ? "Verifying..." : "Verify"}
                            </button>
                        </div>
                        {error && <small className="tw-text-red-600 tw-font-bold">*{error}</small>}
                    </form>
                    <p>
                        Didn&apos;t receive? <span className="tw-text-indigo-500 tw-cursor-pointer hover:tw-underline tw-font-bold" onClick={handleResend}>resend</span>
                    </p>
                </div>
            </div>

            {/**Modal */}
            {
                openModal &&
                (
                    <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-[100dvh] tw-bg-[rgba(0,0,0,0.5)] tw-flex tw-justify-center tw-items-center">
                        <div className="tw-max-w-[400px] tw-w-full tw-px-[16px] tw-py-[8px] tw-shadow-lg tw-rounded-md tw-bg-white">
                            {
                                resendLoading ?
                                    (
                                        <div className="tw-flex tw-w-full tw-justify-center tw-items-center tw-my-5">
                                            <CircularProgress />
                                        </div>
                                    ) :
                                    (
                                        <>
                                            <p className="tw-text-center tw-text-xl tw-font-bold">
                                                Please check your inbox <Email className="tw-text-indigo-500" />
                                            </p>
                                            {
                                                oneMinuteOld &&
                                                (
                                                    <p className="tw-text-center">
                                                        An email has been sent to <span className="tw-font-bold">{email}</span>
                                                    </p>
                                                )
                                            }
                                            {resendError && <p>{resendError}</p>}
                                            <div className="tw-flex tw-justify-center tw-items-center tw-my-5">
                                                <button className="tw-px-[16px] tw-py-[8px] tw-rounded-md tw-bg-indigo-500 tw-font-bold tw-text-white tw-text-lg hover:tw-brightness-95"
                                                    onClick={() => setOpenModal(false)}>
                                                    Close
                                                </button>
                                            </div>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Verify;