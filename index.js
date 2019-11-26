const inquirer = require("inquirer")

const logger = require("./app/logger/winston.js")

const RussianMultiplicator = require("./app/russian_multiplication/multiplier.js")
const RomanNumeralTranslator = require("./app/roman_numerals/translator.js")
const LineOfCodeStatistics = require("./app/line_of_code/csharp_line_counter.js")
const BankOcrScanner = require("./app/bank_ocr/scanner.js")

logger.info(`

=====================================================
 Welcome to Clean Code Development School playground
 Author: Alexei Solodovnicov
=====================================================

`)

/**
 * Set of questions that are listed to a user in order to make the task tests
 * in an easy an interactive manner.
 */
const questions = [
  {
    type: "list",
    name: "task",
    message: "Which task do you want to run?",
    choices: [
      { name: "Russian multiplication", value: "russian_multiplication" },
      { name: "Line of Code", value: "line_of_code" },
      { name: "Roman numericals", value: "roman_numerical" },
      { name: "Bank OCR", value: "bank_ocr" },
      new inquirer.Separator(),
      { name: "Take me out of here, I want to quit", value: "quit" }
    ]
  },
  { // russian_multiplication
    type: "input",
    name: "russianMultiplicationFactors",
    message: "Please specify space-separated two positive integers:",
    when: answers => answers.task === "russian_multiplication"
  },
  { // line_of_code
    type: "input",
    name: "csharpFilePath",
    message: "Please specify absolute path of a file with scharp code:",
    when: answers => answers.task === "line_of_code"
  },
  { // roman_numerical
    type: "input",
    name: "romanNumericalNumber",
    message: "Please specify a valid roman numerical number:",
    when: answers => answers.task === "roman_numerical"
  },
  { // bank_ocr
    type: "input",
    name: "ocrFilePath",
    message: "Please specify absolute path of a file with 'digits':",
    when: answers => answers.task === "bank_ocr"
  }
]

// wrap functionality in async function in order to be able to use async/await
const start = async () => {
  // Next loop is infinite and user can exit it with picking a correspondent
  // menu item in an interactive menu, or by pressing Ctrl+C
  while (true) {
    const answers = await inquirer.prompt(questions)

    if (answers.task === "quit") {
      break // break the infinite loop and exit the program
    }

    try {
      switch (answers.task) {
        case "russian_multiplication":
          const factors = answers.russianMultiplicationFactors.split(" ")
          const x = parseInt(factors[0])
          const y = parseInt(factors[1])
          const result = RussianMultiplicator.mul(x, y)
          logger.info(`Russian multiplication: ${x} * ${y} = ${result}`)
          break

        case "line_of_code":
          const csharpFilePath = answers.csharpFilePath
          const stats = LineOfCodeStatistics.stat(csharpFilePath)
          logger.info(`C# file [${csharpFilePath}] statistics:`)
          logger.info(`  > Source code lines count: ${stats.codeLinesCount}`)
          logger.info(`  > Comment lines count: ${stats.commentLinesCount}`)
          logger.info(`  > Whitespace lines count: ${stats.whitespaceLinesCount}`)
          break

        case "roman_numerical":
          const romanNum = answers.romanNumericalNumber
          const arabicNum = RomanNumeralTranslator.fromRomanToArabic(romanNum)
          logger.info(`[Roman] ${romanNum} === ${arabicNum} [Arabic]`)
          break

        case "bank_ocr":
          const ocrFilePath = answers.ocrFilePath
          const scanResult = BankOcrScanner.scan(ocrFilePath)
          logger.info(`File ${ocrFilePath} OCR result:`)
          for (let i = 0; i < scanResult.length; i++) {
            const row = scanResult[i]
            logger.info(`[Row ${i}] ${row.join ? row.join("") : row}`)
          }
          break

        default:
          throw new Error("Sorry, can't understand which task I should run. " +
            "Please try again...")
      }

      logger.info(`

      Nice! Let's try another round!
      `)
    } catch (ex) {
      logger.error(`Oops! ¯\\_(ツ)_/¯ ${ex.message}`)
    }
    logger.info("\n\n\n")
  }

  logger.info(`
========================================================

 I hope you've enjoyed the results! ¯\\(°_o)/¯ Good bye!

  `)
}

start() // entry point
