const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

const hideLoadingSpinner = () => {
  if(!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
const getQuote = async () => {
  showLoadingSpinner();
  const proxyUrl = 'https://agile-forest-10138.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //  If Author is blank, add 'Unknown' for the Author
    data.quoteAuthor === '' ? author.innerText = 'Unknown' : author.innerText = data.quoteAuthor;
    // Reduce font size for long quotes
    data.quoteText.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    quoteText.innerText = data.quoteText;
    // Stop Loader, Show Quote
    hideLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const authorText = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authorText}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();