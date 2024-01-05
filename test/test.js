const { decode, encode } = require("../lib/index.js")
const should = require("should");

describe("base62 test", () => {

  it("encode", () => {
    should(encode("4397951453070808")).equal("HF6adcSRa");
  })

  it("decode", () => {
    should(decode("HF6adcSRa")).equal("4397951453070808");
  })
})