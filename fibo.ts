import { fibo } from "./pkg/number_place.js";

const fiboJs = (n: number): number => {
  if (n <= 1) {
    return n
  }

  return fiboJs(n-1) + fiboJs(n-2)
}

console.log("============== deno ============")
const startTime = Date.now();
let result = fiboJs(40);
const endTime = Date.now();
console.log(result);
console.log(`solve time: ${endTime - startTime}[ms]`);

console.log("============== wasm ============")
const startTimeWasm = Date.now();
let resultWasm = fibo(40);
const endTimeWasm = Date.now();
console.log(resultWasm)
console.log(`solve time: ${endTimeWasm - startTimeWasm}[ms]`);
