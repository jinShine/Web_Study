// https://typescript-exercises.github.io/#exercise=1&file=%2Findex.ts

// Object

export type User = {
  name: string;
  age: number;
  occupation: string;
};

export const users: User[] = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  {
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

console.log("Users");
users.forEach(logPerson);
