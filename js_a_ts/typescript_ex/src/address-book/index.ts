interface PhoneNumberDictionary {
  [phone: string]: { num: number };
}

interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}

function fetchContacts(): Promise<Contact[]> {
  const contacts: Contact[] = [
    {
      name: "Tony",
      address: "서울",
      phones: {
        home: { num: 1110000000 },
        office: { num: 22200000001 },
      },
    },
    {
      name: "Buzz",
      address: "울산",
      phones: {
        home: { num: 1110000001 },
        office: { num: 22200000002 },
      },
    },
    {
      name: "Mike",
      address: "인천",
      phones: {
        home: { num: 1110000002 },
        office: { num: 22200000003 },
      },
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(contacts);
    }, 2000);
  });
}

const enum PhoneType {
  Home = "home",
  office = "office",
}

// Address Book Class
class AddressBook {
  private contacts: Contact[] = [];

  constructor() {
    this.fetchData();
  }

  fetchData() {
    fetchContacts().then((res) => (this.contacts = res));
  }

  findContactByName(name: string): Contact[] {
    return this.contacts.filter((contact) => contact.name === name);
  }

  findContactByAddress(address: string): Contact[] {
    return this.contacts.filter((contact) => contact.address === address);
  }

  findContactByPhone(phoneNumber: number, phoneType: PhoneType): Contact[] {
    return this.contacts.filter(
      (contact) => contact.phones[phoneType].num === phoneNumber
    );
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  displayListByName(): string[] {
    return this.contacts.map((contact) => contact.name);
  }

  displayListByAddress(): string[] {
    return this.contacts.map((contact) => contact.address);
  }
}

new AddressBook();
