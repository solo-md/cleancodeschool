const { mul } = require("../../app/russian_multiplication/multiplier.js")

describe("Russian multiplication", () => {
  it("should be a commutative operation", () => {
    expect(mul(6, 8)).toEqual(48)
    expect(mul(6, 8)).toEqual(mul(8, 6)) // commutative property
  })

  it("should be able to multiply positive numbers", () => {
    // odd numbers
    expect(mul(3, 3)).toEqual(9)
    expect(mul(1, 999)).toEqual(999)
    expect(mul(13, 3)).toEqual(39)
    expect(mul(3, 7)).toEqual(21)

    // even numbers
    expect(mul(2, 2)).toEqual(4)
    expect(mul(4, 8)).toEqual(32)
    expect(mul(16, 6)).toEqual(96)

    // mixed numbers
    expect(mul(1, 88)).toEqual(88)
    expect(mul(75, 2)).toEqual(150)
    expect(mul(4, 9)).toEqual(36)
  })

  it("should be able to multiply positive big numbers", () => {
    expect(mul(8634, 1653)).toEqual(8634 * 1653)
    expect(mul(1234, 4321)).toEqual(1234 * 4321)
  })

  it("should fail for non-positive input", () => {
    expect(mul).toThrow()
    expect(() => mul(1)).toThrow()
    expect(() => mul(1.2, 1)).toThrow()
    expect(() => mul(1, 2.5)).toThrow()
    expect(() => mul("1", "2")).toThrow()
    expect(() => mul(null, null)).toThrow()
    expect(() => mul(void 0, void 0)).toThrow()
  })
})
