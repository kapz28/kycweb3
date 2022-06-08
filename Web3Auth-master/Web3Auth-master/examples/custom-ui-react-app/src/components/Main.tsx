import { ADAPTER_EVENTS, SafeEventEmitterProvider, WALLET_ADAPTERS, WALLET_ADAPTER_TYPE } from "@web3auth/base";
import type { LOGIN_PROVIDER_TYPE } from "@toruslabs/openlogin";
import { FormEvent } from "react";
import { useState } from "react";
import { useWeb3Auth } from "../services/web3auth";
import Loader from "./Loader";
import styles from "../styles/Home.module.css";
import { Button, Checkbox, Input, Spacer, Text, Progress } from "@nextui-org/react";
import { writeUserDiscord, writeUserTwitter, writeUserWallet }from "../services/firebasedb";

const Main = () => {
  const { provider, login, loginWithWalletConnect, logout, getUserInfo, getAccounts, getBalance, signMessage, isLoading, signV4Message, progressUpdate, getDiscordVerifiedStatus, getTwitterVerifiedStatus, getWalletVerifiedStatus } = useWeb3Auth();
  const handleLoginWithEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any)[0].value;
    login(WALLET_ADAPTERS.OPENLOGIN, "email_passwordless", email);
  }
  const [ProgressPercentage, setProgressPercentage] = useState(0);
  const [VerifiedDiscord, setVerifiedDiscord] = useState(false);
  const [VerifiedTwitter, setVerifiedTwitter] = useState(false);
  const [VerifiedWallet, setVerifiedWallet] = useState(false);

  const loginAndUpdate = async (adapter: WALLET_ADAPTER_TYPE,provider: LOGIN_PROVIDER_TYPE, login_hint?: string) => {
    const chumma = await login(adapter,provider,login_hint);
    if (chumma){
      if(provider == "discord"){
        setVerifiedDiscord(true);
        setProgressPercentage(ProgressPercentage + 33);
      }
      else if(provider == "twitter"){
        setVerifiedTwitter(true);
        setProgressPercentage(ProgressPercentage + 33);
      }
    }
  };

  const loginWalletAndUpdate = async () => {
    const chumma = await loginWithWalletConnect();
    if (chumma){
        setVerifiedWallet(true);
        setProgressPercentage(ProgressPercentage + 33);
    }
  };

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
          Get Balance
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={signMessage}>
          Sign Message
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={signV4Message}>
          Sign V4 Message
      </Button>
      <Spacer y={1} />
      <Button auto color="gradient" rounded bordered onPress={logout}>
          Logout
      </Button>
      <Spacer y={1} />
      <Progress value={ProgressPercentage} color="gradient" />

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
      <div className={styles.row}>
        <Button auto color="gradient" rounded bordered onPress={()=>loginAndUpdate(WALLET_ADAPTERS.OPENLOGIN,"discord",)}>
            Discord
        </Button>
        <Spacer x={1} />
        <Checkbox isSelected={VerifiedDiscord} color="gradient">
        </Checkbox>
      </div>
      <Spacer y={1} />
      <div className={styles.row}>
        <Button auto color="gradient" rounded bordered onPress={()=>loginAndUpdate(WALLET_ADAPTERS.OPENLOGIN,"twitter")}>
            Twitter
        </Button>
        <Spacer x={1} />
        <Checkbox isSelected={VerifiedTwitter} color="gradient">
        </Checkbox>
      </div>
      <Spacer y={1} />
      <div className={styles.row}>
        <Button auto color="gradient" rounded bordered onPress={()=>loginWalletAndUpdate()}>
            Wallet Connect
        </Button>
        <Spacer x={1} />
        <Checkbox isSelected={VerifiedWallet} color="gradient">
        </Checkbox>
      </div>
      <Spacer y={1} />
      <Progress value={ProgressPercentage} color="gradient" />
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
