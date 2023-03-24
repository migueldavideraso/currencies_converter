

interface dataInterface {
	value: any;
 }


export const createGlobalState = (value: any) => {

	const observers:Array<Function> = []
	const data:dataInterface = { value }

	const notify = () => {
		observers.forEach(observer => observer(data.value))
	}

	return {

		subscribe: (observer: Function) => {
			observers.push(observer)
			observer(data.value)
		},

		set (value: any) {
			data.value = value
		}
	}
}




