import 'whatwg-fetch';
import { createResourceUserSession, getConvertKitUserByID, getConvertKitUserIdByEmail, getConvertKitUserTags, getResourceUser, getResourceUserSession, logoutResourceLibrary, requireResourceLibraryUser } from "../resourceLibrarySession.server";
import { setupServer } from "msw/node"
import { rest } from "msw"
/**
 * @jest-environment node
 */
describe('Utils - ResourceLibrary.Session.server', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = {
      ...OLD_ENV,
      SESSION_SECRET: undefined
    }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  const resourceUser: IResourceUser = {
    id: 1,
    tags: [],
  }


  it('Should Throw if SESSION_SECRET is not set', () => {
    try {
      const testedModule = require('../resourceLibrarySession.server').default;
      createResourceUserSession(resourceUser)
    } catch (e: any) {
      expect(e.message).toBe('SESSION_SECRET must be set')
    }
  })

  it('Should create user Session', async () => {
    try {
      const user = await createResourceUserSession(resourceUser)
      expect(user).toContain('resource_session')
      expect(user).toContain('Max-Age=604800')
      expect(user).toContain('HttpOnly;')
      expect(user).toContain('Secure;')
    } catch (e: any) {
      expect(e.message).toBe(true)
    }
  })

  it('Should get Resource User Session', async () => {
    const url = 'https://localhost:3000'
    const sessionStorage = await createResourceUserSession(resourceUser)

    try {

      const request = new Request(url, {
        headers: {
          cookie: sessionStorage
        }
      })

      const userSession = await getResourceUserSession(request)
      expect(userSession.has('user')).toBe(true)

    } catch (e: any) {
      expect(false).toBe(true)
    }
  })

  it('Should have Resource User Object', async () => {

    const sessionStorage = await createResourceUserSession(resourceUser)
    const url = 'https://localhost:3000'
    try {

      const request = new Request(url, {
        headers: {
          cookie: sessionStorage
        }
      })

      const user = await getResourceUser(request)
      expect(user).toEqual(resourceUser)

    } catch (e: any) {
      expect(e.message).toBe(true)
    }
  })

  it('Resource User token should be null', async () => {
    const url = 'https://localhost:3000'
    try {

      const request = new Request(url)

      const userToken = await getResourceUser(request)

      expect(userToken).toBeNull()

    } catch (e: any) {
      expect(e.message).toBe(true)
    }
  })

  it('Should throw redirect if no user token found', async () => {
    const url = 'https://localhost:3000'
    try {

      const request = new Request(url)

      await requireResourceLibraryUser(request, '/login')

      expect(true).toBe(false)

    } catch (e: any) {
      const headers = new Headers(e.headers)
      expect(headers.get('location')).toBe('/login')
    }
  })

  it('Should not redirect if user token found', async () => {
    const sessionStorage = await createResourceUserSession(resourceUser)
    const url = 'https://localhost:3000'
    try {

      const request = new Request(url, {
        headers: {
          cookie: sessionStorage
        }
      })

      const user = await requireResourceLibraryUser(request, '/login')

      expect(user).toEqual(resourceUser)

    } catch (e: any) {
      expect(e.message).toBe(false)
    }
  })

  it('Should logout by redirecting to /login page', async () => {
    const url = 'https://localhost:3000'
    try {

      const request = new Request(url)
      const response = await logoutResourceLibrary(request)
      const headers = new Headers(response.headers)
      expect(headers.get('location')).toBe('/tuesday-makers/login')

    } catch (e: any) {
      expect(true).toBe(false)
    }
  })
})

/**
 * @jest-environment node
 */
describe('Utils - Fetch Convertkit Requests: ResourceLibrary.Session.server', () => {
  const subscriberResponse: IGetConvertKitUserByID = {
    id: 1,
    email_address: 'spencer.bigum@gmail.com',
    state: 'active',
  }

  const emailRespnse = {
    total_subscribers: 1,
    subscribers: [
      {
        id: 1,
        email_address: 'spencer.bigum@gmail.com',
        state: 'active',
      }
    ]
  }

  const handlers = [
    rest.get('https://api.convertkit.com/v3/subscribers/2/tags', (req, res, ctx) => {

      return res(ctx.status(200), ctx.json({
        tags: [
          {
            "id": 1,
            "name": "House Stark",
            "created_at": "2016-02-28T08:07:00Z"
          },
          {
            "id": 2,
            "name": "House Lannister",
            "created_at": "2016-02-28T08:07:00Z"
          }
        ]
      }))
    }),
    rest.get('https://api.convertkit.com/v3/subscribers/:userId', (req, res, ctx) => {
      // console.log('req.url', req);
      const { userId } = req.params
      // console.log('userId', userId);

      if (userId !== '1') {
        return res(ctx.status(404), ctx.json({ error: `No subscriber found for id: ${userId}` }))
      }
      return res(ctx.status(200), ctx.json({
        subscriber: subscriberResponse
      }))
    }),
    // get user by email
    rest.get('https://api.convertkit.com/v3/subscribers', (req, res, ctx) => {
      const email = req.url.searchParams.get('email_address')

      if (email !== 'spencer.bigum@gmail.com') {
        return res(ctx.status(404), ctx.json({ error: `No subscriber found for email: ${email}` }))
      }
      return res(ctx.status(200), ctx.json(emailRespnse))
    })
  ]

  const server = setupServer(
    // get user by id
    ...handlers
  )

  beforeAll(() => {
    server.listen()
  })

  afterAll((done) => {
    server.close()
    done();
  })

  afterEach(() => {
    server.resetHandlers()
  })

  it('Should return convertKit user', async () => {
    try {
      const user = await getConvertKitUserByID(1)
      expect(user).toEqual(subscriberResponse)

    } catch (e: any) {
      console.log('e', e);
      expect(e).toBe('MSW ConvertKit error')
    }
  })

  it('Should return convertKit userID', async () => {
    try {
      const userId = await getConvertKitUserIdByEmail('spencer.bigum@gmail.com')
      expect(userId).toEqual(1)
    } catch (e: any) {
      expect(e.message).toBe('MSW ConvertKit error')
    }
  })

  it('Should return null when trying to get userID by email', async () => {
    try {
      const userId = await getConvertKitUserIdByEmail('spencer@gmail.com')
      expect(userId).toEqual(null)
    } catch (e: any) {
      expect(e.message).toBe('MSW ConvertKit error')
    }
  })

  it('Should return array of tags for a CK user', async () => {
    try {
      const userId = await getConvertKitUserTags(2)
      expect(userId).toEqual(["House Stark", "House Lannister"])
    } catch (e: any) {
      expect(e.message).toBe('MSW ConvertKit error')
    }
  })
})