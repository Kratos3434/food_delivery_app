import Verify from "@/components/Verify";
import { getEmailByOtpToken } from "@/controller/otp";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const VerifyPage = async () => {
    const verifyToken = cookies().get('verifyToken')?.value;

    //redirect to signin if no token is present
    if (!verifyToken) {
        redirect('/signin');
    }

    const email = await getEmailByOtpToken(verifyToken);

    return <Verify email={email} token={verifyToken} />;
}

export default VerifyPage;