// https://github.com/imteekay/advanced-typescript

// Destructuring Arrays
const medals = ["Gold", "Silver", "Bronze"];

const first = medals[0];
const second = medals[1];
const third = medals[2];

const [gold, silver, bronze] = medals;

// Destructuring Objects
const person = {
  name: "Buzz",
  address: "동대문구",
  phone: "0109999",
};

const pName = person.name;
const pAddress = person.address;
const pPhone = person.phone;

const { name: personName, address: personAddress, phone: personPhone } = person;
