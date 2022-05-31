import { WALLET_ADAPTERS } from "@web3auth/base";
import { FormEvent } from "react";
import { useWeb3Auth } from "../services/web3auth";
import Loader from "./Loader";
import styles from "../styles/Home.module.css";
import { Button, Input, Spacer, Text } from "@nextui-org/react";

const Main = () => {
  const { provider, login, loginWithWalletConnect, logout, getUserInfo, getAccounts, getBalance, signMessage, isLoading, signV4Message } = useWeb3Auth();
  const handleLoginWithEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any)[0].value
    login(WALLET_ADAPTERS.OPENLOGIN, "email_passwordless", email);
  }
  const loggedInView = (
    <>
      <button onClick={getUserInfo} className={styles.card}>
        Get User Info
      </button>
      <button onClick={getAccounts} className={styles.card}>
        Get Accounts
      </button>
      <button onClick={getBalance} className={styles.card}>
        Get Balance
      </button>
      <button onClick={signMessage} className={styles.card}>
        Sign Message
      </button>
      <button onClick={signV4Message} className={styles.card}>
        Sign v4 Message
      </button>
      <button onClick={logout} className={styles.card}>
        Log Out
      </button>

      <div className={styles.console} id="console">
        <p className={styles.code}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <div className={styles.centerFlex}>
      <Text h1>Welcome to Third Society</Text>
      <Text h2>Unlock a new dimension to your Communities</Text>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={()=>login(WALLET_ADAPTERS.OPENLOGIN,"discord")}>
          Discord
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={()=>login(WALLET_ADAPTERS.OPENLOGIN,"twitter")}>
          Twitter
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={()=>loginWithWalletConnect()}>
          Wallet Connect
      </Button>
    </div>
  
    
  );

  return isLoading ?
    (
      <div className={styles.centerFlex}>
        <Loader></Loader>
      </div>
    ): (
      <div className={styles.grid}>{provider ? loggedInView : unloggedInView}</div>
    )
};

export default Main;
