// pages/about.js

import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { Button, Input, Spacer, Text } from "@nextui-org/react";
import Link from "next/link";
import { writeUserData }from "../assets/firebasedb";
import { useRouter } from 'next/router';


export default function About(){
    const router = useRouter();
    console.log(router);
    console.log("Wapilan");
    const terminalPayload = router.query;
    console.log(terminalPayload);
    console.log("Japilan");
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [EthAddress, setEthAddress] = useState('');
    const [SolAddress, setSolAddress] = useState('');
    return(
        <div className={styles.container}>
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
                    <Button auto color="gradient" rounded bordered onPress={() => writeUserData(FirstName,LastName,EthAddress,SolAddress)}>
                        Test Firebase
                    </Button>
                    <Spacer y={1.0} />
                    <Link href="/" >
                        <a>
                        <Button auto color="gradient" rounded bordered centered>
                            Sign Out
                        </Button>
                        </a>
                    </Link>
                    <Link href="/contact" >
                        <a>
                        <Button auto color="gradient" rounded bordered centered>
                            Go to Graph
                        </Button>
                        </a>
                    </Link>
            </main>
        </div>

    )
}