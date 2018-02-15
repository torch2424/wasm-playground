// Exports
// * imports/exports not supported on 02/14/18
export {
  init,
  storeTest,
  loadTest
} from './playground';

import {
  wasmExportsTest,
  Testing
} from './playground';

export function wasmImportsAndStaticClassesTest(): u8 {
  // Declaring a variable, can't return or else assembly script will error
  let newExportValue: u8 = 100 + wasmExportsTest();
  newExportValue = Testing.testValue;
  Testing.testValue = newExportValue - 10;
  return Testing.testValue;
}
