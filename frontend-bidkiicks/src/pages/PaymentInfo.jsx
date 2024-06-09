import { useContext } from "react";
import { UserContext } from "./Signup";
import { useEffect } from "react";
import logo from "../assets/logo.jpeg"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function PaymentInfo() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        if (!user.email || !user.firstName || !user.lastName || !user.password) {
            navigate("/register");
        }
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <header className="bg-white flex justify-center py-7">
                <img src={logo} alt="Logo Aplikasi BidKiicks" className="w-24 rounded-full" />
            </header>
            <main className="bg-gray-950 flex justify-center py-28">
                <section className="flex flex-col gap-8 bg-white rounded-lg px-7 py-9 w-[700px] text-xl font-semibold">
                    <div className="flex items-center gap-5 py-4 border-b border-b-orange-400">
                        <IoIosArrowBack className="cursor-pointer" onClick={() => {
                            navigate("/register");
                        }} />
                        <span className="text-2xl">Payment Info</span>
                    </div>
                    <div className="flex flex-col gap-32">
                        <div className="flex flex-col gap-9">
                            <div className="flex flex-col gap-8">
                                <div className="flex gap-12">
                                    <div className="px-2 py-3 border border-black w-1/2">
                                        <input type="text" className="outline-none w-full" placeholder="First Name" name="firstName" value={user?.firstName || ""} disabled />
                                    </div>
                                    <div className="px-2 py-3 border border-black w-1/2">
                                        <input type="text" className="outline-none w-full" placeholder="Last Name" name="lastName" value={user?.lastName || ""} disabled />
                                    </div>
                                </div>
                                <div>
                                    <div className="px-2 py-3 border border-black">
                                        <input type="text" required className="outline-none w-full" placeholder="Card Number" name="cardNumber" value={user?.paymentInfo?.cardNumber || ""} onChange={(e) => {
                                            const newUser = {
                                                ...user,
                                                paymentInfo: {
                                                    ...user?.paymentInfo,
                                                    cardNumber: e.target.value
                                                }
                                            }
                                            setUser(newUser);
                                        }} />
                                    </div>
                                </div>
                                <div className="flex gap-12">
                                    <div className="px-2 py-3 border border-black w-1/2">
                                        <input type="text" required className="outline-none w-full" placeholder="Expiration Date" name="expirationDate" value={user?.paymentInfo?.expirationDate || ""} onChange={(e) => {
                                            const newUser = {
                                                ...user,
                                                paymentInfo: {
                                                    ...user?.paymentInfo,
                                                    expirationDate: e.target.value
                                                }
                                            }
                                            setUser(newUser);
                                        }} />
                                    </div>
                                    <div className="px-2 py-3 border border-black w-1/2">
                                        <input type="text" required className="outline-none w-full" placeholder="CVV" name="CVV" value={user?.paymentInfo?.CVV || ""} onChange={(e) => {
                                            const newUser = {
                                                ...user,
                                                paymentInfo: {
                                                    ...user?.paymentInfo,
                                                    CVV: e.target.value
                                                }
                                            }
                                            setUser(newUser);
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 px-3 py-3 bg-yellow-50 border rounded-2xl border-black pb-20">
                                <h2 className="text-2xl font-semibold">Billing Address</h2>
                                <div className="flex flex-col gap-8">
                                    <div>
                                        <div className="flex gap-16">
                                            <div className="px-2 py-3 border border-black bg-white w-1/2">
                                                <input type="text" className="outline-none w-full" placeholder="Email" name="email" value={user?.email || ""} disabled />
                                            </div>
                                            <div className="px-2 py-3 border border-black bg-white w-1/2">
                                                <input type="text" required className="outline-none w-full" placeholder="Phone Number" name="phoneNumber" value={user?.billingAddress?.phoneNumber || ""} onChange={(e) => {
                                                    const newUser = {
                                                        ...user,
                                                        billingAddress: {
                                                            ...user?.billingAddress,
                                                            phoneNumber: e.target.value
                                                        }
                                                    }
                                                    setUser(newUser);
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-16">
                                        <div className="px-2 py-3 border border-black bg-white w-1/2">
                                            <input type="text" required className="outline-none w-full" placeholder="Country" name="country" value={user?.billingAddress?.country || ""} onChange={(e) => {
                                                const newUser = {
                                                    ...user,
                                                    billingAddress: {
                                                        ...user?.billingAddress,
                                                        country: e.target.value
                                                    }
                                                }
                                                setUser(newUser);
                                            }} />
                                        </div>
                                        <div className="px-2 py-3 border border-black bg-white w-1/2">
                                            <input type="text" required className="outline-none w-full" placeholder="State" name="state" value={user?.billingAddress?.state || ""} onChange={(e) => {
                                                const newUser = {
                                                    ...user,
                                                    billingAddress: {
                                                        ...user?.billingAddress,
                                                        state: e.target.value
                                                    }
                                                }
                                                setUser(newUser);
                                            }} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-16">
                                        <div className="px-2 py-3 border border-black bg-white w-full">
                                            <input type="text" required className="outline-none w-full" placeholder="Postal Code" name="postalCode" value={user?.billingAddress?.postalCode || ""} onChange={(e) => {
                                                const newUser = {
                                                    ...user,
                                                    billingAddress: {
                                                        ...user?.billingAddress,
                                                        postalCode: e.target.value
                                                    }
                                                }
                                                setUser(newUser);
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="w-1/2 bg-black text-white font-bold py-3 hover:bg-gray-200 hover:text-black duration-300 border-2 border-black box-border" onClick={async (e) => {
                                e.preventDefault();
                                try {
                                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/auth/signup`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(user)
                                    });

                                    if (!response.ok) {
                                        throw new Error('Sign Up failed');
                                    }

                                    const data = await response.json();
                                    console.log('Sign Up successful, token:', data.token);

                                    // Simpan token di local storage atau state management
                                    localStorage.setItem('token', data.token);

                                    alert("Sign Up Success!");
                                    navigate(localStorage.getItem('path'));
                                } catch (error) {
                                    console.error('Error:', error);
                                }
                            }}>Sign Up</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PaymentInfo