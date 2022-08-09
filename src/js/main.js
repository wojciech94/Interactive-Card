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
const validDate = document.querySelector('.valid-date')
const cardCvc = document.querySelector('.card-cvc')

const toggleView = () => {
	mainForm.classList.toggle('main-form-active')
	mainComplete.classList.toggle('main-complete-active')
}

const checkName = e => {
	let name = e.target.value
	cardName.textContent = name
}

let month = '00'
let year = '00'

const checkMonth = e => {
	month = e.target.value
	updateDate()
}

const checkYear = e => {
	year = e.target.value
	updateDate()
}

const updateDate = () => {
	validDate.textContent = month.concat('/', year)
}

const checkCvc = e => {
	let cvc = e.target.value
	cardCvc.textContent = cvc
}

const checkNumber = e => {
	let val = e.target.value
	if (val.length <= 16) {
		val = val.concat('0'.repeat(16 - val.length))
		nrParts[0].textContent = val.slice(0, 4)
		nrParts[1].textContent = val.slice(4, 8)
		nrParts[2].textContent = val.slice(8, 12)
		nrParts[3].textContent = val.slice(12)
	}
}

confirmBtn.addEventListener('click', toggleView)
continueBtn.addEventListener('click', toggleView)

inputName.addEventListener('input', checkName)
inputNumber.addEventListener('input', checkNumber)
inputMonth.addEventListener('input', checkMonth)
inputYear.addEventListener('input', checkYear)
inputCvc.addEventListener('input', checkCvc)
