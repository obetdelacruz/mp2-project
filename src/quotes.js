export async function fetchQuote() {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    const quoteData = await response.json();
    console.log(quoteData);

    return quoteData;
  } catch (error) {
    throw new Error(error);
  }
}
export default fetchQuote;
