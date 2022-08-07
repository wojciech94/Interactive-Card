const confirmBtn = document.querySelector('.confirm-btn')
const continueBtn = document.querySelector('.continue-btn')
const mainForm = document.querySelector('.main-form')
const mainComplete = document.querySelector('.main-complete')

const toggleView = () => {
	mainForm.classList.toggle('main-form-active')
	mainComplete.classList.toggle('main-complete-active')
}

confirmBtn.addEventListener('click', toggleView)
continueBtn.addEventListener('click', toggleView)
