const confirmBtn = document.querySelector('.confirm-btn')
const continueBtn = document.querySelector('.continue-btn')
const mainForm = document.querySelector('.main-form')
const mainComplete = document.querySelector('.main-complete')

const inputName = document.querySelector('.input-name')
const inputNumber = document.querySelector('.input-number')
const inputMonth = document.querySelector('.input-mm')
const inputYear = document.querySelector('.input-yy')
const inputCvc = document.querySelector('.input-cvc')

const nameDebug = document.querySelector('.name-part__debug')
const numberDebug = document.querySelector('.number-part__debug')
const dateDebug = document.querySelector('.date-part__debug')
const cvcDebug = document.querySelector('.cvc-part__debug')

const cardName = document.querySelector('.card-name')
const nrParts = document.querySelectorAll('.nr-part')
const expireDate = document.querySelector('.valid-date')
const cardCvc = document.querySelector('.card-cvc')

const toggleView = () => {
	mainForm.classList.toggle('main-form-active')
	mainComplete.classList.toggle('main-complete-active')
	resetInputs()
}

//Validating all forms
const validInputs = () => {
	if (checkName() && checkNumber() && checkMonth() && checkYear() && checkCvc()) {
		mainForm.classList.toggle('main-form-active')
		mainComplete.classList.toggle('main-complete-active')
	}
}

//Reset cards and form fields after correct fill
const resetInputs = () => {
	inputName.value = ''
	inputNumber.value = ''
	inputMonth.value = ''
	inputYear.value = ''
	inputCvc.value = ''

	cardName.textContent = 'Jane Applessed'
	nrParts.forEach(part => {
		part.textContent = '0000'
	})
	expireDate.textContent = '00/00'
	cardCvc.textContent = '000'
}

//Update sections - update card details in real-time
const updateName = e => {
	cardName.textContent = e.target.value
}

let month = '00'
let year = '00'

const updateMonth = e => {
	month = e.target.value
	updateDate()
}

const updateYear = e => {
	year = e.target.value
	updateDate()
}

const updateDate = () => {
	expireDate.textContent = month.concat('/', year)
}

const updateCvc = e => {
	let cvc = e.target.value
	cardCvc.textContent = cvc
}

const updateNumber = e => {
	let val = e.target.value
	if (val.length <= 16) {
		val = val.concat('0'.repeat(16 - val.length))
		nrParts[0].textContent = val.slice(0, 4)
		nrParts[1].textContent = val.slice(4, 8)
		nrParts[2].textContent = val.slice(8, 12)
		nrParts[3].textContent = val.slice(12)
	}
}

//Validating RegExp
const checkName = () => {
	let nameReg = /(^[a-z][a-z]*\s[a-z][a-z]*$)|(^[a-z][a-z]*\s[a-z][a-z]*\s[a-z][a-z]*$)/gi
	let emptyCondition = inputName.value.length == 0
	let result = nameReg.test(inputName.value)
	if (emptyCondition) {
		nameDebug.textContent = 'Empty value'
		inputName.classList.add('error-border')
		return false
	} else if (!result) {
		nameDebug.textContent = 'Wrong format, only alphabetical (2 or 3 words)'
		inputName.classList.add('error-border')
		return false
	} else {
		nameDebug.textContent = ''
		inputName.classList.remove('error-border')
		return true
	}
}

const checkNumber = () => {
	let nrReg = /^\d{16}$/
	let emptyCondition = inputNumber.value.length == 0
	let result = nrReg.test(inputNumber.value)
	if (emptyCondition) {
		numberDebug.textContent = 'Empty value'
		inputNumber.classList.add('error-border')
		return false
	} else if (!result) {
		numberDebug.textContent = 'Wrong format. Required 16 numbers'
		inputNumber.classList.add('error-border')
		return false
	} else {
		numberDebug.textContent = ''
		inputNumber.classList.remove('error-border')
		return result
	}
}

const checkMonth = () => {
	let monthReg = /^\d{2}$/
	let emptyCondition = inputMonth.value.length == 0
	let month = parseInt(inputMonth.value)
	let result = monthReg.test(inputMonth.value)
	if (emptyCondition) {
		dateDebug.textContent = 'Empty value'
		inputMonth.classList.add('error-border')
		return false
	} else if (!result) {
		dateDebug.textContent = 'Wrong format. Required 2 numbers'
		inputMonth.classList.add('error-border')
		return false
	} else if (month < 1 || month > 12) {
		dateDebug.textContent = 'Month cannot be lower than 1 or higher than 12'
		inputMonth.classList.add('error-border')
		return false
	} else {
		dateDebug.textContent = ''
		inputMonth.classList.remove('error-border')
		return true
	}
}

const checkYear = () => {
	let yearReg = /^\d{2}$|^\d{4}$/
	let emptyCondition = inputYear.value.length == 0
	let minYear = new Date().getFullYear() % 100
	let year = parseInt(inputYear.value) % 100
	let result = yearReg.test(inputYear.value)
	if (emptyCondition) {
		dateDebug.textContent = 'Empty value'
		inputYear.classList.add('error-border')
		return false
	} else if (!result) {
		dateDebug.textContent = 'Wrong format. Required 2 or 4 numbers'
		inputYear.classList.add('error-border')
		return false
	} else if (year < minYear) {
		dateDebug.textContent = 'Expired year cannot be passed'
		inputYear.classList.add('error-border')
		return false
	} else {
		dateDebug.textContent = ''
		inputYear.classList.remove('error-border')
		return result
	}
}

const checkCvc = () => {
	let cvcReg = /(^[0-9]{3}$)/
	let emptyCondition = inputCvc.value.length == 0
	let result = cvcReg.test(inputCvc.value)
	if (emptyCondition) {
		cvcDebug.textContent = 'Empty value'
		inputCvc.classList.add('error-border')
		return false
	} else if (!result) {
		cvcDebug.textContent = 'Wrong format. Required 3 numbers'
		inputCvc.classList.add('error-border')
		return false
	} else {
		cvcDebug.textContent = ''
		inputCvc.classList.remove('error-border')
		return result
	}
}

confirmBtn.addEventListener('click', validInputs)
continueBtn.addEventListener('click', toggleView)

inputName.addEventListener('input', updateName)
inputNumber.addEventListener('input', updateNumber)
inputMonth.addEventListener('input', updateMonth)
inputYear.addEventListener('input', updateYear)
inputCvc.addEventListener('input', updateCvc)
