const base62 = require("../index"),
  should = require("should");

describe("base62 test", () => {

  it("encode", () => {
    should(base62.encode("4397951453070808")).equal("HF6adcSRa");
  })

  it("decode", () => {
    should(base62.decode("I0DfXdVUt")).equal("4401509053320873");
  })
})