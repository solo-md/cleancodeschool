const path = require("path")

const { scan, ERROR_MESSAGE } = require("../../app/bank_ocr/scanner.js")

describe("Bank OCR", () => {
  it("should OCR digits correctly", () => {
    const testOcrFilePath = path.join(__dirname, "data", "TestOcrData.txt")
    const test = scan(testOcrFilePath)

    for (let i = 0; i < test.length; i++) {
      console.log(test[i])
    }

    expect(test).toEqual([
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [ERROR_MESSAGE], // wrong character
      [8, 2, 4, 6, 5],
      [1, 2, 3],
      [ERROR_MESSAGE], // not OCR-able digit
      [ERROR_MESSAGE] // not enough lines in the row
    ])
  })

  it("should fail for empty input", () => {
    expect(scan).toThrow()
  })
})
