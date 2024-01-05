'use client'
import { useLazyFetch } from "@/hooks/useLazyFetch";
import { ApiResponse } from "@/types";
import { Button, Card, Input } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToasterProvider, useToasterContext } from "../common/Toaster/context/ToasterContext";
import { validateRegisterInput } from "./helpers";
import { ErrorMap } from "./types";


const Register = () => {
    const { push } = useRouter();
    const { displayToaster } = useToasterContext();
    const [inputErrorMap, setInputErrorMap] = useState({} as ErrorMap);
    const [runFetch] = useLazyFetch<ApiResponse>(`${process.env.API_URL}/register`)

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const param = {
            name: e.currentTarget.fullname.value,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        }
        const validationResult = validateRegisterInput(param);

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
        if (error) {
            displayToaster({ text: error.message, err: true })
            return;
        }
        if (data?.code !== 'SUCCESS') {
            displayToaster({ text: data?.message || 'System Error', err: true })
            return
        }

        displayToaster({ text: 'Register Success' })
        setTimeout(() => {
            push('/login')
        }, 3000)


    }

    const renderErrorMessage = (keyName: string) => {
        if (!inputErrorMap[keyName]) return null;
        return <div className="text-red-400 text-sm mt-1 pl-1">{inputErrorMap[keyName]}</div>
    }


    return (
        <div className="container px-4">
            <div className='font-bold text-black text-lg mt-8'>Register Page</div>
            <Card placeholder='' className='w-[350px] p-4 mt-8 mx-auto'>
                <form onSubmit={handleRegister}>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <Input crossOrigin="true" label='fullname' name='fullname' />
                            {renderErrorMessage('fullname')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='email' type='email' name='email' />
                            {renderErrorMessage('email')}
                        </div>
                        <div>
                            <Input crossOrigin="true" label='password' type="password" name='password' />
                            {renderErrorMessage('password')}
                        </div>
                        <Button type='submit' placeholder="" color='green' >
                            Register
                        </Button>
                    </div>
                </form >
            </Card >

        </div >
    )
}


const RegisterWithProvider = () => (
    <ToasterProvider>
        <Register />
    </ToasterProvider>
)

export default RegisterWithProvider;