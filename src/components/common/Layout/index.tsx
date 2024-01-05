import { ReactNode } from "react";
import Footer from "../Footer";
import HeaderNavbar from "../HeaderNavbar";

type Props = {
    children: ReactNode
}
export default function Layout({ children }: Props) {
    return (
        <>
            <HeaderNavbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}