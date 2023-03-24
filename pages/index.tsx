

import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Select } from '@/components/select'
import { currenciesInterface, currenciesValuesInterface } from '@/types/currencies'
import { currenciesValuesGlobalState, currenciesGlobalState } from '@/state/currencies'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface homeArgsInterface {
	lastDate: string,
	currencies: currenciesInterface,
	currenciesValues: currenciesValuesInterface,
}


export default function Home({ currencies, lastDate, currenciesValues }: homeArgsInterface) {

	currenciesGlobalState.set(currencies)
	currenciesValuesGlobalState.set(currenciesValues)

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

				<span className="flex" />

				<div className={styles.converter_card}>

					<h2 className="title">
						Currency Converter
					</h2>

					<Content />

					<footer>
						<small>
							Created by <span className="title" >Miguel Eraso</span>
						</small>
					</footer>

				</div>

				<span className="flex" />

			</main>
		</>
	)
}



function Content () {

	const [ fromValue, setFromValue ] = useState(0)
	const [ toValue, setToValue ] = useState(0)
	const [ result, setResult ] = useState('')

	const onChangeFrom = (value: number) => {
		setFromValue(value)
	}

	const onChangeTo = (value: number) => {
		setToValue(value)
	}

	useEffect(() => {

		if (!toValue || !fromValue) {
			return
		}
		
		const result = toValue / fromValue
		const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 15 })
		const formatted = formatter.format(result)

		console.log(result)

		setResult(formatted)

	}, [ toValue, fromValue ])


	return (
		<section className={styles.content}>

			<h4 className="title">From: </h4>

			<Select onChange={onChangeFrom} />

			<h4 className="title">To: </h4>

			<Select onChange={onChangeTo} />

			<h4 className="title">Result: </h4>

			<input type="text" value={result} readOnly />

		</section>
	)
}


export async function getServerSideProps() {

	const currencies = await (
		(await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json'))
		.json()
	)

	const valuesData = await (
		(await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/all.json'))
		.json()
	)

	const lastDate = valuesData.date
	const currenciesValues = valuesData.all

	delete currenciesValues.all

	return {
		props: {
			lastDate,
			currencies,
			currenciesValues,
		}
	}
}


