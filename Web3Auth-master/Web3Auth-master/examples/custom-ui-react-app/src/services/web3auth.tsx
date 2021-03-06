import { ADAPTER_EVENTS, SafeEventEmitterProvider, UserInfo, WALLET_ADAPTERS, WALLET_ADAPTER_TYPE } from "@web3auth/base";
import type { LOGIN_PROVIDER_TYPE } from "@toruslabs/openlogin";
import { CHAIN_NAMESPACES, CustomChainConfig, EVM_ADAPTERS } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { Web3AuthCore } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import { NetworkSwitch } from "@web3auth/ui";
import { createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { getWalletProvider, IWalletProvider } from "./walletProvider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { writeUserDiscord, writeUserTwitter, writeUserWallet, writeUserFullProfile } from "../services/firebasedb";
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { PhantomAdapter } from '@web3auth/phantom-adapter';
import { SolanaWalletAdapter } from '@web3auth/torus-solana-adapter';
import { TorusWalletAdapter } from '@web3auth/torus-evm-adapter';
import solanaProvider from "./solanaProvider";

export interface IWeb3AuthContext {
  web3Auth: Web3Auth | null;
  provider: IWalletProvider | null;
  isLoading: boolean;
  user: unknown;
  login: (adapter: WALLET_ADAPTER_TYPE,provider: LOGIN_PROVIDER_TYPE, login_hint?: string) => Promise<any>;
  loginWithWalletConnect: ()=> Promise<any>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  signMessage: () => Promise<any>;
  signV4Message: () => Promise<any>;
  getAccounts: () => Promise<any>;
  getBalance: () => Promise<any>;
  progressUpdate: () => Promise<any>,
  getDiscordVerifiedStatus: () => Promise<any>,
  getTwitterVerifiedStatus: () => Promise<any>,
  getWalletVerifiedStatus: () => Promise<any>,
  userFullProfilePush : () => Promise<void>,
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  web3Auth: null,
  provider: null,
  isLoading: false,
  user: null,
  login: async (adapter: WALLET_ADAPTER_TYPE, provider?: LOGIN_PROVIDER_TYPE, login_hint?: string) => {},
  loginWithWalletConnect: async ()=> {},
  logout: async () => {},
  getUserInfo: async () => {},
  signMessage: async () => {},
  signV4Message: async () => {},
  getAccounts: async () => {},
  getBalance: async () => {},
  progressUpdate: async () => {},
  getDiscordVerifiedStatus: async () => {},
  getTwitterVerifiedStatus: async () => {},
  getWalletVerifiedStatus: async () => {},
  userFullProfilePush : async () => {}
});

export function useWeb3Auth() {
  return useContext(Web3AuthContext);
}

interface IWeb3AuthState {
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: CHAIN_CONFIG_TYPE;
}
interface IWeb3AuthProps {
  children?: ReactNode;
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: CHAIN_CONFIG_TYPE;
}

export const Web3AuthProvider: FunctionComponent<IWeb3AuthState> = ({ children, web3AuthNetwork, chain }: IWeb3AuthProps) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [web3AuthChumma, setWeb3AuthChumma] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<IWalletProvider | null>(null);
  const [user, setUser] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [VerifiedDiscord, setVerifiedDiscord] = useState(false);
  const [VerifiedTwitter, setVerifiedTwitter] = useState(false);
  const [VerifiedWallet, setVerifiedWallet] = useState(false);
  const [InfoDiscord, setInfoDiscord] = useState<Partial<UserInfo> | null>(null);
  const [InfoTwitter, setInfoTwitter] = useState<Partial<UserInfo> | null>(null);
  const [InfoWallet, setInfoWallet] = useState("");
  const [InfoWalletArr, setInfoWalletArr] = useState<String[]>([]);

  const setWalletProvider = useCallback(
    async (web3authProvider: SafeEventEmitterProvider) => {
      const walletProvider = getWalletProvider(chain, web3authProvider, uiConsole);
      setProvider(walletProvider);
      const walletaddr = await walletProvider.getAccounts();
      writeUserWallet(String(walletaddr[0]));
      setInfoWallet(String(walletaddr[0]));
      var newNumbers = InfoWalletArr.slice(); ;
      newNumbers.push(String(walletaddr[0]));
      console.log("PUSHED");
      console.log(String(walletaddr[0]));
      console.log(InfoWalletArr);
      setInfoWalletArr(newNumbers);
      setVerifiedWallet(true); // activate only for non social logins
    },
    [chain]
  );

  const progressUpdate = async () => {
    var count = Number(VerifiedDiscord) + Number(VerifiedTwitter) + Number(VerifiedWallet);
    return count*33;
  };

  const getDiscordVerifiedStatus = async () => {
    return VerifiedDiscord;
  };

  const getTwitterVerifiedStatus = async () => {
    return VerifiedTwitter;
  };

  const getWalletVerifiedStatus = async () => {
    return VerifiedWallet;
  };

  useEffect(() => {
    const subscribeAuthEvents = (web3auth: Web3Auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
        console.log("Yeah!, you are successfully logged in", data);
        setUser(data);
        // setWalletProvider(web3auth.provider!);
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setUser(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error: unknown) => {
        console.error("some error or user has cancelled login request", error);
        setUser(null);
        logout();
        setIsLoading(false);
        console.log("PAPILAN");
      });

      web3auth.on(ADAPTER_EVENTS.ADAPTER_DATA_UPDATED, () => {
        console.log("data updated");
      });

      web3auth.on(ADAPTER_EVENTS.NOT_READY, () => {
        console.log("not ready");
      });

      web3auth.on(ADAPTER_EVENTS.READY, () => {
        console.log("ready");
      });
    };

    const subscribeAuthEventsChumma = (web3auth: Web3AuthCore) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
        console.log("Yeah!, you are successfully logged in", data);
        setUser(data);
        // setWalletProvider(web3auth.provider!);
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setUser(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error: unknown) => {
        console.error("some error or user has cancelled login request", error);
        setUser(null);
        logout();
        setIsLoading(false);
        console.log("PAPILAN");
      });

      web3auth.on(ADAPTER_EVENTS.ADAPTER_DATA_UPDATED, () => {
        console.log("data updated");
      });

      web3auth.on(ADAPTER_EVENTS.NOT_READY, () => {
        console.log("not ready");
      });

      web3auth.on(ADAPTER_EVENTS.READY, () => {
        console.log("ready");
      });
    };

    const currentChainConfig = CHAIN_CONFIG[chain];

    async function init() {
      try {
        const blockchaintype = currentChainConfig["ticker"];
        setIsLoading(true);
        const web3authchumma = new Web3AuthCore({ 
          chainConfig: currentChainConfig,
          enableLogging: true
        });

        subscribeAuthEventsChumma(web3authchumma);
        const openadapter = new OpenloginAdapter({ adapterSettings: { network: web3AuthNetwork, clientId:"BDl6ByIyBPCCOk7dtJfdEpIY4My9UM9zkjx6YvtfBVbI6yEkxAN7i4FpBPlyaWaE1P29G_3JZwm68MN-V2hnb0U" } });
        web3authchumma.configureAdapter(openadapter);
        await web3authchumma.init();
        setWeb3AuthChumma(web3authchumma);


        const web3auth = new Web3Auth({ chainConfig: currentChainConfig, clientId: "BDl6ByIyBPCCOk7dtJfdEpIY4My9UM9zkjx6YvtfBVbI6yEkxAN7i4FpBPlyaWaE1P29G_3JZwm68MN-V2hnb0U" });
        subscribeAuthEvents(web3auth);
        if (blockchaintype == "ETH"){
          const metaAdapter = new MetamaskAdapter({
            chainConfig:{
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x3",
            rpcTarget: "https://ropsten.infura.io/v3/776218ac4734478c90191dde8cae483c",
            displayName: "ropsten",
            blockExplorer: "https://ropsten.etherscan.io/",
            ticker: "ETH",
            tickerName: "Ethereum",
            },
          });
          const TorusAdapter = new TorusWalletAdapter({
           loginSettings: {
             verifier: "google"
           },
           initParams: {
             buildEnv: "testing"
           },
           chainConfig:{
             chainNamespace: CHAIN_NAMESPACES.EIP155,
             chainId: "0x3",
             rpcTarget: "https://ropsten.infura.io/v3/776218ac4734478c90191dde8cae483c",
             displayName: "ropsten",
             blockExplorer: "https://ropsten.etherscan.io/",
             ticker: "ETH",
             tickerName: "Ethereum",
           }
          });    
          web3auth.configureAdapter(metaAdapter);
          web3auth.configureAdapter(TorusAdapter);
          const openadapter = new OpenloginAdapter({ adapterSettings: { network: web3AuthNetwork, clientId:"BDl6ByIyBPCCOk7dtJfdEpIY4My9UM9zkjx6YvtfBVbI6yEkxAN7i4FpBPlyaWaE1P29G_3JZwm68MN-V2hnb0U" } });
          web3auth.configureAdapter(openadapter);
          await web3auth.initModal({
            modalConfig: {
              [WALLET_ADAPTERS.OPENLOGIN]: {
                label: "OpenLogin",
                showOnModal: false,
                showOnDesktop: false,
                showOnMobile: false
              },
              [WALLET_ADAPTERS.COINBASE]: {
                label: "Coinbase",
                showOnModal: true,
                showOnDesktop: true,
                showOnMobile: true
              },
              [WALLET_ADAPTERS.TORUS_EVM]: {
                label: "Torus Ethereum",
                showOnModal: true,
                showOnDesktop: true,
                showOnMobile: true
              },
              [WALLET_ADAPTERS.WALLET_CONNECT_V1]: {
                label: "Wallet Connect",
                showOnModal: true,
                showOnDesktop: true,
                showOnMobile: true
              },
            },
          });

        } else if (blockchaintype == "SOL") {
          const solanaAdapter = new SolanaWalletAdapter({
            adapterSettings: {
             modalZIndex: 99999
           },
           loginSettings: {
             loginProvider: "google"
           },
           initParams: {
             buildEnv: "testing"
           },
           chainConfig:{
             chainNamespace: CHAIN_NAMESPACES.SOLANA,
             rpcTarget: "https://api.testnet.solana.com",
             blockExplorer: "https://explorer.solana.com",
             chainId: "0x2",
             displayName: "testnet",
             ticker: "sol",
             tickerName: "solana",
           }
          });
          const phantomAdapter = new PhantomAdapter()
          web3auth.configureAdapter(phantomAdapter);
          web3auth.configureAdapter(solanaAdapter);
          await web3auth.initModal({
            modalConfig: {
              [WALLET_ADAPTERS.OPENLOGIN]: {
                label: "OpenLogin",
                showOnModal: false,
                showOnDesktop: false,
                showOnMobile: false
              },
              [WALLET_ADAPTERS.PHANTOM]: {
                label: "Phantom",
                showOnModal: true,
                showOnDesktop: true,
                showOnMobile: true
              },
              [WALLET_ADAPTERS.TORUS_SOLANA]: {
                label: "Torus Solana",
                showOnModal: true,
                showOnDesktop: true,
                showOnMobile: true
              },
            },
          });
        }
        setWeb3Auth(web3auth);
      } catch (error) {
        console.log("DIDN'T MAKE IT ALL THE WAY");
        console.log("error", error);
      }  finally {
        setIsLoading(false);
      }
    }
    init();
  }, [chain, web3AuthNetwork, setWalletProvider]);

  const login = async (adapter: WALLET_ADAPTER_TYPE, loginProvider: LOGIN_PROVIDER_TYPE, login_hint?: string) => {
    try {
      setIsLoading(true);
      if (!web3AuthChumma) {
        console.log("web3auth not initialized yet");
        uiConsole("web3auth not initialized yet");
        return;
      }
      try{
        await web3AuthChumma.logout();
      }catch (e){
        console.log("JJJ");
      }
      const localProvider = await web3AuthChumma.connectTo(adapter, { loginProvider, login_hint });
      setWalletProvider(localProvider!);
      const peace  = await web3AuthChumma.getUserInfo();
      if (loginProvider == "discord"){
        console.log("discord login detected and verified");
        setVerifiedDiscord(true);
        setInfoDiscord(peace);
        await writeUserDiscord(String(peace["email"]), String(peace["name"]));
        try{
          await web3AuthChumma.logout();
        }catch (e){
          console.log("JJJ");
        }
        setProvider(null);
      }
      if (loginProvider == "twitter"){
        console.log("twitter login detected and verified");
        await writeUserTwitter(String(peace["email"]),String(peace["name"]),String(peace["profileImage"]));
        setVerifiedTwitter(true);
        setInfoTwitter(peace);
        try{
          await web3AuthChumma.logout();
        }catch (e){
          console.log("JJJ");
        }
        setProvider(null);;
      }
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    } finally {
      setIsLoading(false)
    }

  };

  const loginWithWalletConnect = async () => {
    try {
      if (!web3Auth) {
        console.log("web3auth not initialized yet");
        uiConsole("web3auth not initialized yet");
        return false;
      }
      const localProvider = await web3Auth.connect();
      await setWalletProvider(localProvider!);
      await logout();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const userFullProfilePush = async () => {
      if(VerifiedDiscord&&VerifiedTwitter&&VerifiedWallet){
        console.log("ARRAY");
        console.log(InfoWalletArr);
        writeUserFullProfile(InfoWalletArr,InfoDiscord,InfoTwitter);
      }
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3Auth.getUserInfo();
    uiConsole(user);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    provider.getAccounts();
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    provider.getBalance();
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    provider.signMessage();
  };
  const signV4Message = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      uiConsole("provider not initialized yet");
      return;
    }
    provider.signV4Message();
  };

  const uiConsole = (...args: unknown[]): void => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  };

  const contextProvider = {
    web3Auth,
    provider,
    user,
    isLoading,
    login,
    loginWithWalletConnect,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    signMessage,
    signV4Message,
    progressUpdate,
    getDiscordVerifiedStatus,
    getTwitterVerifiedStatus,
    getWalletVerifiedStatus,
    userFullProfilePush
  };
  return <Web3AuthContext.Provider value={contextProvider}>{children}</Web3AuthContext.Provider>;
};
