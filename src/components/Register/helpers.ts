import { ErrorMap, RegisterInput } from "./types";

export const validateRegisterInput = (param: RegisterInput) => {

    const { name, email, password } = param;
    const errorMap = {} as ErrorMap;
    if (!name) errorMap['fullname'] = 'Please enter fullname'
    if (!email) errorMap['email'] = 'Please enter email'
    if (!password) errorMap['password'] = 'Please enter password'

    if (Object.keys(errorMap).length > 0) return { isSuccess: false, errorMap: errorMap }
    return { isSuccess: true };
}