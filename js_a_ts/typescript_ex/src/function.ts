function coordinate(x: number | string, y: number | string): string | number {
  if (typeof x === "string" && typeof y === "string") {
    return x + y;
  } else {
    return Number(x) + Number(y);
  }
}

console.log(coordinate("1", "2"));
console.log(coordinate(1, "2"));
console.log(coordinate("1", 2));

function coordinate2(x: number, y: number): number;
function coordinate2(x: string, y: string): string;
function coordinate2(x: any, y: any): any {
  return x + y;
}

console.log(coordinate2(1, 2));
console.log(coordinate2("1", "2"));
console.log(coordinate2(1, "2"));
console.log(coordinate2("1", 2));

function log(a: string): void;
function log(a: number): void;
function log(a: string | number): void {
  console.log(a);
}

function error(a: string | number) {
  log(a);
}
