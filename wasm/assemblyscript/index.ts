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

export function unsignedIntegerOverflowBug(): u8 {
  let badByte: u8 = 0xFF;
  badByte++;
  return badByte;
}

// Basing unsigned to signed with this:
// https://www.electronics-tutorials.ws/binary/signed-binary-numbers.html
export function unsignedToEqualSizeSignedBug(): i8 {
  // 255 or 1111 1111
  let unsignedByte: u8 = 0xFF;

  // Should be -1 or 1111 1111
  let signedByte: i8 = <i8>unsignedByte;

  return signedByte;
}

export function unsignedToLargerSizeSignedBug(): i16 {
  // 255 or 1111 1111
  let unsignedByte: u8 = 0xFF;

  // Should be -1 or 1000 0000 0111 1111 (I think)
  let signedByte: i16 = <i8>unsignedByte;

  return signedByte;
}
