const wordDisplay = document.getElementById('word');
const card = document.getElementById('card');
const getWordBtn = document.getElementById('getWordBtn');
const counterDisplay = document.getElementById('counterDisplay');


let counter = 0;

// Function to fetch data from CSV file
async function fetchData() {
  const response = await fetch('words.csv'); // Adjust the file path accordingly
  const data = await response.text();
  return data;
}

// Function to parse CSV data and return an array of objects
function parseCSVData(csvData) {
  const lines = csvData.split('\n');
  const words = [];
  for (let line of lines) {
    const [english, turkish] = line.split(',');
    words.push({ english, turkish });
  }
  return words;
}

let words; // Global variable to store words data

// Function to get a random word from the array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Function to display a random word on the card
function displayRandomWord() {
  const randomWord = getRandomWord();
  wordDisplay.textContent = randomWord.english;
  // Attach Turkish translation to the card's data attribute
  card.dataset.turkish = randomWord.turkish;
  // Flip the card
  card.classList.add('flipped');
  // Increment counter
  counter++;
  updateCounter();
}

// Function to update counter display
function updateCounter() {
  counterDisplay.textContent = `Button Clicked: ${counter} times`;
}

// Event listener for the Get Word button
getWordBtn.addEventListener('click', displayRandomWord);

// Event listener for flipping the card to show the Turkish translation
card.addEventListener('click', function() {
  if (card.classList.contains('flipped')) {
    wordDisplay.textContent = card.dataset.turkish;
    card.classList.remove('flipped');
  }
});

// Fetch data from CSV file and initialize the application
fetchData()
  .then(parseCSVData)
  .then(data => {
    words = data;
    console.log('Words data loaded:', words);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
