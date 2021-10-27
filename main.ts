import {PROBLEM_SET, numberPlace, displayNumberPlace} from "./deps.ts";
import { number_place } from "./pkg/number_place.js";

for (let p in PROBLEM_SET) {
  let problem: Uint8Array = PROBLEM_SET[p];
  console.log("============== problem ============")
  displayNumberPlace(problem);
  console.log("============== deno ============")
  const startTime = Date.now();
  let result = numberPlace(problem);
  const endTime = Date.now();

  displayNumberPlace(result);
  console.log(`solve time: ${endTime - startTime}[ms]`);

  console.log("============== wasm ============")
  const startTimeWasm = Date.now();
  let resultWasm = number_place(problem);
  const endTimeWasm = Date.now();
  displayNumberPlace(resultWasm);
  console.log(`solve time: ${endTimeWasm - startTimeWasm}[ms]`);
}
