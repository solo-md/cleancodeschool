const path = require("path")

const { stat } = require("../../app/Line_of_code/csharp_line_counter.js")

describe("Line of code", () => {
  it("should calculate statistics correctly", () => {
    const firstClassPath = path.join(__dirname, "data", "FirstClass.cs")
    expect(stat(firstClassPath))
      .toEqual(jasmine.objectContaining({
        codeLinesCount: 113,
        commentLinesCount: 89,
        whitespaceLinesCount: 21
      }))

    const secondClassPath = path.join(__dirname, "data", "SecondClass.cs")
    expect(stat(secondClassPath)).toEqual(jasmine.objectContaining({
      whitespaceLinesCount: 17,
      commentLinesCount: 22,
      codeLinesCount: 96
    }))
  })

  it("should calculate whitespaces correctly for fancy comments", () => {
    const fancyCommentsPath = path.join(__dirname, "data", "FancyComments.txt")
    expect(stat(fancyCommentsPath)).toEqual(jasmine.objectContaining({
      whitespaceLinesCount: 3
    }))
  })

  it("should calculate comment lines correctly for fancy comments", () => {
    const fancyCommentsPath = path.join(__dirname, "data", "FancyComments.txt")
    expect(stat(fancyCommentsPath)).toEqual(jasmine.objectContaining({
      commentLinesCount: 17
    }))
  })

  it("should calculate code lines correctly for fancy comments", () => {
    const fancyCommentsPath = path.join(__dirname, "data", "FancyComments.txt")
    expect(stat(fancyCommentsPath)).toEqual(jasmine.objectContaining({
      codeLinesCount: 10
    }))
  })

  it("should fail without parameter", () => {
    expect(stat).toThrow()
  })
})
