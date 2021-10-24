const N = 81;
let n= 0;

const isValid = (result: Uint8Array, p: number, v: number): boolean => {
  let y = Math.floor(p/9);
  let x = p % 9;
  for (let i = 0; i < 9; i++) {
    if (result[9 * i + x] === v || result[9 * y + i] === v) {
      return false;
    }
  }

  let block_y = Math.floor( y / 3);
  let block_x = Math.floor( x / 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (result[9 * (3 * block_y + i) + (3 * block_x + j)] === v) {
        return false;
      }
    }
  }

  return true;
}

export function solveJs(problem: Uint8Array) {
  let result: Uint8Array = new Uint8Array(N);
  result.fill(0);

  let stack: [boolean, number, number][] = [];
  for (let i = 0; i < N; i++) {
    if (problem[i] > 0) {
      result[i] = problem[i];
    } else if (stack.length === 0) {
      stack.push([false, i, 1]);
    }
  }

  let is_failing = false;
  while (stack.length > 0) {
    n++;
    let t: [boolean, number, number] = stack.pop() as [boolean, number, number];
    let is_back: boolean = t[0]
    let p = t[1];
    let v = t[2];
    if (is_back && is_failing) {
      result[p] = 0;
      if (v < 9) {
        stack.push([false, p, v + 1])
      }
      continue;
    }

    if (!isValid(result, p, v)) {
      if (v < 9) {
        stack.push([false, p, v + 1])
      } else {
        is_failing = true;
      }
      continue;
    }

    is_failing = false;
    result[p] = v;

    stack.push([true, p, v]);
    let is_updated = false;

    for (let i = p + 1; i < N; i++) {
      if (result[i] === 0) {
        stack.push([false, i, 1]);
        is_updated = true;
        break;
      }
    }
    if (!is_updated) {
      break;
    }
  }

  console.log(`n: ${n}`)
  n = 0;
  return result;
}

export function displayNumberPlace(np: Uint8Array) {
  for (let i = 0; i < 9; i++) {
    console.log(np.slice(i * 9, i * 9 + 9).join('|'));
  }
}

