import { http, createConfig } from "wagmi";
import { bsc } from "wagmi/chains";

export const projectId = "c18aee00ad27b7803950873e9291abf2";

export const config = createConfig({
  chains: [bsc],
  // connectors: [
  //     injected(),
  //     walletConnect({ projectId }),
  //     metaMask(),
  //     safe(),
  // ],
  transports: {
    [bsc.id]: http(),
  },
});
