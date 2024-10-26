'use client'

import { ProfileProps } from "@/types";
import Navbar from "./Navbar";
import { useHydrateAtoms } from "jotai/utils";
import { userAtom } from "@/store";

const HomeLayout = ({ children, profile }: 
                    { children: React.ReactNode, profile: ProfileProps }
                ) => {

    useHydrateAtoms([[userAtom, profile]]);

    return (
        <main>
            <Navbar />
            {children}
        </main>
    )
}

export default HomeLayout;