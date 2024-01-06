import { Alert } from "@material-tailwind/react";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";


interface ToasterData {
    show?: boolean
    text: string
    auto?: boolean
    duration?: number
    err?: boolean
}
const initialState = {
    show: false,
    text: "",
    auto: true,
    err: false,
    duration: 3000,
}
const ComponentContext = createContext({ displayToaster: (props: ToasterData) => { } })

const useComponentContext = () => useContext(ComponentContext);

const ComponentProvider = ({ children }: { children: ReactNode }) => {
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [toasterData, setToasterData] = useState(initialState);
    const { show, text, auto, duration, err } = toasterData;
    useEffect(() => {
        if (show && auto) {
            clearTimeout(timerId.current as NodeJS.Timeout);
            timerId.current = setTimeout(() => {
                handleCloseToaster();
            }, duration);
        }
        return () => {
            clearTimeout(timerId.current as NodeJS.Timeout);
        }
    }, [show, auto])

    const displayToaster = (props: ToasterData) => {
        const { show = true, err = false, ...rest } = props;

        setToasterData({ ...toasterData, ...rest, show, err });
    }

    const handleCloseToaster = () => {
        setToasterData({ ...toasterData, show: false });
    }

    return (
        <ComponentContext.Provider value={{ displayToaster }}>
            {children}
            <div className="fixed w-auto bottom-4 -translate-x-1/2 left-1/2">
                <Alert
                    color={`${err ? 'red' : 'green'}`}
                    open={show}
                    onClose={handleCloseToaster}
                    animate={{
                        mount: { y: 0 },
                        unmount: { y: 100 }
                    }}
                >
                    <pre>
                        {text}
                    </pre>
                </Alert>
            </div>
        </ComponentContext.Provider>
    )
}
export {
    ComponentContext as ToasterContext,
    ComponentProvider as ToasterProvider,
    useComponentContext as useToasterContext
};
