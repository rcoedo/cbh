const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";

const MAX_PARTITION_KEY_LENGTH = 256;

// Hashes input data
const createHash = (input, algorithm = "sha3-512") => {
  const stringifiedData = typeof input !== "string"
    ? JSON.stringify(input)
    : input;

  return crypto
    .createHash(algorithm)
    .update(stringifiedData)
    .digest("hex");
}

// Composes a list of functions
const pipe = (...fns) => (x) => fns.reduce((y, fn) => fn(y), x);

// Ensures that `input` is a string
const ensureString = (input) => {
  return typeof input !== "string"
    ? JSON.stringify(input)
    : input;
}

// Ensures that `input` has a max length, hashes otherwise
const ensureMaxLength = (maxLength) => (input) => {
  return input.length > maxLength
    ? createHash(input)
    : input;
}

// Parses an event's partition key
const parsePartitionKey = pipe(ensureString, ensureMaxLength(MAX_PARTITION_KEY_LENGTH));

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    return parsePartitionKey(event.partitionKey);
  }

  return createHash(event);
};
