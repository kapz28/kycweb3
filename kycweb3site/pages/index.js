// pages/index.js

import Link from "next/link"
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import ConfettiButton from '../assets/ConfettiButton'
import { Input, Spacer } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import Autocomplete from "react-google-autocomplete";


export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Multi-page website using Next.js
        </h2>
        <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by Onboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
        <Text h1>Welcome to Onboard</Text>
        <Spacer y={2.5} />
        <Input clearable bordered labelPlaceholder="First Name*" initialValue="John" />
        <Spacer y={2.5} />
        <Input clearable bordered labelPlaceholder="Last Name*" initialValue="Smith" />
        <Spacer y={2.5} />
        <Input clearable bordered labelPlaceholder="Eth Address" initialValue="0x277" />
        <Spacer y={2.5} />
        <Input clearable bordered labelPlaceholder="Sol Address" initialValue="0x370" />
        <Spacer y={2.5} />
         {/* <Autocomplete
           apiKey={'AIzaSyAV4YCLQQWrimha7sjrAsIwE4uBURElasE'}
           onPlaceSelected={(place) => console.log(place)}
         />
         <Spacer y={2.5}/> */}
          <Link href="/about" >
            <a>
              <ConfettiButton />
            </a>
         </Link>
       </main>
     </div>

        <div className={styles.grid}>




          {/* <Link href="/about" >
          <a className={styles.card}>
            <h2>About &rarr;</h2>
            </a>
          </Link>

          <Link
            href="/contact"
            
          >
            <a className={styles.card}>
            <h2>Contact &rarr;</h2>
            </a>
          </Link> */}

        </div>
      </main>
    </div>
  )
}



// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by Onboard" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <Text h1>Welcome to Onboard</Text>
//         <Spacer y={2.5} />
//         <Input clearable bordered labelPlaceholder="First Name*" initialValue="John" />
//         <Spacer y={2.5} />
//         <Input clearable bordered labelPlaceholder="Last Name*" initialValue="Smith" />
//         <Spacer y={2.5} />
//         <Input clearable bordered labelPlaceholder="Eth Address" initialValue="0x277" />
//         <Spacer y={2.5} />
//         <Input clearable bordered labelPlaceholder="Sol Address" initialValue="0x370" />
//         <Spacer y={2.5} />
//         {/* <Autocomplete
//           apiKey={'AIzaSyAV4YCLQQWrimha7sjrAsIwE4uBURElasE'}
//           onPlaceSelected={(place) => console.log(place)}
//         />
//         <Spacer y={2.5}/> */}
//         <ConfettiButton />
//       </main>
//     </div>
//   )
// }
