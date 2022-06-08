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