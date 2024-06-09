import { BsTwitterX } from "react-icons/bs";
import { FaSquareInstagram } from "react-icons/fa6";
import { SiYoutube } from "react-icons/si";
import download from '../assets/download.png'

function Footer() {
    return (
        <footer className="flex justify-between items-center px-7 py-12 bg-gray-950 text-white text-xl font-semibold">
            <div className="flex justify-center items-center gap-9">
                <div className="flex flex-col gap-3">
                    <span>Kickstart Your Bids, Score Big.</span>
                    <div className="grid grid-cols-3 gap-7">
                        <div>
                            <h3>About</h3>
                            <ul className="text-sm">
                                <li>How It Works</li>
                                <li>Reviews</li>
                                <li>Verification</li>
                                <li>Newsroom</li>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Help</h3>
                            <ul className="text-sm">
                                <li>Help Center</li>
                                <li>Contacts</li>
                                <li>Product Suggestions</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Sell</h3>
                            <ul className="text-sm">
                                <li>Selling Guide</li>
                                <li>Scout</li>
                                <li>Professional Tools</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button className="text-sm py-3 px-7 border hover:bg-white hover:text-black hover:duration-300">Indonesia | English | $USD</button>
                </div>
            </div>
            <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-8">
                    <BsTwitterX size={32}/>
                    <FaSquareInstagram size={32}/>
                    <SiYoutube size={32}/>
                </div>
                <div className="flex justify-center items-center w-28">
                    <img src={download} alt="Logo App Store & Google Play" className="w-full"/>
                </div>
            </div>
        </footer>
    )
}

export default Footer