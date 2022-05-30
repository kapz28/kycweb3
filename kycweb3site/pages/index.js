// pages/index.js
import { ADAPTER_EVENTS, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/web3auth";
import { useEffect, useState } from "react";
import "./App.css";
import RPC from "./evm";
  
export default function Home() {
  const [web3AuthInstance, setWeb3AuthInstance] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3AuthCtorParams = {
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId:  "0x1",
            rpcTarget: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // This is the testnet RPC we have added, please pass on your own endpoint while creating an app
          }
        }
        const { Web3Auth } = await import("@web3auth/web3auth");
        const web3AuthInstance = new Web3Auth(web3AuthCtorParams as Web3AuthOptions);
        subscribeAuthEvents(web3AuthInstance);
        setWeb3AuthInstance(web3AuthInstance);
        await web3AuthInstance.initModal();
      } catch (error) {
        console.error(error);
      }
    };

    const subscribeAuthEvents = (web3AuthInstance: Web3Auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3AuthInstance.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
        console.log("Yeah!, you are successfully logged in", data);
      });

      web3AuthInstance.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3AuthInstance.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
      });

      web3AuthInstance.on(ADAPTER_EVENTS.ERRORED, (error) => {
        console.error("some error or user has cancelled login request", error);
      });
    };

    init();
  }, []);

  const login = async () => {
    if (!web3AuthInstance) {
      console.log("web3auth not initialized yet");
      return;
    }
    const provider = await web3AuthInstance.connect();
    setProvider(provider);
  };

  const getUserInfo = async () => {
    if (!web3AuthInstance) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3AuthInstance.getUserInfo();
    console.log("User info", user);
  };

  const logout = async () => {
    if (!web3AuthInstance) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3AuthInstance.logout();
    setProvider(null);
  };

  const onGetAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const userAccount = await rpc.getAccounts();
    console.log("User account", userAccount);
  };

  const loggedInView = (
    <>
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={onGetAccounts} className="card">
        Get Accounts
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth
        </a>{" "}
        & ReactJS Example
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a href="https://github.com/Web3Auth/Web3Auth/tree/master/examples/react-app" target="_blank" rel="noopener noreferrer">
          Source code {"  "}
          <img className="logo" src="/images/github-logo.png" alt="github-logo" />
        </a>
      </footer>
    </div>
  );
}

export default Home;





// import Link from "next/link";
// import styles from '../styles/Home.module.css';
// import React, { useState } from 'react';
// import { Magic } from "magic-sdk";
// import { Button, Input, Spacer, Text } from "@nextui-org/react";
// import { useRouter } from 'next/router';

// export default function Home() {
//   const [email, setEmail] = useState('');
//   const [magic, setMagicLink] = useState('');
//   const router = useRouter();
//   const loginwithMagicLink = async() => {
//     try {
//       var did = await new Magic('pk_live_67D8641A6E69A608');
//       setMagicLink(did);
//       await did.auth.loginWithMagicLink({ email: email });
//       if(did.auth){
//         router.push(
//           {
//             pathname: '/about',
//             query: did
//           },
//           '/about',
//         );
//       }else{
//         const isLoggedIn = await magic.user.isLoggedIn();
//         if (isLoggedIn) {
//           router.push(
//             {
//               pathname: '/about',
//               query: did
//             },
//             '/about',
//           );
//         }else{
//           console.log("not Loggged in");
//         }
//       }
//     }
//     catch (e) {
//       console.log(e);
//       console.log("Something went wrong, Try Again");
//     }
//   };

//   return (
//     <div className={styles.container}>
//         <main className={styles.main}>
//           <Text h1>Welcome to Third Society</Text>
//           <Spacer y={2.5} />
//           <Input clearable bordered labelPlaceholder="Email*" initialValue="" onChange={e => setEmail(e.target.value)} onClearClick={() => setEmail(' ')}/>
//           <Spacer y={2.5} />
//           <Button auto color="gradient" rounded bordered onPress={() => loginwithMagicLink()}>
//             Login
//           </Button>
//           <Spacer y={1.5} />
//           <Link href="/about" >
//               <a>
//               <Button auto color="gradient" rounded bordered >
//                   Test Go to Dashboard
//               </Button>
//               </a>
//           </Link>
//         </main>
//     </div>
//   )
// }
