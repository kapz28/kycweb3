// pages/index.js

import Link from "next/link";
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import { Magic } from "magic-sdk";
import { Button, Input, Spacer, Text } from "@nextui-org/react";
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const [magic, setMagicLink] = useState('');
  const router = useRouter();
  const loginwithMagicLink = async() => {
    try {
      var did = await new Magic('pk_live_67D8641A6E69A608');
      setMagicLink(did);
      await did.auth.loginWithMagicLink({ email: email });
      if(did.auth){
        router.push('/about');
      }else{
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
            router.push('/about');
        }else{
          console.log("not Loggged in");
        }
      }
    }
    catch (e) {
      console.log(e);
      console.log("Something went wrong, Try Again");
    }
  };

  return (
    <div className={styles.container}>
        <main className={styles.main}>
          <Text h1>Welcome to Third Society</Text>
          <Spacer y={2.5} />
          <Input clearable bordered labelPlaceholder="Email*" initialValue="" onChange={e => setEmail(e.target.value)} onClearClick={() => setEmail(' ')}/>
          <Spacer y={2.5} />
          <Button auto color="gradient" rounded bordered onPress={() => loginwithMagicLink()}>
            Login
          </Button>
          <Spacer y={1.5} />
          <Link href="/about" >
              <a>
              <Button auto color="gradient" rounded bordered >
                  Test Go to Dashboard
              </Button>
              </a>
          </Link>
        </main>
    </div>
  )
}
