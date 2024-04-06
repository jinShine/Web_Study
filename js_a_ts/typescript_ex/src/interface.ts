interface Company {
  [index: number]: string;
}

// let companies: Company = ["삼성", "LG", "네이버"];
let companies: Company = {
  0: "삼성",
  3: "LG",
};
console.log(companies[3]);

interface SalaryMap {
  [level: string]: number;
}

// 인덱스 시그니처

const salary: SalaryMap = {
  junior: 3000,
  mid: 3600,
  senior: 5000,
};

console.log(salary.junior);
console.log(salary["senior"]);
