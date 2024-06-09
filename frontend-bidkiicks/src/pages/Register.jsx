import { useState } from "react"
import logo from "../assets/logo.jpeg"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./Signup";
import { useNavigate } from "react-router-dom";

function Register() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [isHide, setIsHide] = useState(true);
    return (
        <>
            <header className="bg-white flex justify-center py-7">
                <img src={logo} alt="Logo Aplikasi BidKiicks" className="w-24 rounded-full" />
            </header>
            <main className="bg-gray-950 flex justify-center py-28">
                <section className="flex flex-col gap-8 bg-white rounded-lg px-7 py-9 w-[700px]">
                    <div className="flex justify-between gap-4 text-xl font-semibold">
                        <button className="w-1/2 py-4 border-b border-b-orange-400 cursor-default">Sign Up</button>
                        <button className="text-gray-400 w-1/2 py-4 border-b border-b-orange-400" onClick={()=>{
                            location.href="/login";
                        }}>Login</button>
                    </div>
                    <div>
                        <form className="flex flex-col gap-8">
                            <div>
                                <div className="flex flex-col gap-8">
                                    <div className="px-2 py-3 border border-black">
                                        <input name="firstName" type="text" placeholder="First Name" required value={user?.firstName||""} className="outline-none w-full" onChange={(e)=>{
                                            const newUser = {
                                                ...user,
                                                firstName:e.target.value
                                            }
                                            setUser(newUser);
                                        }}/>
                                    </div>
                                    <div className="px-2 py-3 border border-black">
                                        <input name="lastName" type="text" placeholder="Last Name" required value={user?.lastName||""} className="outline-none w-full"onChange={(e)=>{
                                            const newUser = {
                                                ...user,
                                                lastName:e.target.value
                                            }
                                            setUser(newUser);
                                        }} />
                                    </div>
                                    <div className="px-2 py-3 border border-black">
                                        <input name="email" type="text" placeholder="Email Address" required value={user?.email||""} className="outline-none w-full" onChange={(e)=>{
                                            const newUser = {
                                                ...user,
                                                email:e.target.value
                                            }
                                            setUser(newUser);
                                        }}/>
                                    </div>
                                    <div className="flex">
                                        <div className="flex w-full items-center px-2 py-3 border border-black border-r-0">
                                            <input name="password" type={isHide ? "password" : "text"} placeholder="Password" required value={user?.password||""} className="outline-none w-full" onChange={(e)=>{
                                            const newUser = {
                                                ...user,
                                                password:e.target.value
                                            }
                                            setUser(newUser);
                                        }}/>
                                        </div>
                                        <button type="button" onClick={() => {
                                            setIsHide(!isHide);
                                        }} className="flex justify-center items-center py-3 px-4 aspect-square border border-black border-l-0">
                                            {
                                                isHide ? <FaEye /> : <FaEyeSlash />
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-end font-semibold">
                                    <span>Forgot Password?</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="w-full bg-black text-white font-bold py-3 hover:bg-gray-200 hover:text-black duration-300 border-2 border-black box-border" onClick={(e)=>{
                                    e.preventDefault()
                                    if((!user.email || !user.firstName || !user.lastName || !user.password)||(user.email=="" || user.firstName=="" || user.lastName=="" || user.password=="")) {
                                        alert("You must fill all field!")
                                    } else {
                                        navigate("/register/payment-info");
                                    }
                                }}>Next</button>
                                <p className="text-sm">
                                    By signing up, you agree you've read and accepted our <br />
                                    <b>Terms and Conditions.</b> Please see our <b>Privacy Policy</b> for information <br />
                                    on how we process your data
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col gap-5 text-xl font-bold">
                        <div className="flex items-center gap-3">
                            <div className="border-b border-b-orange-400 w-1/2"></div>
                            <span className="text-slate-500">OR</span>
                            <div className="border-b border-b-orange-400 w-1/2"></div>
                        </div>
                        <div className="flex flex-col gap-7">
                            <button className="flex items-center justify-center gap-3 w-full py-2 border border-black hover:bg-black hover:text-white duration-300">
                                <FaGoogle size={40} />
                                <span>Continue With Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 w-full py-2 border border-black hover:bg-black hover:text-white duration-300">
                                <FaFacebook size={40} />
                                <span>Continue With Facebook</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 w-full py-2 border border-black hover:bg-black hover:text-white duration-300">
                                <BsApple size={40} />
                                <span>Continue With AppleID</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 w-full py-2 border border-black hover:bg-black hover:text-white duration-300">
                                <FaXTwitter size={40} />
                                <span>Continue With X</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-center text-xl mb-7">
                        <span>Already have an account?</span>
                        <Link to="/login" className="underline font-bold">
                            Log In
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Register