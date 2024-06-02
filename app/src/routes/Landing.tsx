import { ReactElement } from "react"
import LoginPanel from "../components/LoginPanel"
import LoginSection from "../components/LoginSection"
import Navbar from "../components/Navbar"

function Landing(): ReactElement {
    return (
        <>
            <Navbar />
            <LoginSection>
                <LoginPanel />
            </LoginSection>
            <h1 className="text-3xl font-bold underline">
                API: {import.meta.env.VITE_API_BASE_URL}
            </h1>
        </>
    )
}

export default Landing
