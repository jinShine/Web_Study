interface Person {
  name: string;
  age: number;
}

const buzz = {} as Person;
buzz.name = "버즈";
buzz.age = 32;

console.log(buzz);
