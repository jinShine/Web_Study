export default function TypescriptUtilityPage() {
  interface IProfile {
    name: string
    age: number,
    school: string,
    hobby?: string
  }

  // 1. Pick 타입
  // 골라서 새로운 타입을 만든다.
  type aaa = Pick<IProfile, "name" | "age">

  // 2. Omit 타입
  // 제외해서 새로운 타입을 만든다.
  type bbb = Omit<IProfile, "school">

  // 3. Partial 타입
  // 전부 옵셔널로 만든다.
  type ccc = Partial<IProfile>

  // 4. Required 타입
  // 전부 필수로 만든다.
  type ddd = Required<IProfile>

  // 5. Recod 타입
  // Union 타입의 키값으로 새로운 타입을 만든다.
  type eee = "철수" | "영희" | "훈이" // Union 타입
  let child: eee
  // child = "123123" // 오로지 철수, 영희, 훈이만 들어갈 수 있다. 이런게 Union 타입

  // <Union, Interface | type>
  type fff = Record<eee, IProfile>


  //////////////////////////////////////////
  //  Type vs Interface 차이
  // 선언한것을 병합할 수 있냐 없냐

  interface IProfile {
    candy: number
  }

  let profile: Partial<IProfile> = {}
  profile.candy

  return ()
}