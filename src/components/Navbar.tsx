'use client'

import { logout } from "@/controller/user";
import { userAtom } from "@/store";
import { AccountCircle, ExitToApp, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useAtom(userAtom);
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleLogout = async () => {
        const res = await logout();

        if (res) {
            setUser(null);
            //router.push("/signin");
            setOpenDropdown(false);
        }
    }

    return (
        <nav className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-p-[16px] tw-shadow-xl tw-bg-white tw-flex tw-justify-center tw-items-center tw-h-[70px]">
            <Link className="tw-absolute tw-left-[16px]" href="/">
                <p className="tw-font-bold tw-text-5xl">
                    <span>
                        Local
                    </span>
                    <span className="tw-text-indigo-500">
                        Eat
                    </span>
                </p>
            </Link>
            <div className="tw-absolute tw-right-[16px]">
                {
                    user ?
                        (
                            <div className="tw-rounded-md tw-bg-indigo-500 tw-px-[8px] tw-py-[16px] tw-flex tw-items-center tw-gap-3 tw-cursor-pointer hover:tw-brightness-95" onClick={() => setOpenDropdown(!openDropdown)}>
                                {
                                    openDropdown ? <KeyboardArrowUp className="tw-text-white" /> : <KeyboardArrowDown className="tw-text-white" />
                                }
                                <p className="tw-text-white tw-font-bold tw-text-xl">
                                    Hi, {user?.firstName}
                                </p>
                                <AccountCircle className="tw-w-[30px] tw-h-[30px] tw-text-white" />
                            </div>
                        ) :
                        (
                            <div className="tw-flex tw-items-center tw-gap-5">
                                <Link href="/signup" className="tw-font-bold hover:tw-text-indigo-500">
                                    Sign up
                                </Link>
                                <Link className="tw-rounded-md tw-bg-indigo-500 tw-px-[16px] tw-py-[8px] tw-flex tw-items-center tw-gap-3 tw-cursor-pointer hover:tw-brightness-95 tw-font-bold tw-text-white" href="/signin">
                                    Log in
                                </Link>
                            </div>
                        )
                }
            </div>
            {/** Dropdown menu */}
            {
                openDropdown &&
                (
                    <div className="tw-absolute tw-right-[16px] tw-top-[70px] tw-w-[171px] tw-px-[16px] tw-py-[8px] tw-bg-indigo-500 tw-rounded-md tw-shadow-md">
                        <div className="tw-flex tw-w-full tw-bg-white tw-text-black tw-items-center tw-gap-2 tw-rounded-md tw-cursor-pointer hover:tw-brightness-95">
                            <AccountCircle className="tw-w-[30px] tw-h-[30px]" />
                            <p className="tw-font-bold tw-text-xl">Profile</p>
                        </div>
                        <div className="tw-flex tw-w-full tw-bg-red-500 tw-text-black tw-items-center tw-gap-2 tw-rounded-md tw-cursor-pointer hover:tw-brightness-95 tw-mt-3" onClick={handleLogout}>
                            <ExitToApp className="tw-w-[30px] tw-h-[30px]" />
                            <p className="tw-font-bold tw-text-xl">Log out</p>
                        </div>
                    </div>
                )
            }
            {/** */}
        </nav>
    );
}

export default Navbar;