const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  describe("WHEN given no input", () => {
    it("returns the literal '0'", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
  });

  describe("WHEN an event was received", () => {
    describe("AND the event has a partition key", () => {
      it("returns the event's partition key", () => {
        const partitionKey = "1010";
        const key = deterministicPartitionKey({ partitionKey });

        expect(key).toBe(partitionKey);
      });

      it("stringifies the partition key", () => {
        const key = deterministicPartitionKey({ partitionKey: 10 });

        expect(key).toBe("10");
      })

      it("hashes the partition key when longer than 256 characters", () => {
        const partitionKey = Array.from({ length: 512 }, () => "a").join('');
        const hash = "a5fadb4e3b8fc1f6a4fb6280abbdf656f3c6532bbd557c75e9c5066012a2597aa664d994b78b75b876e9bfecb22cbaf5e642aa4198490af1eea75e45b4d39cf1"
        const key = deterministicPartitionKey({ partitionKey });

        expect(key).toBe(hash);
      })
    }) 

    describe("AND the event has no partition key", () => {
      it("returns the hash for the event", () => {
        const event = { firstField: "firstValue", secondField: "secondValue" };
        const hash = "40b561c56b6f56da8909d4ea0b1e5ad8f9fb339d1fc58da53a776037a5e664c95b077e98b3f91d1d2bb550524fe4feec9df46ba0a8a8a87811c34ef0cc3db65c";
        const key = deterministicPartitionKey(event);

        expect(key).toBe(hash)
      }) 
    });
  });
});
