import { createContext } from "react";
import { useState } from "react"
import { Outlet } from "react-router-dom"

export const UserContext = createContext({})

function Signup() {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Outlet />
        </UserContext.Provider>
    )
}

export default Signup