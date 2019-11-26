const logger = require("../logger/winston.js")

module.exports = {
  /**
   * Multiplies two integer numbers using russian multiplication.
   *
   * {@link https://en.wikipedia.org/wiki/Ancient_Egyptian_multiplication}
   * The ancient Egyptians had laid out tables of a great number
   * of powers of two, rather than recalculating them each time.
   * The decomposition of a number thus consists of finding the
   * powers of two which make it up. The Egyptians knew empirically
   * that a given power of two would only appear once in a number.
   * For the decomposition, they proceeded methodically; they would
   * initially find the largest power of two less than or equal to
   * the number in question, subtract it out and repeat until
   * nothing remained. (The Egyptians did not make use of the number
   * zero in mathematics.)
   *
   * To find the largest power of 2 keep doubling your answer
   * starting with number 1, for example:
   *     2 ^ 0 = 1
   *     2 ^ 1 = 2
   *     2 ^ 2 = 4
   *     2 ^ 3 = 8
   *     2 ^ 4 = 16
   *     2 ^ 5 = 32
   *
   * @param {Number} x First factor, must be Integer
   * @param {Number} y Second factor, must be Integer
   * @returns {Number} Result of the multiplication operation
   */
  mul: (x, y) => {
    if (!Number.isInteger(x) || !Number.isInteger(y) || x < 1 || y < 1) {
      throw new Error("Unexpected parameters! Please input space-separated positive integers.")
    }

    let left = Math.min(x, y)
    let right = Math.max(x, y)
    let result = 0

    const loggerData = []

    do {
      result += (left % 2) * right
      loggerData.push({ left, right, result })

      left = Math.floor(left / 2) // discard remainder
      right *= 2
    } while (left >= 1)

    console.table(loggerData) // nice table formatting
    logger.debug(`Russian multiplication: ${x} * ${y} = ${result}`)

    return result
  }
}
