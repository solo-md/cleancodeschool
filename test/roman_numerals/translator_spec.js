const { fromRomanToArabic } = require("../../app/roman_numerals/translator.js")

describe("Roman numerals", () => {
  it("should correctly translate single numerals", () => {
    expect(fromRomanToArabic("I")).toEqual(1)
    expect(fromRomanToArabic("V")).toEqual(5)
    expect(fromRomanToArabic("X")).toEqual(10)
    expect(fromRomanToArabic("L")).toEqual(50)
    expect(fromRomanToArabic("C")).toEqual(100)
    expect(fromRomanToArabic("D")).toEqual(500)
    expect(fromRomanToArabic("M")).toEqual(1000)
  })

  it("should correctly translate complex numerals", () => {
    expect(fromRomanToArabic("IV")).toEqual(4)
    expect(fromRomanToArabic("IX")).toEqual(9)
    expect(fromRomanToArabic("XL")).toEqual(40)
    expect(fromRomanToArabic("XC")).toEqual(90)
    expect(fromRomanToArabic("DCXLVIII")).toEqual(648)
    expect(fromRomanToArabic("MMDXLIX")).toEqual(2549)
    expect(fromRomanToArabic("MCMXLIV")).toEqual(1944)
    expect(fromRomanToArabic("MCMXCIX")).toEqual(1999)
  })

  it("should fail for empty input", () => {
    expect(fromRomanToArabic).toThrow()
  })

  it("should fail for non-roman digit in an input", () => {
    expect(() => fromRomanToArabic("R")).toThrow()
  })
})
