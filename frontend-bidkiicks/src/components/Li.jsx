import { useContext } from "react"
import { Context } from "../App"

function Li({children,pathLink}) {
    const {path} = useContext(Context);
    return (
        <li className={`cursor-pointer hover:text-yellow-500 ${pathLink==path?`text-yellow-500`:`text-black`}`}>
            {children}
        </li>
    )
}

export default Li