import { installGlobals } from "@remix-run/node";
import dotenv from 'dotenv';
installGlobals();

dotenv.config({ path: './.env.test' });

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: jest.fn().mockReturnValue('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'),
  };
});
