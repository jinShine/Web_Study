interface IUser {
  id: string;
  name: string;
  nickname: string;
  phone: string;
  address: string;
  age: number;
  email: string;
}

type TProfile = Pick<IUser, "name" | "nickname" | "age">;

const profileObj: TProfile = {
  name: "김승진",
  nickname: "버즈",
  age: 32,
};

console.log(profileObj);

type TName = Omit<TProfile, "nickname" | "age">;

const nameObj: TName = {
  name: "김승진",
};

console.log(nameObj);

type optionalProfile = Partial<TProfile>;

function updateProfile(profile: optionalProfile) {
  // 업데이트 로직...
}

updateProfile({ nickname: "버즈라이트" });
updateProfile({ name: "홍길동", age: 100 });

type TLanguage = "Swift" | "JavaScript" | "TypeScript" | "C" | "C++";

type TFavoriteLanguage = Exclude<TLanguage, "C" | "C++">;

const language: TFavoriteLanguage = "TypeScript";

type TCharactorInfo = {
  skill: string;
  damage: number;
};

type TCharactor = "마법사" | "검사" | "궁수";

type Heros = Record<TCharactor, TCharactorInfo>;

const heros: Heros = {
  마법사: { skill: "파이어볼", damage: 80 },
  검사: { skill: "내려치기", damage: 85 },
  궁수: { skill: "멀티샷", damage: 75 },
};

console.log(heros);
