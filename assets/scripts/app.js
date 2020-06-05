// ---- 1.SELECTING ELEMENTS ----

const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal')
// const addMovieModal = document.body.children[1]
const startMovieButton = document.querySelector('header button');
// const startMovieButton = document.querySelector('header').lastElementChild
const backdrop = document.getElementById('backdrop');
// const backdrop = document.body.firstElementChild
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
// const userInputs = addMovieModal.getElementsByTagName('input');

// ---- 3. FUNCTIONALITY LOGIC ------

// 3.1. declaring state
const movies = [];

// ---- 2.ADDING EVENT LISTENERS ----

// 2.3. utilities, used for reusability purpose
const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const clearMovieInput = () => {
  for (const userInput of userInputs) {
      userInput.value = '';
  }
}

// 2.2. functions that goes directly into the event listeners
const toggleMovieModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
};
const backtodropClickHandler = () => {
  toggleMovieModal();
};
const cancelAddMovieHandler = () => {
  toggleMovieModal();
  clearMovieInput();
};
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  // basic check
  if (
    titleValue.trim() === '' ||
    imageValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5)');
    return;
  }

  // creating the new movie model
  const newMovie = {
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };
  // push it into the state
  movies.push(newMovie);
  console.log(movies);
  
  // close the modal
  toggleMovieModal();
  // clear inputs
  clearMovieInput();
};

// 2.1. register event listeners
startMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backtodropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
