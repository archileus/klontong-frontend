import { Spinner } from "@material-tailwind/react";



const Loader = () => {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner color="teal" className="h-12 w-12 " />
        </div>
    )
}

export default Loader;