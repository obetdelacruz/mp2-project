export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
let randomNumber = getRandomInt(0, 1000);

export default getRandomInt;
