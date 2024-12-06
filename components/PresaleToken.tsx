"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Countdown from "@/components/Countdown";
import {
  useAccount,
  useDisconnect,
  useEnsName,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useWeb3Modal } from "@web3modal/scaffold-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { config } from "@/lib/config";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { formatEther } from "viem";
import { toast } from "react-toastify";

const formSchema = z.object({
  input: z.coerce.number().min(0.01).max(100000),
  token: z.coerce.number().min(0.001).max(1000000),
});

export default function PresaleToken() {
  const [bnbPrice, setBnbPrice] = useState(0);
  const [mounted, setMounted] = useState(false);

  const {
    data: hash,
    isPending,
    writeContract,
  } = useWriteContract({
    config,
  });

  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  //   const { data: ensName } = useEnsName({ address });

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: ethPrice } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "pendingTokens",
    args: [address],
  });

  const { data: isClaimEnabled } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "claimEnabled",
  });

  const ethPriceInDecimal = ethPrice
    ? Number(formatEther(ethPrice)).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: 0,
      token: 0,
    },
  });

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch BNB price
  useEffect(() => {
    async function fetchBNBPrice() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
        );
        const data = await response.json();
        setBnbPrice(data.binancecoin.usd || 0);
      } catch (error) {
        console.error("Failed to fetch BNB price:", error);
      }
    }

    if (mounted) {
      fetchBNBPrice();
    }
  }, [mounted]);

  // Handle form calculations
  useEffect(() => {
    if (!mounted) return;

    const subscription = form.watch((value) => {
      const { input } = value;
      if (bnbPrice > 0 && input && input > 0) {
        const calculatedToken = input / bnbPrice / 0.00001854;
        if (form.getValues("token") !== calculatedToken) {
          form.setValue("token", calculatedToken);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [bnbPrice, form, mounted]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success(`Transaction confirmed. ${hash}`);
    }

    if (isError) {
      toast.error("Transaction failed.");
    }
  }, [hash, isConfirmed, isError]);

  async function claimTokens() {
    if (!address) {
      console.error("No wallet connected");
      return;
    }

    try {
      writeContract(
        {
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "claimTokens",
        },
        {
          onError: () => toast.success("Transaction failed"),
        }
      );
    } catch (err: unknown) {
      console.error("Transaction error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      alert(`Transaction failed: ${errorMessage}`);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!address) {
      console.error("No wallet connected");
      return;
    }

    const { input } = values;

    if (!input || input <= 0 || isNaN(input)) {
      console.error("Invalid token value:", input);
      alert("Invalid token value. Please check your input.");
      return;
    }

    try {
      writeContract(
        {
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "buyTokens",
          value: BigInt(input * 1e18),
        },
        { onError: (err) => console.log("Transaction Error:", err) }
      );
    } catch (err: unknown) {
      console.error("Transaction error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      alert(`Transaction failed: ${errorMessage}`);
    }
  }

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        className={"text-left flex gap-5 flex-col"}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className={"flex flex-col items-center gap-4"}>
          <h2 className={"font-bold text-3xl font-weird"}>
            BUY $MAMAFROG TOKENS NOW!
          </h2>
          <Countdown targetDate={"2025-01-01T00:00:00Z"} />
          <p className={"font-semibold"}>
            USDT RAISED: <span className={""}>$68,019.29</span>
          </p>
          <p className={"font-semibold"}>
            INVESTED: <span className={""}>{ethPriceInDecimal} $MAMAFROG</span>
          </p>
        </div>
        <div className={"px-1 flex items-center justify-center gap-2"}>
          <hr
            className={"h-[2px] bg-secondary-foreground/70 w-full border-none"}
          />
          <p
            className={
              "text-secondary-foreground/70 w-full text-nowrap text-sm"
            }
          >
            1 $MAMAFROG = $0.00001854
          </p>
          <hr
            className={"h-[2px] bg-secondary-foreground/70 w-full border-none"}
          />
        </div>
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-sm text-white"}>
                Pay with <span className={"font-bold"}>BNB</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type={"number"}
                  className={"rounded-xl p-5 border-white border-[2px]"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"text-sm text-white"}>
                <span className={"font-bold"}>$MAMAFROG</span> you receive
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  type={"number"}
                  className={
                    "rounded-xl p-5 border-white border-[2px] text-white"
                  }
                  {...field}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className={"flex w-full justify-center items-center gap-2 flex-col"}
        >
          <div className={"flex flex-col w-full gap-2"}>
            <div className={"w-full flex-row flex gap-2"}>
              {!address && (
                <Button
                  className={
                    "p-5 rounded-xl text-md font-weird text-2xl w-full"
                  }
                  onClick={(event) => {
                    event.preventDefault();
                    open();
                  }}
                >
                  CONNECT WALLET
                </Button>
              )}
              <Button
                className={
                  "p-5 rounded-xl text-md font-weird font-bold text-2xl w-full border-none transition-all"
                }
                type="submit"
                disabled={isPending || !address}
                variant="destructive"
              >
                {isPending ? <Loader2 className="animate-spin" /> : null}
                {isPending ? "PURCHASING..." : "BUY NOW"}
              </Button>
              <Button
                className={
                  "p-5 rounded-xl text-md font-weird font-bold text-2xl w-full border-none transition-all"
                }
                onClick={(e) => {
                  e.preventDefault();
                  claimTokens();
                }}
                disabled={!isClaimEnabled || !address}
                variant="destructive"
              >
                CLAIM NOW
              </Button>
            </div>
            {address && (
              <Button
                className={
                  "rounded-xl text-md font-weird text-xl w-full text-foreground/70"
                }
                variant="ghost"
                onClick={() => disconnect()}
              >
                DISCONNECT
              </Button>
            )}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
          </div>
        </div>
      </form>
    </Form>
  );
}
