import logo from '../assets/logo.jpeg';
import { IoSearch } from "react-icons/io5";
import { BsFillEnvelopeFill } from "react-icons/bs";
import Li from './Li';
import { useContext } from 'react';
import { Context } from '../App';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import profile from '../assets/profile.jpeg';
import { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";

function Header() {
    const { product, setProducts, setPath, user, setUser } = useContext(Context);
    const [isHide, setIsHide] = useState(true);
    const [isHideTopup, setIsHideTopup] = useState(true);
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/users/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data?.message=="Unauthorized") {
                        alert("Your session has expired, please login again!");
                        localStorage.removeItem('token');
                    } else {
                        setUser(data);
                    }
                })
        }
    }, []);
    const handleChange = event => {
        const { value } = event.target;
        fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/products/search?query=${value}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
    }
    return (
        <>
            <header className='w-full flex justify-between py-4 px-7 bg-white sticky top-0 z-10'>
                <div className='flex justify-center items-center gap-8'>
                    <div className='w-16 rounded-full overflow-hidden'>
                        <img src={logo} alt="Logo BidKiicks" className='w-full' />
                    </div>
                    <div className='flex justify-center items-center border p-2 gap-2 bg-yellow-50'>
                        <IoSearch size={28} />
                        <input type="text" placeholder='Search for brand, item, etc' className='w-[480px] bg-inherit outline-none' onChange={handleChange} />
                    </div>
                </div>
                <div className='flex justify-center items-center font-semibold text-xl gap-8'>
                    <nav className='flex justify-center items-center'>
                        <ul className='flex justify-center items-center gap-6'>
                            <Li pathLink="/">
                                <Link to="/" onClick={() => {
                                    setPath("/");
                                    localStorage.setItem("path", "/");
                                }}>Home</Link>
                            </Li>
                            <Li pathLink="/about">
                                <Link to="/about" onClick={() => {
                                    setPath("/about");
                                    localStorage.setItem("path", "/about");
                                }}>About</Link>
                            </Li>
                            <Li pathLink="/help">
                                <Link to="/help" onClick={() => {
                                    setPath("/help");
                                    localStorage.setItem("path", "/help");
                                }}>Help</Link>
                            </Li>
                            <Li pathLink="/sell">
                                <Link to="/sell" onClick={() => {
                                    setPath("/sell");
                                    localStorage.setItem("path", "/sell");
                                }}>Sell</Link>
                            </Li>
                            <li className='flex justify-center items-center cursor-pointer hover:text-yellow-500'>
                                <BsFillEnvelopeFill size={24} />
                            </li>
                        </ul>
                    </nav>
                    {
                        localStorage.getItem("token") ?
                            <>
                                <div className='flex flex-col items-center cursor-pointer' onClick={() => {
                                    setIsHide(!isHide);
                                }}>
                                    <div className='flex justify-center items-center w-12 rounded-full overflow-hidden'>
                                        <img src={profile} alt="Profile" />
                                    </div>
                                    <h1 className='text-sm'>{user?.firstName}  {user?.lastName}</h1>
                                </div>
                                {
                                    isHide ? <></> :
                                        <div className='w-80 bg-black bg-opacity-80 rounded-3xl py-5 px-5 text-white absolute top-14 right-20 flex flex-col gap-10'>
                                            <div className='flex flex-col gap-2 items-center'>
                                                <div className='flex justify-center items-center w-12 rounded-full overflow-hidden'>
                                                    <img src={profile} alt="Profile" />
                                                </div>
                                                <h1 className='text-sm'>{user?.firstName} {user?.lastName}</h1>
                                                <span>Balance : ${user?.balance} USD</span>
                                            </div>
                                            <div className='grid grid-cols-2 gap-3'>
                                                <button className='bg-green-500 text-black w-full py-1 rounded-2xl hover:bg-green-600' onClick={() => {
                                                    setIsHide(true);
                                                    setIsHideTopup(false);
                                                }}>Top Up</button>
                                                <button className='bg-white text-black w-full py-1 rounded-2xl hover:bg-slate-200' onClick={() => {
                                                    if (confirm("Do you want to logout?")) {
                                                        setIsHide(true);
                                                        localStorage.removeItem('token');
                                                        setPath("/");
                                                        localStorage.setItem('path', "/");
                                                        location.href = "/";
                                                    }
                                                }}>Logout</button>
                                            </div>
                                        </div>
                                }
                            </>
                            :
                            <div className='flex justify-center items-center gap-7'>
                                <button className='px-7 py-2 border hover:bg-slate-100' onClick={() => {
                                    location.href = "/login"
                                }}>Login</button>
                                <button className='px-7 py-2 border bg-black text-white hover:bg-slate-700' onClick={() => {
                                    location.href = "/register"
                                }}>Sign Up</button>
                            </div>
                    }
                </div>
            </header>
            {
                !isHideTopup &&
                <div className='flex fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80 z-10'>
                    <div className='w-80 flex flex-col gap-4 bg-white h-fit py-6 px-9 rounded-lg m-auto relative'>
                        <div className='flex justify-center items-center w-7 h-7 cursor-pointer absolute top-2 right-2' onClick={() => {
                            setIsHideTopup(true);
                        }}>
                            <IoMdCloseCircleOutline size={24} />
                        </div>
                        <h1 className='text-center text-2xl font-semibold'>Top Up Balance</h1>
                        <input type="number" min={0} max={10000} className='bg-inherit outline-none border border-black w-full rounded-lg text-center' placeholder='Input balance' value={balance} onChange={(e) => {
                            setBalance(e.target.value);
                        }} />
                        <button className='bg-black text-white rounded-xl font-semibold hover:bg-slate-800' onClick={() => {
                            if (balance <= 0) {
                                alert("Top Up balance min $1!");
                            } else {
                                setIsHideTopup(true);
                                const token = localStorage.getItem('token');
                                if (token) {
                                    fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/users/topup`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({ amount: parseFloat(balance) })
                                    })
                                    alert("Balance topped up successfully");
                                }
                                setPath("/");
                                localStorage.setItem('path', "/");
                                location.href = "/";
                            }
                        }}>Top Up</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Header
