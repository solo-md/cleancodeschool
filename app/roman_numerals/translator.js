const logger = require("../logger/winston.js")

/**
 * Roman numerals to arabic numerals dictionary.
 * {@link https://en.wikipedia.org/wiki/Roman_numerals}
 */
const dictionary = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
}

module.exports = {
  /**
   * Translates a number in roman numerals into a number in arab numerals.
   *
   * @param {String} romanNumeralNumber A roman numeral number
   * @returns {Number} Arabic numeral number that corresponds to the
   *                   provided roman numeral number
   */
  fromRomanToArabic: (romanNumeralNumber) => {
    if (!romanNumeralNumber) {
      throw new Error("Unexpected parameters! Please use roman numeral.")
    }

    let result = 0

    const reversedRomanNumerals = romanNumeralNumber
      .toUpperCase()
      .split("")
      .reverse()

    const validRomanNumeralDigits = Object.keys(dictionary)
    reversedRomanNumerals.forEach(romanNumeralDigit => {
      if (!validRomanNumeralDigits.includes(romanNumeralDigit)) {
        throw new Error(`Invalid roman numeral digit: ${romanNumeralDigit}`)
      }
    })

    reversedRomanNumerals.forEach((romanNumeral, idx, arr) => {
      const arabicNumeral = dictionary[romanNumeral]
      if (idx > 0 && arabicNumeral < dictionary[arr[idx - 1]]) {
        result -= arabicNumeral
      } else {
        result += arabicNumeral
      }
    })

    logger.debug(`[Roman] ${romanNumeralNumber} === ${result} [Arabic]\n`)

    return result
  }
}
