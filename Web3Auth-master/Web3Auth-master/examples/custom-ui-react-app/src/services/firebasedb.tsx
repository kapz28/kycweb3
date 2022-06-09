import { UserInfo } from "@web3auth/base";
import { getDatabase, ref, set } from "firebase/database";

export const writeUserDiscord = async (email : string, handle : string) => {
    try{
        const db = getDatabase();
        handle = handle.replace("@", "_");
        handle = handle.replace("#", "_");
        console.log(handle);
        console.log("HANDLE");
        set(ref(db, 'discord/' + handle), {
            discord: handle,
            discordverified: true,
            email: email
        });
        console.log("written to firebase");
        return true;
    } catch(e) {
        console.log("firekapbase error");
        console.log(e);
        return false;
    }

};

export const writeUserTwitter = async (email : string,  name : string, dp : string) => {
    try{
        const db = getDatabase();
        set(ref(db, 'twitter/' + name), {
            twittername: name,
            twitteremail: email,
            twitterprofilepic: dp, 
            twitterverified: true
        });
        return true;        
    } catch (e) {
        return false;
    }
};

export const writeUserWallet = async (wallet : string) => {
    try {
        const db = getDatabase();
        set(ref(db, 'wallets/' + wallet), {
            wallet: wallet,
        });
        return true;
    } catch (e) {
        return false;
    }

};


export const writeUserFullProfile = async(wallet : string, discord : Partial<UserInfo> | null, twitter : Partial<UserInfo> | null) => {
    try {
        console.log("WRITE");
        console.log(wallet);
        console.log(discord);
        console.log(twitter);
        if(twitter&&discord&&wallet){
            const db = getDatabase();
            set(ref(db, 'users/' + twitter["name"]), {
                wallet: wallet,
                discordhandle: discord["name"],
                discordemail: discord["email"],
                twitteremail: twitter["email"],
                discordpic: discord["profileImage"],
                twitterpic: twitter["profileImage"],

            });
        }

        return true;
    } catch (e) {
        return false;
    }

};