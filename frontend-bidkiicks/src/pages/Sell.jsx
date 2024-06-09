import { useContext } from "react";
import { useState } from "react"
import { Context } from "../App";

function Sell() {
    const {setPath} = useContext(Context);
    const [auction, setAuction] = useState({});
    const [imageProduct, setImageProduct] = useState(null);
    return (
        <main className="flex pt-20 bg-gray-950">
            <div className="m-auto bg-white rounded-2xl py-12 px-24 w-[800px] text-xl font-semibold flex flex-col gap-7">
                <h1 className="text-2xl text-center">Auction your items now!</h1>
                <form className="flex flex-col gap-4">
                    <input type="text" value={auction?.name || ""} placeholder="Product Name" className="py-3 px-2 w-full border border-black" onChange={(e) => setAuction({ ...auction, name: e.target.value })} />
                    <textarea className="py-3 px-2 w-full border border-black" cols="30" rows="5" placeholder="Product Description" value={auction?.description || ""} onChange={(e) => setAuction({ ...auction, description: e.target.value })}></textarea>
                    <div className="grid grid-cols-2 gap-7">
                        <input type="number" min={0} value={auction?.startingPrice || ""} placeholder="Starting Price" className="py-3 px-2 w-full border border-black" onChange={(e) => setAuction({ ...auction, startingPrice: e.target.value })} />
                        <input type="number" min={0} value={auction?.buyoutPrice || ""} placeholder="Buyout Price" className="py-3 px-2 w-full border border-black" onChange={(e) => setAuction({ ...auction, buyoutPrice: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-7">
                        <input type="text" value={auction?.brand || ""} placeholder="Brand" className="py-3 px-2 w-full border border-black" onChange={(e) => setAuction({ ...auction, brand: e.target.value })} />
                        <input type="text" value={auction?.season || ""} placeholder="Season" className="py-3 px-2 w-full border border-black" onChange={(e) => setAuction({ ...auction, season: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-7">
                        <input type="text" value={auction?.color || ""} placeholder="Color" className="py-3 px-2 w-full border border-black" onChange={(e) => setAuction({ ...auction, color: e.target.value })} />
                        <input type="text" value={auction?.condition || ""} placeholder="Product Condition" className="py-3 px-2 w-full border border-black" onChange={(e) => setAuction({ ...auction, condition: e.target.value })} />
                    </div>
                    <input type="number" min={0} value={auction?.retailPrice || ""} placeholder="Retail Price" className="py-3 px-2 w-full border border-black" onChange={(e) => setAuction({ ...auction, retailPrice: e.target.value })} />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="release-date">Release Date</label>
                        <input id="release-date" type="date" value={auction?.releaseDate || ""} className="py-3 px-2 w-full border border-black" onChange={(e) => setAuction({ ...auction, releaseDate: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="image-product">Upload Product Image</label>
                        <input id="image-product" type="file" accept="image/*" className="py-3 px-2 w-full border border-black" onChange={(e) => setImageProduct(e.target.files[0])} />
                    </div>
                    <button className="w-full py-3 bg-black text-white mt-4 border border-black rounded-xl hover:bg-gray-200 hover:text-black duration-300" onClick={async (e) => {
                        e.preventDefault();
                        if (!localStorage.getItem('token')) {
                            alert("You must login first!");
                        } else if (!auction?.name || !auction?.description || !auction?.startingPrice || !auction?.buyoutPrice || !auction?.brand || !auction?.season || !auction?.color || !auction?.retailPrice || !auction?.releaseDate || !auction?.condition || !imageProduct) {
                            alert("Please fill all column!");
                        } else {
                            const token = localStorage.getItem('token');
                            const formData = new FormData();
                            formData.append('name', auction.name);
                            formData.append('description', auction.description);
                            formData.append('startingPrice', auction.startingPrice);
                            formData.append('buyoutPrice', auction.buyoutPrice);
                            formData.append('brand', auction.brand);
                            formData.append('season', auction.season);
                            formData.append('color', auction.color);
                            formData.append('releaseDate', auction.releaseDate);
                            formData.append('retailPrice', auction.retailPrice);
                            formData.append('condition', auction.condition);
                            formData.append('image', imageProduct);

                            try {
                                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/products/add`, {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: formData
                                });

                                const data = await response.json();

                                if (!response.ok) {
                                    throw new Error(data.message || 'Something went wrong');
                                }
                                alert("Add product auction succesfully!");
                                setAuction({});
                                localStorage.setItem('path',"/");
                                setPath("/")
                                location.href = "/";
                            } catch (error) {
                                alert(error)
                            }
                        }
                    }}>Sell Product</button>
                </form>
            </div>
        </main>
    )
}

export default Sell