'use client'
import { useLazyFetch } from "@/hooks/useLazyFetch";
import { ApiResponse } from "@/types";
import { Button, Card, Input } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { ToasterProvider, useToasterContext } from "../common/Toaster/context/ToasterContext";
import { validateLoginInput } from "./helpers";
import { ErrorMap } from "./types";


const Login = () => {
    const { displayToaster } = useToasterContext();

    const [inputErrorMap, setInputErrorMap] = useState({} as ErrorMap);
    const [runFetch] = useLazyFetch<ApiResponse>(`${process.env.API_URL}/login`)

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const param = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        }

        const validationResult = validateLoginInput(param);

        if (!validationResult.isSuccess) {
            setInputErrorMap(validationResult.errorMap || {})
            return;
        }
        setInputErrorMap({});

        const { data, error } = await runFetch(
            {
                method: 'POST',
                body: JSON.stringify(param),

            })
        if (error) displayToaster({ text: error.message, err: true })
        if (data?.code !== 'SUCCESS') displayToaster({ text: data?.message || 'System Error', err: true });

        window.location.assign('/')
    }

    const renderErrorMessage = (keyName: string) => {
        if (!inputErrorMap[keyName]) return null;
        return <div className="text-red-400 text-sm mt-1 pl-1">{inputErrorMap[keyName]}</div>
    }

    return (
        <div className="container px-4">
            <div className='font-bold text-black text-lg mt-8'>Login Page</div>
            <Card placeholder='' className='w-[350px] p-4 mt-8 mx-auto'>
                <form onSubmit={handleLogin}>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <Input crossOrigin="true" label='email' name='email' />
                            {renderErrorMessage('email')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='password' type="password" name='password' />
                            {renderErrorMessage('password')}
                        </div>
                        <Button type="submit" placeholder="" color='green'>
                            Login
                        </Button>
                    </div>
                </form>
            </Card>

        </div>
    )
}


const LoginWithProvider = () => (
    <ToasterProvider>
        <Login />
    </ToasterProvider>
)

export default LoginWithProvider;