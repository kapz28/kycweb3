import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, name, email, imageUrl) {
    console.log("HERE");
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

export default writeUserData;