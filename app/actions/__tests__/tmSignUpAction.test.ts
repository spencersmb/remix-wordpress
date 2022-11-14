/**
 * @jest-environment node
 */
import { MakersSignupAction } from "../tmSignUpAction.server"


describe('Tuesday Makers Signup Actions', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  it('MakersSignupAction: Action should return status 200 with correct formID', async () => {
    let formData = new FormData()
    let formName = 'default'
    formData.append('email', 'spencer.bigum@gmail.com')
    formData.append('_action', formName)
    formData.append('lastName', '') //HONEYPOT

    let request = new Request("http://localhost:3000/tuesday-makers", {
      method: "POST",
      body: formData,
    });

    const response = await MakersSignupAction(request);
    
    const result = await response.json()
    expect(response.status).toBe(200);
    expect(result.form[formName].message).toBe('success')
    expect(result.form[formName].formId).toBe('default')
  })

  it('MakersSignupAction: Action should return status error', async () => {
    let body = new URLSearchParams({
      name: "Sergio",
    });

    let request = new Request("http://localhost:3000/tuesday-makers", {
      method: "POST",
      body,
    });

    // return error because we dont have proper form fields
    const response = await MakersSignupAction(request);
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.status).toBe(500);
    expect(result.message).toBe('No form type provided');

  })

  it('MakersSignupAction: Action should return form error because the email was not filled out', async () => {
    let formData = new FormData()
    formData.append('email', 'spencer.bigum')
    formData.append('_action', 'test')
    formData.append('lastName', 'Bigum')

    let request = new Request("http://localhost:3000/tuesday-makers", {
      method: "POST",
      body: formData,
    });

    const response = await MakersSignupAction(request);
    const result = await response.json()

    expect(response.status).toBe(200);
    expect(result.formError.test.message).toBe('Email Error')
    expect(result.formError.test.formId).toBe('error')

  })

  it('MakersSignupAction: Action should return form error because honeypot was filled out', async () => {
    let formData = new FormData()
    formData.append('email', 'spencer.bigum@gmail.com')
    formData.append('_action', 'test')
    formData.append('lastName', 'Bigum')

    let request = new Request("http://localhost:3000/tuesday-makers", {
      method: "POST",
      body: formData,
    });

    const response = await MakersSignupAction(request);
    const result = await response.json()

    expect(response.status).toBe(200);
    expect(result.formError.test.message).toBe('No last name provided')
    expect(result.formError.test.formId).toBe('error')

  })
})