import HomeLayout from "@/components/HomeLayout";
import { cookies } from "next/headers";
import { getProfileByBearerToken } from "@/controller/user";


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const token = cookies().get('token')?.value;

    const profile = await getProfileByBearerToken(token);

    return (
        <HomeLayout profile={profile}>
            {children}
        </HomeLayout>
    );
}

export default Layout;