import {
  Testing
} from './playground'

export function deepExportedFunction(): u8 {
  return 0x24;
}

export function deepCircle(): u8 {
  return Testing.circular;
}
