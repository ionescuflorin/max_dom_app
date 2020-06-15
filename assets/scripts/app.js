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
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

// ---- 3. FUNCTIONALITY LOGIC ------

// 3.1. declaring state
const movies = [];

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible')
}

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const deleteMovieHandler = (movieId) => {
// find the index from the movies array which it will the the random generated id
let movieIndex = 0;
for (const movie of movies) {
  if (movie.id === movieId) {
    break;
  }
  movieIndex++;
}

// remove the movie
movies.splice(movieIndex, 1);
const listRoot = document.getElementById('movie-list');
listRoot.children[movieIndex].remove();
// listRoot.removeChild(listRoot.children[movieIndex])
closeMovieDeletionModal();
updateUI();
}

const startMovieDeleteHandler = (movieId) => {
  deleteMovieModal.classList.add('visible')
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  // make a deep clone 
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

 // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, id)) // will not work
  cancelDeletionButton.removeEventListener('click', deleteMovieHandler)
  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal)
  confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId))

}
const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
        <div class='movie-element__image'>
            <img src="${imageUrl}" alt=${title}/>
        </div>
        <div class='movie-element__info'>
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
  // handling deletion of the movie
  newMovieElement.addEventListener('click', startMovieDeleteHandler.bind(null, id));
  // selecting the parent element
  const listRoot = document.getElementById('movie-list');
  // insert the newly created element into the parent
  listRoot.append(newMovieElement);
};

// ---- 2.ADDING EVENT LISTENERS ----

// 2.3. utilities, used for reusability purpose
const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
}

const clearMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

// 2.2. functions that goes directly into the event listeners
const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};
const backtodropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};
const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
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
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };
  // push it into the state
  movies.push(newMovie);
  console.log(movies);

  // close the modal
  closeMovieModal();
  toggleBackdrop();
  // clear inputs
  clearMovieInput();
  // receive data to be displayed into the screen
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  // should be executed every time we add a movie
  updateUI();
};

// 2.1. register event listeners
startMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backtodropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
