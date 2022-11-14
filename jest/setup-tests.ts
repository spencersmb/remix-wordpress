import { installGlobals } from "@remix-run/node";
import dotenv from 'dotenv';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
installGlobals();

dotenv.config({ path: './.env.test' });

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: jest.fn().mockReturnValue('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'),
  };
});
const windowMock = {
  scrollTo: jest.fn(),
};

Object.assign(global, global, windowMock);

// const mockWindowScrollTo = jest.fn();
//     // mockIntersectionObserver.mockReturnValue({
//     //   observe: () => null,
//     //   unobserve: () => null,
//     //   disconnect: () => null,
//     // });
// window.scrollTo = mockWindowScrollTo;
