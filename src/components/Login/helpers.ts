import { ErrorMap, LoginInput } from "./types";

export const validateLoginInput = (param: LoginInput) => {

    const { email, password } = param;
    const errorMap = {} as ErrorMap;
    if (!email) errorMap['email'] = 'Please enter email'
    if (!password) errorMap['password'] = 'Please enter password'

    if (Object.keys(errorMap).length > 0) return { isSuccess: false, errorMap: errorMap }
    return { isSuccess: true };
}