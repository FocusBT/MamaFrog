"use client";
import PresaleToken from "@/components/PresaleToken";
import Marquee from "@/components/ui/marquee";
import Link from "next/link";
import Image from "next/image";

const news = [
    "nigga",
    "|",
    "nigga",
    "|",
    "nigga",
    "|",
    "nigga",
    "|",
]
export default function Home() {
    return (
        <div className={"min-h-screen flex w-full bg-nigga flex-col overflow-x-hidden"}>
            <header className={"flex w-full h-fit py-8 items-center justify-center"}>
                <nav className={"flex flex-row items-center justify-center gap-10 font-weird"}>
                    <div className={"flex items-center justify-center text-center"}>
                        <Link href={"/"}>
                            <Image src={"/Logo3.png"} alt={"logo"} width={200} height={47}/>
                        </Link>
                    </div>
                    <div
                        className={"rounded-[20px] border-[2px] hidden md:flex flex-row bg-white text-3xl px-8 py-3 items-center justify-center gap-8 text-black"}>
                        <a>ABOUT</a>
                        <a>ROADMAP</a>
                        <a>TELEGRAM</a>
                    </div>
                    <div className={"bg-[#00BAFF] rounded-[20px] text-3xl border-[2px] border-white px-8 py-3"}>
                        <a>PRESALE</a>
                    </div>
                </nav>
            </header>
            <div className={"flex flex-row w-full h-[40px] items-center bg-red-500 border-y-[2px] px-3"}>
                <div className={"font-bold"}>BREAKING:</div>

                <div
                    className={"relative w-full flex h-[40px] flex-col items-center justify-center overflow-hidden font-bold"}>
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {news.map((data, idx) => (
                            <h1 key={idx} className={"ml-3"}>{data}</h1>
                        ))}
                    </Marquee>
                    <div
                        className="border-y-[2px] pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r  from-red-500"></div>
                    <div
                        className="border-y-[2px] pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-red-500"></div>
                </div>
            </div>
            <div className={"flex flex-col min-h-[calc(100vh-9.8rem)] h-full w-full pb-10 "}>
                <div
                    className={"py-10 md:p-0 relative flex flex-col lg:flex-row h-full w-full flex-grow  items-center justify-center gap-10"}>
                    <Image src={"/bg.jpeg"} alt={"bg"} fill className={"object-cover"}/>

                    <div className={"flex flex-col gap-6 items-center justify-center z-10"}>
                        <Image src={"/Ilustration.png"} alt={"ill"} width={484} height={389}
                               className={"object-cover"}/>
                        <div className={"flex flex-row gap-10 font-weird text-3xl"}>
                            <div className={"bg-[#00BAFF] rounded-[20px] border-[2px] border-white px-8 py-3 hover:bg-white hover:border-[#00BAFF] hover:text-[#00BAFF] transition"}>
                                <a>TELEGRAM</a>
                            </div>
                            <div className={"bg-[#F84C51] rounded-[20px] border-[2px] border-white px-8 py-3 hover:bg-white hover:border-[#F84C51] hover:text-[#F84C51] transition"}>
                                <a>JOIN NOW</a>
                            </div>
                        </div>
                    </div>
                    <div className={"h-fit p-10 bg-nigga/70 backdrop-blur rounded-[20px]"}>
                        <PresaleToken/>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col h-full items-center justify-center pt-10"}>
                <div className={"flex flex-col gap-5 md:px-10 p-0 "}>
                    <p className={"text-wrap max-w-[450px] text-center text-[20px]"}>More than just a token, MAMAFROG
                        symbolizes rebirth, redemption, and community-driven strength that's simply unstoppable!</p>
                    <p className={"text-wrap max-w-[450px] text-center text-[20px]"}>With the power of our team and our
                        community, we will convert all memecoin followers to our children.</p>
                </div>
                <div className={"relative min-h-[398px] w-full flex items-center justify-center"}>
                    <Image src={"/il.png"} alt={"il"} className={"bottom-0 object-cover w-full z-2 absolute"} height={398} width={1340} />
                    <Image src={"/il2.png"} alt={"il2"} className={"bottom-0 object-cover w-full z-1 absolute"} height={398} width={1340}/>
                    <div className={"flex flex-col font-weird items-center justify-center gap-10"}>
                        <h1 className={"text-5xl "}>JOIN NOW & GET RICH</h1>
                        <div className={"bg-[#F84C51] text-3xl rounded-[20px] border-[2px] border-white px-8 py-3 hover:bg-white hover:border-[#F84C51] hover:text-[#F84C51] transition"}>
                            <a>JOIN NOW</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"h-20 bg-[#80CC21] border-white border-y-[4px] font-bold text-5xl flex flex-row w-full overflow-hidden items-center justify-center"}>
                <Marquee repeat={10} className="[--duration:2s]">
                    <h2 className={"font-weird"}>MAMAFROG</h2>
                </Marquee>
            </div>
            <div className={"my-10 flex flex-col items-center justify-center"}>
                <div className={"relative w-full min-h-[calc(100vh-10rem)] flex-col flex items-center justify-center"}>
                    <Image src={"/bg2.png"} alt={"bg2"} width={1194} height={838} className={"h-full rounded-lg object-cover absolute"}/>
                    <div className={"flex flex-col items-center flex-grow w-full justify-between py-20 z-10 font-weird"}>
                        <h2 className={"text-7xl text-red-500"}>ROADMAP</h2>
                        <div className={"flex flex-col md:flex-row gap-10 w-full  mt-[30rem] md:mt-0 max-w-4xl"}>
                            <div
                                className={"bg-[#00BAFF] rounded-[20px] border-[2px] flex flex-col items-center gap-2 border-white w-full py-10"}>
                                <a className={"text-2xl"}>PHASE 1</a>
                                <a className={"text-6xl"}>PRESALE</a>
                            </div>
                            <div
                                className={"bg-[#F84C51] rounded-[20px] border-[2px] flex flex-col items-center gap-2 border-white w-full py-10"}>
                                <a className={"text-2xl"}>PHASE 2</a>
                                <a className={"text-6xl"}>VIBES</a>
                            </div>
                            <div
                                className={"bg-[#00BAFF] rounded-[20px] border-[2px] flex flex-col items-center gap-2 border-white w-full py-10"}>
                                <a className={"text-2xl"}>PHASE 3</a>
                                <a className={"text-6xl"}>TAKEOVER</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col items-center justify-between bg-[#00baff] py-10 gap-10 w-full"}>
                <h2 className={"font-weird text-4xl"}>POWERED BY :</h2>
                <div className={"flex flex-col md:flex-row gap-10 relative "}>
                    <Image src={"/Bnb.png"} alt={"bnb"} className={"object-cover w-full"} width={205} height={47}/>
                    <Image src={"/polygon.png"} alt={"pol"} className={"object-cover w-full"} width={205} height={47}/>
                    <Image src={"/Solana.png"} alt={"sol"} className={"object-cover w-full"} width={205} height={47}/>
                    <Image src={"/eth.png"} alt={"eth"} className={"object-cover w-full"} width={205} height={47}/>
                </div>
                <div className={"mt-5 flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center px-3 md:p-0 max-w-[900px] w-full"}>
                    <a>MAMAFROG © All Rights Reserved 2024</a>
                    <div className={"flex items-center justify-center gap-2"}>
                        <div
                            className={"flex items-center justify-center rounded-full h-[40px] w-[40px] bg-white p-2 color-[#00baff] border-[0.5px] border-transparent hover:border-white hover:color-white hover:bg-[#00baff] transition duration-700 ease-in-out"}>
                            <Image src={"/mamma.svg"} alt={"twtt"} height={30} width={30}/>
                        </div>
                        <div
                            className={"flex items-center justify-center rounded-full h-[40px] w-[40px] bg-white p-2 color-[#00baff] border-[0.5px] border-transparent hover:border-white hover:color-white hover:bg-[#00baff] transition duration-700 ease-in-out"}>
                            <Image src={"/tele.svg"} alt={"twtt"} height={30} width={30}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
