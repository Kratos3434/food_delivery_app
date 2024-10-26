
const ResetPasswordPage = ({ searchParams }: {searchParams: any}) => {
    const token: any = searchParams.token;

    return <p>{token}</p>
}

export default ResetPasswordPage;