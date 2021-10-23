const PROBLEM_SET = [
    [
        0,
        0,
        0,
        0,
        0,
        0,
        6,
        0,
        0,
        0,
        3,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        9,
        0,
        0,
        0,
        0,
        5,
        0,
        0,
        0,
        2,
        0,
        0,
        3,
        1,
        0,
        0,
        0,
        0,
        1,
        4,
        0,
        6,
        7,
        8,
        0,
        0,
        0,
        7,
        8,
        6,
        5,
        2,
        9,
        0,
        3,
        4,
        5,
        6,
        7,
        0,
        9,
        3,
        0,
        0,
        1,
        8,
        9,
        1,
        4,
        5,
        6,
        3,
        7,
        2,
        0,
        2,
        4,
        0,
        8,
        7,
        5,
        0,
        9, 
    ],
    [
        1,
        0,
        0,
        0,
        0,
        8,
        0,
        4,
        0,
        0,
        0,
        8,
        0,
        0,
        9,
        0,
        6,
        0,
        0,
        4,
        5,
        0,
        0,
        2,
        8,
        0,
        0,
        8,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        7,
        0,
        0,
        9,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        7,
        0,
        0,
        7,
        5,
        0,
        0,
        6,
        2,
        0,
        0,
        5,
        0,
        6,
        0,
        0,
        7,
        0,
        0,
        0,
        2,
        0,
        3,
        0,
        0,
        0,
        0,
        9, 
    ],
    [
        9,
        0,
        0,
        7,
        6,
        0,
        0,
        5,
        0,
        0,
        0,
        6,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        9,
        0,
        0,
        0,
        0,
        4,
        0,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        5,
        0,
        0,
        0,
        0,
        8,
        0,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        6,
        3,
        0,
        0,
        0,
        4,
        0,
        0,
        3,
        1,
        0,
        0,
        8, 
    ],
    [
        0,
        8,
        0,
        0,
        0,
        6,
        5,
        0,
        0,
        0,
        0,
        9,
        0,
        0,
        7,
        0,
        0,
        3,
        5,
        0,
        0,
        3,
        0,
        2,
        0,
        6,
        0,
        0,
        4,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        5,
        0,
        0,
        7,
        0,
        8,
        0,
        3,
        0,
        0,
        4,
        6,
        0,
        0,
        1,
        0,
        0,
        2,
        0,
        0,
        0,
        0,
        3,
        4,
        0,
        0,
        0,
        7,
        0, 
    ]
];
let n = 0;
const isValid = (result, p, v)=>{
    let y = Math.floor(p / 9);
    let x = p % 9;
    for(let i = 0; i < 9; i++){
        if (result[9 * i + x] === v || result[9 * y + i] === v) {
            return false;
        }
    }
    let block_y = Math.floor(y / 3);
    let block_x = Math.floor(x / 3);
    for(let i1 = 0; i1 < 3; i1++){
        for(let j = 0; j < 3; j++){
            if (result[9 * (3 * block_y + i1) + (3 * block_x + j)] === v) {
                return false;
            }
        }
    }
    return true;
};
function solveJs(problem) {
    let result = new Array(81);
    result.fill(0);
    let stack = [];
    for(let i = 0; i < 81; i++){
        if (problem[i] > 0) {
            result[i] = problem[i];
        } else if (stack.length === 0) {
            stack.push([
                false,
                i,
                1
            ]);
        }
    }
    let is_failing = false;
    while(stack.length > 0){
        n++;
        let t = stack.pop();
        let is_back = t[0];
        let p = t[1];
        let v = t[2];
        if (is_back && is_failing) {
            result[p] = 0;
            if (v < 9) {
                stack.push([
                    false,
                    p,
                    v + 1
                ]);
            }
            continue;
        }
        if (!isValid(result, p, v)) {
            if (v < 9) {
                stack.push([
                    false,
                    p,
                    v + 1
                ]);
            } else {
                is_failing = true;
            }
            continue;
        }
        is_failing = false;
        result[p] = v;
        stack.push([
            true,
            p,
            v
        ]);
        let is_updated = false;
        for(let i = p + 1; i < 81; i++){
            if (result[i] === 0) {
                stack.push([
                    false,
                    i,
                    1
                ]);
                is_updated = true;
                break;
            }
        }
        if (!is_updated) {
            break;
        }
    }
    console.log(`n: ${n}`);
    n = 0;
    return result;
}
function displayNumberPlace(np) {
    for(let i = 0; i < 9; i++){
        console.log(np.slice(i * 9, i * 9 + 9).join('|'));
    }
}
const importMeta = {
    url: "file:///Users/hirasawa.yuki/workspace/js/deno_wasm_sample/pkg_web/number_place.js",
    main: false
};
let wasm;
let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}
let WASM_VECTOR_LEN = 0;
function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
function solve(problem) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        var ptr0 = passArray8ToWasm0(problem, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.solve(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v1;
    } finally{
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                } else {
                    throw e;
                }
            }
        }
        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);
        if (instance instanceof WebAssembly.Instance) {
            return {
                instance,
                module
            };
        } else {
            return instance;
        }
    }
}
async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('number_place_bg.wasm', importMeta.url);
    }
    const imports = {
    };
    if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
        input = fetch(input);
    }
    const { instance , module  } = await load(await input, imports);
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    return wasm;
}
async function run() {
    const file = await fetch('./pkg_web/number_place_bg.wasm');
    await init(file);
    for(let p in PROBLEM_SET){
        let problem = PROBLEM_SET[p];
        console.log("============== problem ============");
        displayNumberPlace(problem);
        console.log("============== result js ============");
        const startTime = Date.now();
        let result = solveJs(problem);
        const endTime = Date.now();
        displayNumberPlace(result);
        console.log(`solve time: ${endTime - startTime}[ms]`);
        console.log("============== result wasm ============");
        const startTimeWasm = Date.now();
        let resultWasm = await solve(problem);
        const endTimeWasm = Date.now();
        displayNumberPlace(resultWasm);
        console.log(`solve time: ${endTimeWasm - startTimeWasm}[ms]`);
    }
}
run();
