const logger = require("../logger/winston.js")
const Liner = require("n-readlines")

const OcrDigit = require("./OcrDigit.js")

/**
 * An error message to be displayed instead of a row in case of OCR problem.
 */
const ERROR_MESSAGE = "Fehlerhafte Zeile"

/**
 * Returns an error message OR a unified row, where each OCR digit is a 4x3
 * matrix (3x3 digit, prefixed with a 1x3 delimiter). All the characters are
 * valid. The row is ready for OCR processing.
 * @param {LineByLine} liner Instance of LineByLine class (from n-readlines
 *                            module), that reads a file line by line
 * @returns {Array|String} Row unified matrix (4x3) or error message. In case
 *                        if it's the end of the file, result is 'undefined'.
 */
const getValidUnifiedRow = (liner) => {
  let row = [
    liner.next() || void 0,
    liner.next() || void 0,
    liner.next() || void 0
  ]

  // Detect EOF
  if (!row[0] && !row[1] && !row[2]) return void 0

  // Each valid row must have three lines
  if (!row[0] || !row[1] || !row[2]) {
    return "Not enough lines in the row."
  }

  row = row.map(line => line.toString()
    .toUpperCase() // scanner works with uppercase I
    .replace(/\r|\n/g, "") // get rid of cross-platform EOL
    .split("")) // transform to array for further processing

  // Each line in the row must be of the same length
  if (row[0].length !== row[1].length || row[1].length !== row[2].length) {
    return "Lines of the raw are not of the same length."
  }

  // The valid symbols are " " (space), "_" (underline) and "I" (capital i)
  const VALID_SYMBOLS = [" ", "_", "I"]
  const isRawValid = row.flat()
    .filter((v, idx, arr) => arr.indexOf(v) === idx) // unique symbols
    .reduce((isValid, v) => { // check for invalid symbols in the row
      const res = isValid && VALID_SYMBOLS.includes(v)
      if (!res) logger.debug(`Invalid character: [${v}]`)
      return res
    }, true)
  if (!isRawValid) {
    return "Row contains invalid characters."
  }

  // Unify digits in the row: prepend first digit with a delimiter
  logger.debug("Raw row:")
  for (let i = 0; i < row.length; i++) {
    const fixedLine = row[i]
    fixedLine.splice(0, 0, " ")
    row[i] = fixedLine
    logger.debug(row[i].join(""))
  }

  return row
}

module.exports = {
  /**
   * A message that is displayed for a row that has a validation problem and
   * for some reason can't be OCRed correctly.
   */
  ERROR_MESSAGE,

  /**
   * Scans provided file in order to OCR digits out of it's content.
   *
   * The provided file contains rows of digits, where each row is
   * represented with three lines, and each digit is as wide as
   * three characters. Means, each digit is 3x3 character matrix.
   * Each digit is separated from another in a row with a 3x1 whitespace.
   * The only allowed characters are " ", "I" and "_".
   *
   * Possible digits are (see {@link OcrDigit} class):
   *    _                      _           _
   *   I I -> 0     I -> 1     _I -> 2     _I -> 3    I_I -> 4
   *   I_I          I         I_           _I           I
   *    _           _          _           _           _
   *   I_  -> 5    I_ -> 6      I -> 7    I_I -> 8    I_I -> 9
   *    _I         I_I          I         I_I          _I
   *
   * @param {String} filePath A path to the file to scan
   * @returns {Array} An array of OCRed digits, where the array item
   *                  represents a row. The row-item of the array is an
   *                  array itself, which holds digits from the row
   */
  scan: (filePath) => {
    if (!filePath) {
      throw new Error("Unexpected parameter! Please provide a file path.")
    }

    const result = []

    const liner = new Liner(filePath)

    let row // of OCR digits, contains three lines
    while (row = getValidUnifiedRow(liner)) {
      let lineResult = []
      logger.debug("Start OCR process...")

      try {
        if (typeof row === "string") {
          throw new Error(row)
        }

        while (row[0].length > 0) {
          const patternArray = [
            row[0].splice(0, 4),
            row[1].splice(0, 4),
            row[2].splice(0, 4)
          ]
          const ocrDigit = new OcrDigit(patternArray)

          lineResult.push(ocrDigit.toInt())
        }
      } catch (ex) {
        logger.debug(`Non OCRable line. ${ex.message}`)
        lineResult = [ERROR_MESSAGE]
      }
      logger.debug("\n")

      row = null
      result.push(lineResult)
    }

    return result
  }
}
