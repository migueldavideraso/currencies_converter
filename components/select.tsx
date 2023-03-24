
import { useEffect, useId, useState } from "react"
import { currenciesValuesGlobalState, currenciesGlobalState } from '@/state/currencies'
import { currenciesValuesInterface } from "@/types/currencies"

interface currenciesInterface {
	code: string,
	name: string
}


export function Select ({onChange }: { onChange: Function}) {

	const [ currencies, setCurrencies ] = useState<Array<currenciesInterface>>([])
	const [ currenciesValues, setCurrenciesValues ] = useState<currenciesValuesInterface>({})
	const listId = useId()

	useEffect(() => {

		currenciesGlobalState.subscribe((state: any) => {

			const currencies = Object.entries(state).map(([ code, name ]) => {
				return { code, name: String(name) }
			})

			setCurrencies(currencies)
		})

		currenciesValuesGlobalState.subscribe((state: any) => {
			setCurrenciesValues(state)
		})
	}, [])


	const handleChange = (event: any) => {

		const currency = event.target.value

		onChange(currenciesValues[currency])
	}

	return (
		<>
			<input type="text" list={listId} onChange={handleChange} />
			<datalist id={listId}>
				{currencies.map(currency => (
					<option key={currency.code} value={currency.code} >{currency.name}</option>
				))}
			</datalist> 
		</>
	)
}
