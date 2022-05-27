// pages/contact.js

import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { Button, Input, Spacer, Text } from "@nextui-org/react";
import { GraphQLClient, gql } from "graphql-request";
import CyberConnect, { Env, Blockchain } from "@cyberlab/cyberconnect";



export default function Contact(){
    const [cyberConnection, setCyberConnection] = useState('');
    useEffect(() => {
        const cyberConnect = new CyberConnect({
            namespace: "CyberConnect",
            env: Env.PRODUCTION,
            chain: Blockchain.ETH,
            provider: window.ethereum
          });
          console.log(cyberConnect);
        setCyberConnection(cyberConnect);
      }, []);

    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };
    
    const handleOnClick = async () => {
        if (isMetaMaskInstalled()) {
            // Request to connect to MetaMask
            try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            alert(`Connected with: ${accounts[0]}`);
            } catch (error) {
            console.error(error.message);
            }
        } else {
            alert("Please install MetaMask.");
        }
    };

    const handleFollowClick = async () => {
        // Prompt to enter the address
        const address = prompt("Enter the ens/address to follow:");
    
        try {
            console.log("TAPILAN");
            console.log(cyberConnection);
            await cyberConnection.connect(address);
            alert(`Success: you're following ${address}!`);
        } catch (error) {
            console.error(error.message);
            console.log("KAPILAN");
        }
    };

    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <Text h1>Cyber Connect</Text>
                <Spacer y={2.5} />
                <Button auto color="gradient" rounded bordered onPress={() => handleOnClick()}>
                    Connect
                </Button>
                <Spacer y={2.5} />
                <Button auto color="gradient" rounded bordered onPress={() => handleFollowClick()}>
                    Follow
                </Button>
            </main>
        </div>
    )
}