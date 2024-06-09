import { BsPatchCheckFill } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { TbLockSquareRoundedFilled } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useEffect } from "react";

function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <main className="bg-gray-950 py-8 text-white">
            <section className="flex flex-col gap-36 py-12 px-14 pb-20">
                <div className="flex flex-col gap-8">
                    <div className="text-5xl">
                        <h2>Acessbility</h2>
                        <h2>Fairness</h2>
                        <h2>Safety</h2>
                    </div>
                    <p className="w-1/2">
                        Our mission is to give people from different economic backgrounds a chance to buy the things that they have been craving in the safest way possible. Buy and sell items range from vintage clothes or shoes to antique watches.
                    </p>
                </div>
                <div className="flex justify-center gap-10">
                    <div className="flex justify-between px-5 py-3 w-64 bg-white text-black font-semibold">
                        <span>Verification</span>
                        <span>XXXXX</span>
                    </div>
                    <div className="flex justify-between px-5 py-3 w-64 bg-white text-black font-semibold">
                        <span>Buyers</span>
                        <span>XXXXX</span>
                    </div>
                    <div className="flex justify-between px-5 py-3 w-64 bg-white text-black font-semibold">
                        <span>Sellers</span>
                        <span>XXXXX</span>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-7 pb-24">
                <h1 className="text-center text-4xl font-semibold">FAQs</h1>
                <div className="grid grid-cols-4 gap-7 px-12">
                    <div className="flex flex-col gap-5 p-7 font-semibold hover:text-black hover:bg-white hover:duration-300 text-sm border border-white pb-32">
                        <h3 className="text-lg">How does BidKiicks Work?</h3>
                        <p>
                            How does BidKiicks Work? <br />
                            Bidkicks is a marketplace where buyers and sellers can make anonymous offers on a wide variety of shoes, streetwear, electronics, and collectibles. As a live marketplace, Bidkicks empowers buyers to bid and buy at real-time prices that reflect the current demand. This can be done in three easy steps:<br /><br />
                            1. Bid or Buy <br />
                            2. We Verify <br />
                            3. We Ship to You
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 p-7 font-semibold hover:text-black hover:bg-white hover:duration-300 text-sm border border-white pb-32">
                        <h3 className="text-lg">How does BidKiicks Verify?</h3>
                        <p>
                            We have partnered with multiple people, groups, and organizations with the proper skill set to check the authenticity of different types of products that can be auctioned off of our website. The services for this authentification is optional and can be chosen right before users finalize their deal on an item. <br />
                            This verification process is one of our safety net to make sure that
                            the item that users buy from our website is safe, authentic, and in good condition.
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 p-7 font-semibold hover:text-black hover:bg-white hover:duration-300 text-sm border border-white pb-32">
                        <h3 className="text-lg">How do i pay for the item?</h3>
                        <p>
                            If your bid comes out on top until the end of the auction of an item you then will receive a message and an email on how to pay it, this will happen if you haven't connect any payment method, and if you have connect a payment method, you will be redirected to a payment page where you will verify your payment base on the bank or payment type you use.
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 p-7 font-semibold hover:text-black hover:bg-white hover:duration-300 text-sm border border-white pb-32">
                        <h3 className="text-lg">How do i cancel?</h3>
                        <p>
                            Once an auction has ended and your bid come out on top, it cannot be canceled. This is one of our policy and safety net to prevent bid and run, and to maintain the integrity and the safety of our services, as we need to ensure every bid is real, active, and dependable
                        </p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-7 pb-40 text-black bg-white px-7 py-12">
                <h1 className="text-6xl font-semibold text-center">Score Big</h1>
                <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-5 px-20 text-2xl">
                        <h1 className="text-3xl font-semibold text-center">Buying on BidKiicks</h1>
                        <p>
                            We don't determine the price of an item you do. As a online auction website, we empower you to bid and buy an item live and based on demand
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 px-20 text-2xl">
                        <h1 className="text-3xl font-semibold text-center">Selling on BidKiicks</h1>
                        <p>
                            Whether you're selling personal collection or in need of cash by selling high value item, we are here to make your selling experience safe and easy.
                        </p>
                    </div>
                </div>
            </section>
            <section className="text-white flex flex-col gap-9 px-20 py-12 pb-40 text-xs">
                <div className="grid grid-cols-3 gap-56">
                    <div className="flex flex-col items-center gap-7">
                        <BsPatchCheckFill size={50} color="white" />
                        <p>
                            Every item that users choose to be checked by us will be guarenteed it's authenticity and it's quality by our partners.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-7">
                        <FaUserShield size={50} color="white" />
                        <p>
                            Trust is key. We have a system that ensures that the people that put up an auction on our platform is trusted, by having a verification system ensures that the seller is trusted, and it is based on their history of the authenticated item that had been sold here
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-7">
                        <TiWorld size={50} color="white" />
                        <p>
                            Wherever you are, whenever you are, you will always be able to bid an item of your choosing. Our customer from over 190 countries allows you to find the item you have been craving.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-56 px-40">
                    <div className="flex flex-col items-center gap-7">
                        <TbLockSquareRoundedFilled size={50} color="white" />
                        <p>
                            Maintaining our integrity of our service is our priority. We use security and fraud systems, that will prevent and information leak, or fraudulent activities.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-7">
                        <RiCustomerService2Fill size={50} color="white" />
                        <p>
                            Our help center is available for you to
                            access 24/7, thanks to our dedicated staff,
                            we will answer any question regarding our service.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default About