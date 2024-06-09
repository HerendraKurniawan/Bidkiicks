import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi"
import { FaEye } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../App";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BsQrCode } from "react-icons/bs";
import { RiPaypalFill } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const { setPath, user } = useContext(Context);
    const [highestBidder, setHighestBidder] = useState({});
    const [bid, setBid] = useState(0);
    const [isHidePlaceBid, setIsHidePlaceBid] = useState(true);
    const [isHideBuyout, setIsHideBuyout] = useState(true);
    const [isHidePaynow, setIsHidePaynow] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/users/${data.highestBidder}`)
                    .then((response) => response.json())
                    .then((dataBidder) => {
                        setHighestBidder(dataBidder);
                    })
            })
        window.scrollTo(0, 0);
    }, [id]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeRemaining]);
    function calculateTimeRemaining() {
        const now = new Date();
        const endTime = new Date(product.auctionEndTime);
        const difference = endTime - now;

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }
    return (
        <>
            <main className="bg-gray-800 px-7 py-8">
                <section>
                    <div className="flex justify-start">
                        <Link to="/" onClick={() => {
                            setPath("/");
                            localStorage.setItem('path', "/")
                        }}>
                            <IoChevronBack size={70} color="white" />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex gap-7">
                            <div className="rounded-xl overflow-hidden w-5/12">
                                <img src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}${product.imageUrl}`} alt={`Image for ${product.name}`} className="w-full aspect-square" />
                            </div>
                            <div className="flex flex-col justify-between w-7/12">
                                <div className="flex flex-col gap-2">
                                    <div className="text-white">
                                        <h1 className="text-3xl mb-2">{product.brand}</h1>
                                        <h2 className="text-2xl mb-1">{product.name}</h2>
                                        <div className="flex gap-4 items-center">
                                            <span className="flex items-center gap-2"><GiTakeMyMoney size={22} color="white" /> <span>{product.bids?.length} Bidders</span></span>
                                            <span className="flex items-center gap-2"><FaEye size={22} color="white" /><span>{product.views} Views</span></span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 bg-white rounded-lg p-3">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <IoTimeSharp />
                                                <span>Ends In {timeRemaining?.days || 0} Day {timeRemaining?.hours || 0} Hour {timeRemaining?.minutes || 0} Min {timeRemaining?.seconds || 0} Sec</span>
                                            </div>
                                            <hr color="orange" className="my-2" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg leading-4">Highest Bid</span>
                                            <span className="text-2xl leading-8">${product?.highestBid} USD</span>
                                            <span className="text-xs leading-4">Offer by {highestBidder?.firstName} {highestBidder?.lastName}</span>
                                        </div>
                                        {
                                            product?.isSold ?
                                                <div className="text-white flex justify-center">
                                                    <button className="bg-gray-400 cursor-default w-full rounded-lg py-1" disabled>Sold Out</button>
                                                </div> :
                                                <>
                                                    {
                                                        timeRemaining.days > 0 || timeRemaining.hours > 0 || timeRemaining.minutes > 0 || timeRemaining.seconds > 0 ?
                                                            <div className="text-white flex justify-between items-center">
                                                                <button className="bg-green-900 hover:bg-green-700 w-80 rounded-lg py-1" onClick={() => {
                                                                    if (!localStorage.getItem('token')) {
                                                                        alert("You must login to buy out!");
                                                                        location.href = "/login";
                                                                    } else {
                                                                        setIsHideBuyout(false);
                                                                    }
                                                                }}>Buy Out for ${product.buyoutPrice} USD</button>
                                                                <button className="bg-black hover:bg-slate-700 w-80 rounded-lg py-1" onClick={() => {
                                                                    if (!localStorage.getItem('token')) {
                                                                        alert("You must login to place bid!");
                                                                        location.href = "/login";
                                                                    } else {
                                                                        setIsHidePlaceBid(false);
                                                                    }
                                                                }}>Place Bid</button>
                                                            </div>
                                                            :
                                                            <>
                                                                {
                                                                    product?.highestBidder == user?._id ?
                                                                        <div className="text-white flex justify-center">
                                                                            <button className="bg-green-700 w-full rounded-lg py-1" onClick={()=>{
                                                                                setIsHidePaynow(false)
                                                                            }}>Pay Now!</button>
                                                                        </div>
                                                                        :
                                                                        <div className="text-white flex justify-center">
                                                                            <button className="bg-gray-400 cursor-default w-full rounded-lg py-1" disabled>Time Out!</button>
                                                                        </div>
                                                                }
                                                            </>
                                                    }
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className=" min-h-48 max-h-52 overflow-y-scroll bg-white rounded-lg p-3">
                                    <h3>Offers</h3>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-y border-y-orange-500">
                                                <td>Price</td>
                                                <td>From</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                product?.bids?.map((bid, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>${bid?.amount} USD</td>
                                                            <td>{bid?.bidder?.firstName}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-7">
                            <div className="p-3 bg-white rounded-xl w-5/12">
                                <h3 className="border-b border-b-orange-400">Product Detail</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-24">
                                        <div className="flex flex-col">
                                            <span>Season</span>
                                            <span>Color</span>
                                            <span>Release Date</span>
                                            <span>Retail Price</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>{product.season}</span>
                                            <span>{product.color}</span>
                                            <span>{product.releaseDate}</span>
                                            <span>${product.retailPrice} USD</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="flex items-center gap-3">
                                            <BsPatchCheckFill />
                                            This item has been verified
                                        </span>
                                        <span>
                                            Condition: {product.condition}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="max-h-52 overflow-y-scroll p-3 bg-white rounded-xl w-7/12">
                                <h3 className="border-b border-b-orange-400">Product Detail</h3>
                                <p>
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section></section>
            </main>
            {
                !isHidePlaceBid &&
                <div className='flex fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80 z-10'>
                    <div className='w-80 flex flex-col gap-4 bg-white h-fit py-6 px-9 rounded-lg m-auto relative'>
                        <div className='flex justify-center items-center w-7 h-7 cursor-pointer absolute top-2 right-2' onClick={() => {
                            setIsHidePlaceBid(true);
                        }}>
                            <IoMdCloseCircleOutline size={24} />
                        </div>
                        <h1 className='text-center text-2xl font-semibold'>Place Bid</h1>
                        <input type="number" min={0} max={10000} className='bg-inherit outline-none border border-black w-full rounded-lg text-center' placeholder='Input your bid' value={bid} onChange={(e) => {
                            setBid(e.target.value);
                        }} />
                        <button className='bg-black text-white rounded-xl font-semibold hover:bg-slate-800' onClick={() => {
                            if (bid <= product?.highestBid) {
                                if(product?.highestBid>=product?.startingPrice) {
                                    alert(`You must place bid higher than $${product?.highestBid} USD`);
                                } else {
                                    alert(`You must place bid higher than $${product?.startingPrice} USD`);
                                }
                            } else if (bid <= product?.startingPrice) {
                                alert(`You must place bid higher than $${product?.startingPrice} USD`);
                            } else {
                                setIsHidePlaceBid(true);
                                const token = localStorage.getItem('token');
                                if (token) {
                                    fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/bids/place`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({ productId: product._id, bidAmount: parseFloat(bid) })
                                    })
                                    alert(`Bid placed successfully`)
                                }
                                setPath("/");
                                localStorage.setItem('path', "/");
                                location.href = "/";
                            }
                        }}>Place Bid</button>
                    </div>
                </div>
            }
            {
                !isHideBuyout &&
                <div className='flex fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80 z-10'>
                    <div className='w-80 flex flex-col gap-4 bg-white h-fit py-6 px-9 rounded-lg m-auto relative'>
                        <div className='flex justify-center items-center w-7 h-7 cursor-pointer absolute top-2 right-2' onClick={() => {
                            setIsHideBuyout(true);
                        }}>
                            <IoMdCloseCircleOutline size={24} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className='text-center text-2xl font-semibold'>Buy Out</h1>
                            <h2 className="text-center text-xl font-semibold">{product?.name} : ${product?.buyoutPrice} USD</h2>
                            <p className="text-center">Your balance is ${user?.balance} USD</p>
                        </div>
                        <button className='bg-black text-white rounded-xl font-semibold hover:bg-slate-800' onClick={() => {
                            if (user?.balance < product?.buyoutPrice) {
                                alert(`You must have balance more or equal than buy out price, please top up your balance first!`);
                            } else {
                                setIsHidePlaceBid(true);
                                const token = localStorage.getItem('token');
                                if (token) {
                                    fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/products/buyout`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({ productId: product._id })
                                    })
                                    alert(`Buy out successfully`);
                                }
                                setPath("/");
                                localStorage.setItem('path', "/");
                                location.href = "/";
                            }
                        }}>Buy Out Now!</button>
                        <div className="flex gap-3 items-center">
                            <div className="border-b border-b-orange-400 w-1/2"></div>
                            <span>OR</span>
                            <div className="border-b border-b-orange-400 w-1/2"></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="w-full flex justify-start gap-2 items-center text-lg font-semibold border border-black box-border p-2 hover:bg-black hover:text-white duration-300"><BsQrCode size={30}/><span>Pay with QRIS</span></button>
                            <button className="w-full flex justify-start gap-2 items-center text-lg font-semibold border border-black box-border p-2 hover:bg-black hover:text-white duration-300"><RiPaypalFill size={30}/><span>Pay with Paypal</span></button>
                            <button className="w-full flex justify-start gap-2 items-center text-lg font-semibold border border-black box-border p-2 hover:bg-black hover:text-white duration-300"><MdOutlinePayments size={30}/><span>Pay with Ovo</span></button>
                            <button className="w-full flex justify-start gap-2 items-center text-lg font-semibold border border-black box-border p-2 hover:bg-black hover:text-white duration-300"><BsBank2 size={30}/><span>Pay with Virtual Bank</span></button>
                        </div>
                    </div>
                </div>
            }
            {
                !isHidePaynow &&
                <div className='flex fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80 z-10'>
                    <div className='w-80 flex flex-col gap-4 bg-white h-fit py-6 px-9 rounded-lg m-auto relative'>
                        <div className='flex justify-center items-center w-7 h-7 cursor-pointer absolute top-2 right-2' onClick={() => {
                            setIsHidePaynow(true);
                        }}>
                            <IoMdCloseCircleOutline size={24} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className='text-center text-2xl font-semibold'>Pay Now!</h1>
                            <h2 className="text-center text-xl font-semibold">{product?.name} : ${product?.highestBid} USD</h2>
                            <p className="text-center">Your balance is ${user?.balance} USD</p>
                        </div>
                        <button className='bg-black text-white rounded-xl font-semibold hover:bg-slate-800' onClick={() => {
                            if (user?.balance < product?.highestBid) {
                                alert(`You must have balance more or equal than $${product?.highestBid} USD, please top up your balance first!`);
                            } else {
                                setIsHidePlaceBid(true);
                                const token = localStorage.getItem('token');
                                if (token) {
                                    fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/products/pay`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({ productId: product._id })
                                    })
                                    alert(`Buy out successfully`);
                                }
                                setPath("/");
                                localStorage.setItem('path', "/");
                                location.href = "/";
                            }
                        }}>Pay Now!</button>
                        <div className="flex gap-3 items-center">
                            <div className="border-b border-b-orange-400 w-1/2"></div>
                            <span>OR</span>
                            <div className="border-b border-b-orange-400 w-1/2"></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="w-full flex justify-start gap-2 items-center text-lg font-semibold border border-black box-border p-2 hover:bg-black hover:text-white duration-300"><BsQrCode size={30}/><span>Pay with QRIS</span></button>
                            <button className="w-full flex justify-start gap-2 items-center text-lg font-semibold border border-black box-border p-2 hover:bg-black hover:text-white duration-300"><RiPaypalFill size={30}/><span>Pay with Paypal</span></button>
                            <button className="w-full flex justify-start gap-2 items-center text-lg font-semibold border border-black box-border p-2 hover:bg-black hover:text-white duration-300"><MdOutlinePayments size={30}/><span>Pay with Ovo</span></button>
                            <button className="w-full flex justify-start gap-2 items-center text-lg font-semibold border border-black box-border p-2 hover:bg-black hover:text-white duration-300"><BsBank2 size={30}/><span>Pay with Virtual Bank</span></button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Product