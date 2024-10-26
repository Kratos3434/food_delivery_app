'use client'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { signup } from "@/controller/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        password2: ""
    });

    const [revealPass, setRevealPass] = useState(false);
    const [revealPass2, setRevealPass2] = useState(false);
    const [error, setError] = useState("");
    const [loading, isLoading] = useState(false);

    const handleSignup = async (e: any) => {
        e.preventDefault();
        setError("");
        isLoading(true);
    
        try {
            await signup(user);
            router.replace("/verify");
        } catch (err: any) {
            isLoading(false);
            setError(err);
        }
    }

    return (
        <div className="tw-h-[100dvh] tw-w-full">
            <div className="tw-justify-center tw-items-center tw-flex tw-h-full tw-w-full">
                <div className="tw-flex tw-items-center tw-gap-10 laptop:tw-flex-row tw-flex-col">
                    <div className="tablet:tw-w-[400px] tw-w-full tw-flex tw-flex-col tw-justify-center laptop:tw-border-r-[1px] tw-border-r-0 laptop:tw-border-b-0 tw-border-b-[1px] tw-border-black laptop:tw-text-left tw-text-center">
                        <p className="tw-text-8xl tw-font-bold">Local</p>
                        <p className="tw-text-8xl tw-text-indigo-500 tw-font-bold">Eat</p>
                        <div className="tw-my-5">
                            <p className="tw-text-lg tw-font-bold">Let&apos;s eat local</p>
                            <p className="tw-text-lg tw-font-bold">Support local restaurants</p>
                        </div>
                    </div>

                    <div className="tablet:tw-w-[400px] tw-w-full tw-rounded-lg tw-shadow-lg tw-p-1 tw-px-[8px] tw-py-[16px]">
                        <h1 className="tw-text-4xl tw-font-bold">Sign up</h1>
                        <form className="tw-mt-10" onSubmit={handleSignup}>
                            <div>
                                <label className="tw-text-xl">
                                    Email
                                </label>
                                <input type="email" className="tw-w-full tw-outline-none tw-rounded-md tw-border-[2px] tw-border-black tw-p-[8px]" onChange={e => { user.email = e.target.value }} />
                            </div>
                            <div>
                                <label className="tw-text-xl">
                                    First name
                                </label>
                                <input type="text" className="tw-w-full tw-outline-none tw-rounded-md tw-border-[2px] tw-border-black tw-p-[8px]" onChange={e => { user.firstName = e.target.value }} />
                            </div>
                            <div>
                                <label className="tw-text-xl">
                                    Last name
                                </label>
                                <input type="text" className="tw-w-full tw-outline-none tw-rounded-md tw-border-[2px] tw-border-black tw-p-[8px]" onChange={e => { user.lastName = e.target.value }} />
                            </div>
                            <div className="tw-mt-5">
                                <label className="tw-text-xl">
                                    Password
                                </label>
                                <div className="tw-w-full tw-rounded-md tw-border-[2px] tw-border-black tw-p-[8px] tw-flex">
                                    <input type={!revealPass ? "password" : "text"} className="tw-w-full tw-outline-none" onChange={e => user.password = e.target.value} />
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
                                    <input type={!revealPass2 ? "password" : "text"} className="tw-w-full tw-outline-none" onChange={e => user.password2 = e.target.value} />
                                    <div className="tw-cursor-pointer" onClick={() => setRevealPass2(!revealPass2)}>
                                        {!revealPass2 ? <Visibility /> : <VisibilityOff />}
                                    </div>
                                </div>
                            </div>
                            <div className="tw-mt-3">
                                <p className="tw-font-bold">
                                    Already signed up? <Link href="/signin" className="tw-text-indigo-500 hover:tw-underline">sign in</Link>
                                </p>
                            </div>
                            <div className="tw-mt-14 tw-flex tw-flex-col tw-items-center tw-gap-1">
                                { error && <small className="tw-text-red-600 tw-font-bold">*{error}</small> }
                                <div className="tw-flex tw-justify-center tw-items-center">
                                    <button className={`tw-bg-indigo-500 tw-text-xl tw-rounded-md tw-px-[30px] tw-py-[8px] tw-text-white tw-font-bold hover:tw-brightness-95 tw-flex tw-gap-5 ${loading && "tw-cursor-not-allowed"}`} disabled={loading}>
                                        <span>
                                            Sign in
                                        </span>
                                        {loading && <CircularProgress color="secondary" size={25} />}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;