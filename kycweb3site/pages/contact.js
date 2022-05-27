// pages/contact.js

import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { Button, Input, Spacer, Text } from "@nextui-org/react";
import { GraphQLClient, gql } from "graphql-request";
import CyberConnect, { Env, Blockchain } from "@cyberlab/cyberconnect";
import { twitterAuthorize, twitterVerify } from "@cyberlab/social-verifier";



export default function Contact(){
    const [cyberConnection, setCyberConnection] = useState('');
    const [handle, setHandle] = useState("");
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
    
    const handleMetaMaskConnectClick = async () => {
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

    const handleTwitterClick = async () => {
        // Get the MetaMask wallet address
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
  
        // Check clause for handle
        if (!handle) return;
    
        // Verify the Twitter account
        try {
            await twitterVerify(accounts[0], handle);
            alert(`Success: you've verified ${handle}!`);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleTweetTwitterClick = async () => {
        // Get the MetaMask wallet address
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
  
        // Prompt to enter the Twitter handle
        const handle = prompt("Enter your Twitter handle:");
    
        // Check clause for handle
        if (!handle) return;
    
        // Update the state for handle
        setHandle(handle);
    
        // Generate the signature
        const sig = await twitterAuthorize(window.ethereum, accounts[0], handle);
    
        // The message that the user posts on Twitter
        const message = `Verifying my Web3 identity on @cyberconnecthq: %23LetsCyberConnect %0A ${sig}`;
    
        // Open new window so that the user can post on Twitter
        window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
    };

    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <Text h1>Cyber Connect</Text>
                <Spacer y={1.5} />
                <Button auto color="gradient" rounded bordered onPress={() => handleMetaMaskConnectClick()}>
                    Connect
                </Button>
                <Spacer y={1.5} />
                <Button auto color="gradient" rounded bordered onPress={() => handleFollowClick()}>
                    Follow
                </Button>
                <Spacer y={1.5} />
                <Button auto color="gradient" rounded bordered onPress={() => handleTwitterClick()}>
                    Verify Twitter
                </Button>
                <Spacer y={1.5} />
                <Button auto color="gradient" rounded bordered onPress={() => handleTweetTwitterClick()}>
                    Tweet Twitter
                </Button>
            </main>
        </div>
    )
}