// Exports
// * imports/exports not supported on 02/14/18
export {
  init,
  storeTest,
  loadTest
} from './playground';

import {
  wasmExportsTest
} from './playground';

export function wasmImportsTest(): u8 {
  // Declaring a variable, can't return or else assembly script will error
  let newExportValue: u8 = 100 + wasmExportsTest();
  return newExportValue;
}
