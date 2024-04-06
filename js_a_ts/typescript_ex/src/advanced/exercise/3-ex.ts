// The in operator narrowing

export type User = {
  name: string;
  age: number;
  occupation: string;
};

export type Admin = {
  name: string;
  age: number;
  role: string;
};

export type Person = User | Admin;

export const persons: Person[] = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  {
    name: "Jane Doe",
    age: 32,
    role: "Administrator",
  },
  {
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
  {
    name: "Bruce Willis",
    age: 64,
    role: "World saver",
  },
];

export function logPerson(person: Person) {
  let additionalInformation: string;

  if ("occupation" in person) {
    additionalInformation = person.occupation;
  } else {
    additionalInformation = person.role;
  }

  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

persons.forEach(logPerson);
