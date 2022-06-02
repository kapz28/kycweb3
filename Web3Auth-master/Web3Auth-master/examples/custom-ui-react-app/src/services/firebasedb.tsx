import { getDatabase, ref, set } from "firebase/database";

export const writeUserDiscord = async (email : string, handle : string) => {
    try{
        console.log(email);
        console.log(handle);
        const db = getDatabase();
        set(ref(db, 'users/' + email), {
            discord: handle,
            discordverified: true
        });
        console.log("written to firebase");
        return true;
    } catch(e) {
        console.log("firekapbase error");
        console.log(e);
        return false;
    }

};

export const writeUserTwitter = async (email : string, type : string, handle : string, dp : string) => {
    try{
        const db = getDatabase();
        set(ref(db, 'users/' + email), {
            twitter: handle,
            twitterprofilepic: dp, 
            twitterverified: true
        });
        return true;        
    } catch (e) {
        return false;
    }
};

export const writeUserWallet = async (email : string, wallet : string) => {
    try {
        const db = getDatabase();
        set(ref(db, 'users/' + email), {
            wallet: wallet,
        });
        return true;
    } catch (e) {
        return false;
    }

};