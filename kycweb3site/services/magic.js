import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'
import React, { useState } from 'react';

export default function Login() {
  const [MagicObject, setMagicObject] = useState('');
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { elements } = event.target
  
    // the Magic code
    var did = await new Magic('pk_live_67D8641A6E69A608');
    setMagicObject(did);
    did.auth.loginWithMagicLink({ email: elements.email.value });
  
    // Once we have the token from magic,
    // update our own database
    // const authRequest = await fetch()
  
    // if (authRequest.ok) {
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      // router.push('/dashboard')
    // } else { /* handle errors */ }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input name='email' type='email' />
      <button>Log in</button>
    </form>
  )
}


// import { Magic } from 'magic-sdk';
// import React, { useState } from 'react';

// export const checkUser = async (cb) => {
//   const isLoggedIn = await magicobj.user.isLoggedIn();
//   if (isLoggedIn) {
//     const user = await magicobj.user.getMetadata();
//     return cb({ isLoggedIn: true, email: user.email });
//   }
//   return cb({ isLoggedIn: false });
// };

// export const loginUser = async (email) => {
//   const did = await new Magic('pk_live_67D8641A6E69A608');
//   console.log(did);
//   await did.auth.loginWithMagicLink({ email });
//   return did;
// };

// export const logoutUser = async () => {
//   await magicobj.user.logout();
// };