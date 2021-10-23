import {PROBLEM_SET, solveJs, displayNumberPlace} from "./deps.ts";
import init, { solve as solveWasm } from './pkg_web/number_place.js';

async function run() {
  const file = await fetch('./pkg_web/number_place_bg.wasm');
  await init(file);

  for (let p in PROBLEM_SET) {
    let problem = PROBLEM_SET[p];
    console.log("============== problem ============")
    displayNumberPlace(problem);
    console.log("============== result js ============")
    const startTime = Date.now();
    let result = solveJs(problem);
    const endTime = Date.now();

    displayNumberPlace(result);
    console.log(`solve time: ${endTime - startTime}[ms]`);

    console.log("============== result wasm ============")
    const startTimeWasm = Date.now();
    let resultWasm = await solveWasm(problem);
    const endTimeWasm = Date.now();
    displayNumberPlace(resultWasm);
    console.log(`solve time: ${endTimeWasm - startTimeWasm}[ms]`);
  }
}

run();
