import { getConvertKitUserByID as mockedGetConvertKitUserByID, } from "../resourceLibrarySession.server";
/**
 * @jest-environment node
 */
jest.mock("../resourceLibrarySession.server");
describe('Utils - ResourceLibrary.Session Fetch mocks.server', () => {

  it('Should get ConvertKit User by ID', async () => {
    const response: IGetConvertKitUserByID = {
      email_address: "spencer.bigum@gmail.com",
      id: 1,
      state: "active",
    }
    //@ts-ignore
    mockedGetConvertKitUserByID.mockImplementation(() => (response));
    const user = await mockedGetConvertKitUserByID(1)
    if(user){
      expect(user.id).toBe(1)
    }

  })
})