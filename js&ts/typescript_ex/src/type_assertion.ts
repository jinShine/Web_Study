interface Person {
  name: string;
  age: number;
}

const buzz = {} as Person;
buzz.name = "버즈";
buzz.age = 32;

console.log(buzz);

type TPerson = {
  name: string;
  age: number;
};

const buzz2 = {} as TPerson;
buzz2.name = "버즈2";
