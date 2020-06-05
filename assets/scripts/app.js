// ---- 1.SELECTING ELEMENTS ----
const addMovieModal = document.getElementById('add-modal')
// const addMovieModal = document.querySelector('#add-modal')
// const addMovieModal = document.body.children[1]

const startMovieButton = document.querySelector('header button')
// const startMovieButton = document.querySelector('header').lastElementChild


// ---- 2.ADDING EVENT LISTENERS ----
const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible')
};

startMovieButton.addEventListener('click', toggleMovieModal)