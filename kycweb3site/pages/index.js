// pages/index.js

import Link from "next/link"
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import ConfettiButton from '../assets/ConfettiButton'
import { Button, Input, Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import Autocomplete from "react-google-autocomplete";
import writeUserData from "../assets/firebasedb";
import React, { useState } from 'react';

export default function Home() {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [EthAddress, setEthAddress] = useState('');
  const [SolAddress, setSolAddress] = useState('');
  return (
    <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.container}>
            <Head>
              <title>Create Next App</title>
              <meta name="description" content="Generated by Onboard" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
              <Text h1>Third Society</Text>
              <Spacer y={2.5} />
              <Input clearable bordered labelPlaceholder="First Name*" initialValue="" onChange={e => setFirstName(e.target.value)} onClearClick={() => setFirstName('a')}/>
              <Spacer y={2.5} />
              <Input clearable bordered labelPlaceholder="Last Name*" initialValue="" onChange={e => setLastName(e.target.value)} onClearClick={() => setLastName('a')}/>
              <Spacer y={2.5} />
              <Input clearable bordered labelPlaceholder="Eth Address" initialValue="" onChange={e => setEthAddress(e.target.value)}  onClearClick={() => setEthAddress('a')}/>
              <Spacer y={2.5} />
              <Input clearable bordered labelPlaceholder="Sol Address" initialValue="" onChange={e => setSolAddress(e.target.value)}  onClearClick={() => setSolAddress('a')}/>
              <Spacer y={2.5} />
              {/* <Autocomplete
                apiKey={'AIzaSyAV4YCLQQWrimha7sjrAsIwE4uBURElasE'}
                onPlaceSelected={(place) => console.log(place)}
              />
              <Spacer y={2.5}/> */}
              <Link href="/about" >
                <a>
                  <Button auto color="gradient" rounded bordered onClick={() => writeUserData(FirstName,LastName,EthAddress,SolAddress)}>
                    Test Firebase
                  </Button>
                </a>
              </Link>
            </main>
          </div>
        </main>
    </div>
  )
}
