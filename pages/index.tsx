import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<>
			<Head>
				<title>Currency Converter</title>
				<meta name="description" content="Miguel Eraso: Currency Converter" />
				<meta name="description" content="Free Currency Converter" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main + ' ' + inter.className}>

			</main>
		</>
	)
}
