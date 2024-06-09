import { useState } from "react"
import logo from "../assets/logo.jpeg"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const navigate = useNavigate();
    const [isHide, setIsHide] = useState(true);

    const [userLogin, setuserLogin] = useState({});

    return (
        <>
            <header className="bg-white flex justify-center py-7">
                <img src={logo} alt="Logo Aplikasi BidKiicks" className="w-24 rounded-full" />
            </header>
            <main className="bg-gray-950 flex justify-center py-28">
                <section className="flex flex-col gap-8 bg-white rounded-lg px-7 py-9 w-[700px]">
                    <div className="flex justify-between gap-4 text-xl font-semibold">
                        <button className="text-gray-400 w-1/2 py-4 border-b border-b-orange-400" onClick={()=>{
                            location.href="/register";
                        }}>Sign up</button>
                        <button className="w-1/2 py-4 border-b border-b-orange-400 cursor-default">Login</button>
                    </div>
                    <div>
                        <form action="" className="flex flex-col gap-8">
                            <div>
                                <div className="flex flex-col gap-8">
                                    <div className="px-2 py-3 border border-black">
                                        <input type="text" name="email" placeholder="Email Address" required className="outline-none w-full" value={userLogin?.email||""} onChange={(e)=>{
                                            const newUserLogin = {
                                                ...userLogin,
                                                email:e.target.value
                                            }
                                            setuserLogin(newUserLogin);
                                        }}/>
                                    </div>
                                    <div className="flex">
                                        <div className="flex w-full items-center px-2 py-3 border border-black border-r-0">
                                            <input type={isHide ? "password" : "text"} placeholder="Password" required className="outline-none w-full" value={userLogin?.password||""} onChange={(e)=>{
                                            const newUserLogin = {
                                                ...userLogin,
                                                password:e.target.value
                                            }
                                            setuserLogin(newUserLogin);
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
                            <button className="w-full bg-black text-white font-bold py-3 hover:bg-gray-200 hover:text-black duration-300 border-2 border-black box-border" onClick={async(e)=>{
                                e.preventDefault();
                                try {
                                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/auth/login`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(userLogin)
                                    });

                                    if (!response.ok) {
                                        throw new Error('Login failed');
                                    }

                                    const data = await response.json();
                                    console.log('Login successful, token:', data.token);

                                    // Simpan token di local storage atau state management
                                    localStorage.setItem('token', data.token);

                                    alert("Login Success!");
                                    navigate(localStorage.getItem('path'));
                                } catch (error) {
                                    alert("Email or Password invalid!");
                                    console.error('Error:', error);
                                }
                            }}>Login</button>
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
                                <FaGoogle size={40}/>
                                <span>Continue With Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 w-full py-2 border border-black hover:bg-black hover:text-white duration-300">
                                <FaFacebook size={40}/>
                                <span>Continue With Facebook</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 w-full py-2 border border-black hover:bg-black hover:text-white duration-300">
                                <BsApple size={40}/>
                                <span>Continue With AppleID</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 w-full py-2 border border-black hover:bg-black hover:text-white duration-300">
                                <FaXTwitter size={40}/>
                                <span>Continue With X</span>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login