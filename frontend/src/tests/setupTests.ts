import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder in Jest (Node <18)
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  // @ts-expect-error: Assigning TextDecoder to global for Jest polyfill
  global.TextDecoder = TextDecoder;
}