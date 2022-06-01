import { WALLET_ADAPTERS } from "@web3auth/base";
import { FormEvent } from "react";
import { useState } from "react";
import { useWeb3Auth } from "../services/web3auth";
import Loader from "./Loader";
import styles from "../styles/Home.module.css";
import { Button, Checkbox, Input, Spacer, Text, Progress } from "@nextui-org/react";

const Main = () => {
  const { provider, login, loginWithWalletConnect, logout, getUserInfo, getAccounts, getBalance, signMessage, isLoading, signV4Message } = useWeb3Auth();
  const handleLoginWithEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any)[0].value
    login(WALLET_ADAPTERS.OPENLOGIN, "email_passwordless", email);
  }
  const [VerifiedDiscord, setVerifiedDiscord] = useState(false);
  const [VerifiedTwitter, setVerifiedTwitter] = useState(false);
  const [VerifiedWallet, setVerifiedWallet] = useState(false);
  const [ProgressPercentage, setProgressPercentage] = useState(0);

  const progressUpdate = async () => {
    var count = Number(VerifiedDiscord) + Number(VerifiedTwitter) + Number(VerifiedWallet);
    setProgressPercentage(count*0.33);
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
        <Button auto color="gradient" rounded bordered onPress={()=>login(WALLET_ADAPTERS.OPENLOGIN,"discord")}>
            Discord
        </Button>
        <Spacer x={1} />
        <Checkbox isSelected={VerifiedDiscord} color="gradient">
        </Checkbox>
      </div>
      <Spacer y={1} />
      <div className={styles.row}>
        <Button auto color="gradient" rounded bordered onPress={()=>login(WALLET_ADAPTERS.OPENLOGIN,"twitter")}>
            Twitter
        </Button>
        <Spacer x={1} />
        <Checkbox isSelected={VerifiedTwitter} color="gradient">
        </Checkbox>
      </div>
      <Spacer y={1} />
      <div className={styles.row}>
        <Button auto color="gradient" rounded bordered onPress={()=>loginWithWalletConnect()}>
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
