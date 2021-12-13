// define sample function to randomly return a item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// define generatePassword function
function generateRandomword(wordLength) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  // create a collection to store things user picked up
  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))
  // start generating password
  let randomword = ''
  for (let i = 0; i < wordLength; i++) {
    randomword += sample(collection)
  }
  // return the generated password
  return randomword
}

// export generatePassword function for other files to use
module.exports = generateRandomword