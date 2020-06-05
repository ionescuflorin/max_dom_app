// ---- 1.SELECTING ELEMENTS ----
const addMovieModal = document.getElementById('add-modal')
// const addMovieModal = document.querySelector('#add-modal')
// const addMovieModal = document.body.children[1]
const startMovieButton = document.querySelector('header button')
// const startMovieButton = document.querySelector('header').lastElementChild
const backdrop = document.getElementById('backdrop')
// const backdrop = document.body.firstElementChild
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive')



// ---- 2.ADDING EVENT LISTENERS ----

// 2.3. utilities, used for reusability purpose
const toggleBackdrop = () => {
    backdrop.classList.toggle('visible')
}

// 2.2. functions that goes directly into the event listeners
const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible')
    toggleBackdrop();
};
const backtodropClickHandler = () => {
    toggleMovieModal()
}
const cancelAddMovie = () => {
    toggleMovieModal()
}


// 2.1. register event listeners
startMovieButton.addEventListener('click', toggleMovieModal)
backdrop.addEventListener('click', backtodropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovie)