import { getDatabase, ref, set } from "firebase/database";


export const writeUserData = async (userId, name, email, imageUrl) => {
    console.log("Tapilan");
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture : imageUrl
    });
};