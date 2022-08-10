const confirmBtn = document.querySelector('.confirm-btn')
const continueBtn = document.querySelector('.continue-btn')
const mainForm = document.querySelector('.main-form')
const mainComplete = document.querySelector('.main-complete')

const inputName = document.querySelector('.input-name')
const inputNumber = document.querySelector('.input-number')
const inputMonth = document.querySelector('.input-mm')
const inputYear = document.querySelector('.input-yy')
const inputCvc = document.querySelector('.input-cvc')

const cardName = document.querySelector('.card-name')
const nrParts = document.querySelectorAll('.nr-part')
const expireDate = document.querySelector('.valid-date')
const cardCvc = document.querySelector('.card-cvc')

const toggleView = () => {
	mainForm.classList.toggle('main-form-active')
	mainComplete.classList.toggle('main-complete-active')
	resetInputs()
}

const validInputs = () => {
	if (checkName() && checkNumber() && checkMonth() && checkYear() && checkCvc()) {
		mainForm.classList.toggle('main-form-active')
		mainComplete.classList.toggle('main-complete-active')
	}
}

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

const updateName = e => {
	cardName.textContent = e.target.value
}

const checkName = () => {
	let nameReg = /(^[a-z][a-z]*\s[a-z][a-z]*$)/gi
	return nameReg.test(inputName.value)
}

let month = '00'
let year = '00'

const updateMonth = e => {
	month = e.target.value
	updateDate()
}

const checkMonth = () => {
	let monthReg = /^\d{2}$/
	return monthReg.test(month)
}

const updateYear = e => {
	year = e.target.value
	updateDate()
}

const checkYear = () => {
	let yearReg = /^\d{2,4}$/
	return yearReg.test(year)
}

const updateDate = () => {
	expireDate.textContent = month.concat('/', year)
}

const updateCvc = e => {
	let cvc = e.target.value
	cardCvc.textContent = cvc
}

const checkCvc = () => {
	let cvcReg = /(^[0-9]{3}$)/
	return cvcReg.test(inputCvc.value)
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

const checkNumber = () => {
	let nrReg = /^\d{16}$/
	return nrReg.test(inputNumber.value)
}

confirmBtn.addEventListener('click', validInputs)
continueBtn.addEventListener('click', toggleView)

inputName.addEventListener('input', updateName)
inputNumber.addEventListener('input', updateNumber)
inputMonth.addEventListener('input', updateMonth)
inputYear.addEventListener('input', updateYear)
inputCvc.addEventListener('input', updateCvc)
