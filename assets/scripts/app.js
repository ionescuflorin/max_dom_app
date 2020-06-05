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
const entryTextSection = document.getElementById('entry-text')

// ---- 3. FUNCTIONALITY LOGIC ------

// 3.1. declaring state
const movies = [];

const renderNewMovieElement = (title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li')
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

    // selecting the parent element
    const listRoot = document.getElementById('movie-list')
    // insert the newly created element into the parent
    listRoot.append(newMovieElement)
}

const updateUI = () => {
    if(movies.length === 0) {
        entryTextSection.style.display = 'block'
    } else {
        entryTextSection.style.display = 'none'
    }
}

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
  // receive data to be displayed into the screen
  renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
  // should be executed every time we add a movie
  updateUI();
};

// 2.1. register event listeners
startMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backtodropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
