import ResetPassword from "@/components/ResetPassword";
import { authenticateBearerToken } from "@/controller/auth";
import { redirect } from "next/navigation";

const ResetPasswordPage = async ({ searchParams }: {searchParams: any}) => {
    const token: any = searchParams.token;

    const result = await authenticateBearerToken(token);

    return <ResetPassword authResult={result} />;
}

export default ResetPasswordPage;