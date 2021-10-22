import {PROBLEM_SET, solve, displayNumberPlace} from "./deps.ts";

for (let p in PROBLEM_SET) {
  let problem = PROBLEM_SET[p];
  console.log("============== problem ============")
  displayNumberPlace(problem);
  const startTime = Date.now();
  console.log("============== result ============")
  let result = solve(problem);
  const endTime = Date.now();

  displayNumberPlace(result);
  console.log(`solve time: ${endTime - startTime}[ms]`);
}
