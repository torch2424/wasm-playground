// https://github.com/AssemblyScript/assemblyscript/wiki/Built-in-functions

// Global variable bound to module
let test: u32;

export class Testing {
  static testValue: u8 = 16;
}

// Export a funciton to initialize the module variables
export function init(passedVar: u32): void {
  test = passedVar;
}

// Funny function to just text storing memory
export function storeTest(): u32 {
  // store the value test, with 0 offset from the first word of memory?
  store<u32>(0, test);
  return test + 10;
}

// Funny function to just text loading memory
export function loadTest(): u32 {
  // load the value test, in memory location 1 of the index.
  // 1 in index = 4 bytes. Because, our memory is divided into unsigned 32 bit (4 bytes) integers.
  return load<u32>(4);
}

export function wasmExportsTest(): u8 {
  let exportValue: u8 = 24;
  return 24;
}
