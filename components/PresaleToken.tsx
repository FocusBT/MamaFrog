"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import Countdown from "@/components/Countdown";
import {BaseError, useAccount, useDisconnect, useEnsName, useWaitForTransactionReceipt, useWriteContract} from "wagmi";
import {useWeb3Modal} from "@web3modal/scaffold-react";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {config} from "@/lib/config";
export const dynamic = 'force-dynamic';

const formSchema = z.object({
    input: z.coerce.number().min(0.01).max(100000),
    token: z.coerce.number().min(0.001).max(1000000),
});

export default function PresaleToken() {
    const [bnbPrice, setBnbPrice] = useState(0);
    const {data: hash, error, isPending, writeContract} = useWriteContract(config)
    const {open} = useWeb3Modal();
    const {address} = useAccount()
    const {disconnect} = useDisconnect()
    const {data: ensName} = useEnsName({address})

    const CONTRACT_ADDRESS = "0x760F7dF1441db508b2F354D991ba942c63262C9d";
    const ABI = [
        {
            inputs: [
                {internalType: "address", name: "to", type: "address"},
                {internalType: "uint256", name: "tokens", type: "uint256"},
            ],
            name: "transfer",
            outputs: [{internalType: "bool", name: "success", type: "bool"}],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: 0,
            token: 0,
        },
    });

    useEffect(() => {
        async function fetchBNBPrice() {
            try {
                const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd");
                const data = await response.json();
                setBnbPrice(data.binancecoin.usd || 0);
            } catch (error) {
                console.error("Failed to fetch BNB price:", error);
            }
        }

        fetchBNBPrice().then(r => {
        });
    }, []);

    useEffect(() => {
        const subscription = form.watch((value) => {
            const {input} = value;
            if (bnbPrice > 0 && input > 0) {
                const calculatedToken = input / bnbPrice / 0.00001854;
                if (form.getValues("token") !== calculatedToken) {
                    form.setValue("token", calculatedToken);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [bnbPrice, form]);
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!address) {
            console.error("No wallet connected");
            return;
        }

        const { input, token } = values;

        if (!token || token <= 0 || isNaN(token)) {
            console.error("Invalid token value:", token);
            alert("Invalid token value. Please check your input.");
            return;
        }

        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: ABI,
                functionName: "transfer",
                args: [address, BigInt(token * 1e18)],
            });

            console.log("Transaction sent:");
        } catch (err) {
            console.error("Transaction error:", err);
            alert(`Transaction failed: ${err.message || "Unknown error"}`);
        }
    }


    return (
        <Form {...form}>
            <form className={"text-left flex gap-5 flex-col"} onSubmit={form.handleSubmit(onSubmit)}>
                <div className={"flex flex-col items-center gap-4"}>
                    <h2 className={"font-bold text-3xl font-weird"}>BUY $MAMAFROG TOKENS NOW!</h2>
                    <Countdown targetDate={"2025-01-01T00:00:00Z"}/>
                    <p className={"font-semibold"}>USDT RAISED: <span className={""}>$68,019.29</span></p>
                </div>
                <div className={"px-1 flex items-center justify-center gap-2"}>
                    <hr className={"h-[2px] bg-secondary-foreground/70 w-full border-none"}/>
                    <p className={"text-secondary-foreground/70 w-full text-nowrap text-sm"}>1 $MAMAFROG =
                        $0.00001854</p>
                    <hr className={"h-[2px] bg-secondary-foreground/70 w-full border-none"}/>
                </div>
                <FormField
                    control={form.control}
                    name="input"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={"text-sm text-white"}>Pay with <span
                                className={"font-bold"}>BNB</span></FormLabel>
                            <FormControl>
                                <Input placeholder="0" type={"number"}
                                       className={"rounded-xl p-5 border-white border-[2px]"} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="token"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={"text-sm text-white"}><span
                                className={"font-bold"}>$MAMAFROG</span> you receive</FormLabel>
                            <FormControl>
                                <Input placeholder="0" type={"number"}
                                       className={"rounded-xl p-5 border-white border-[2px] text-white"} {...field}
                                       readOnly/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className={"flex w-full justify-center items-center gap-2 flex-col"}>
                    <div className={"flex flex-col w-full gap-2"}>
                        <div className={"w-full flex-row flex gap-2"}>
                            {typeof window !== 'undefined' && (
                                address ? <></> :
                                    <Button className={"p-5 rounded-xl text-md font-weird text-2xl w-full"}
                                            onClick={() => open()}>CONNECT
                                        WALLET</Button>
                            )}
                            <Button
                                className={"p-5 rounded-xl text-md font-weird font-bold text-2xl w-full border-none transition-all"}
                                type={"submit"} disabled={isPending || !address}

                                variant={"destructive"}>      {isPending ?
                                <Loader2 className="animate-spin"/> : <></>} {isPending ? 'PURCHASING...' : 'BUY NOW'}
                            </Button>
                        </div>
                        {typeof window !== 'undefined' && (

                            address ?
                                <button className={"rounded-xl text-md font-weird text-xl w-full text-foreground/70"}
                                        variant={"ghost"}
                                        onClick={() => disconnect()}>DISCONNECT
                                </button>
                                :
                                <></>
                        )}
                        {isConfirming && <div>Waiting for confirmation...</div>}
                        {isConfirmed && <div>Transaction confirmed.</div>}

                    </div>
                </div>
            </form>
        </Form>
    );
}
