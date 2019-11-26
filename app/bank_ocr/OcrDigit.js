const logger = require("../logger/winston.js")

/**
 * Holds mapping from a number to correspondent OCRable digit in
 * for of an array pattern. The stringified array pattern is the
 * OCRable digit's string representation
 */
const intToOcrDigitMap = {
  0: [
    [" ", "_", " "],
    ["I", " ", "I"],
    ["I", "_", "I"]
  ],
  1: [
    [" ", " ", " "],
    [" ", " ", "I"],
    [" ", " ", "I"]
  ],
  2: [
    [" ", "_", " "],
    [" ", "_", "I"],
    ["I", "_", " "]
  ],
  3: [
    [" ", "_", " "],
    [" ", "_", "I"],
    [" ", "_", "I"]
  ],
  4: [
    [" ", " ", " "],
    ["I", "_", "I"],
    [" ", " ", "I"]
  ],
  5: [
    [" ", "_", " "],
    ["I", "_", " "],
    [" ", "_", "I"]
  ],
  6: [
    [" ", "_", " "],
    ["I", "_", " "],
    ["I", "_", "I"]
  ],
  7: [
    [" ", "_", " "],
    [" ", " ", "I"],
    [" ", " ", "I"]
  ],
  8: [
    [" ", "_", " "],
    ["I", "_", "I"],
    ["I", "_", "I"]
  ],
  9: [
    [" ", "_", " "],
    ["I", "_", "I"],
    [" ", "_", "I"]
  ]
}

/**
 * Holds mapping from number to a string representation of an OCRable digit,
 * and back from the string representation of an OCRable digit to the number.
 */
const ocrDigitMap = {
  ...Object.keys(intToOcrDigitMap).reduce(
    (map, num) => {
      num = parseInt(num) // Object.keys changes type to string
      map[num] = JSON.stringify(intToOcrDigitMap[num])
      return map
    }, {/* initial value */}
  ),
  ...Object.keys(intToOcrDigitMap).reduce(
    (map, num) => {
      num = parseInt(num) // Object.keys changes type to string
      map[JSON.stringify(intToOcrDigitMap[num])] = num
      return map
    }, {/* initial value */}
  )
}

/**
 * Digit class represents an OCRable item.
 */
module.exports = class OcrDigit {
  /**
   * Creates an instance of OcrDigit that corresponds to the pattern array.
   * @param {Array} patternArray Digit pattern represented by an array. The
   *                array is a 3x3 matrix, so it should contain exactly three
   *                elements, each element is an array with exactly three
   *                string elements. String elements can be ""
   *
   * @returns {OcrDigit} Instance of the OcrDigit class
   */
  constructor (patternArray) {
    // remove delimiter prefix from the pattern, if exists
    if (patternArray && patternArray[0] && patternArray[0].length === 4) {
      for (let i = 0; i < patternArray.length; i++) {
        patternArray[i] = patternArray[i].splice(1, 3)
      }
    }

    this.num = ocrDigitMap[JSON.stringify(patternArray)]
    logger.debug(`Found matching pattern for ${this.num}`)
    if (!Number.isInteger(this.num)) {
      logger.debug(`Can't find matching digit for ${JSON.stringify(patternArray)}`)
      throw new Error("Unknown pattern. Can't detect matchting digit.")
    }
  }

  /**
   * @returns {Number} Integer representation
   */
  toInt () {
    return this.num
  }

  /**
   * @returns {Array} Array representation
   */
  toArray () {
    return intToOcrDigitMap[this.num]
  }

  /**
   * @returns {String} String representation
   */
  toString () {
    return ocrDigitMap[this.num]
  }
}
