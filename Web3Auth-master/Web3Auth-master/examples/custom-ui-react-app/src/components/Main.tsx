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
      <Text h1>Welcome to Third Society</Text>
      <Text h2>Unlock a new dimension to your Communities</Text>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={getUserInfo}>
          Get User Info
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={getAccounts}>
          Get Accounts
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={getBalance}>
          Get Accounts
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={signMessage}>
          Get Accounts
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={signV4Message}>
          Get Accounts
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={logout}>
          Get Accounts
      </Button>
      <Spacer y={1} />

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
