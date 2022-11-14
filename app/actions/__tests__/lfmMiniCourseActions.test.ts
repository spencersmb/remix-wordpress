/**
 * @jest-environment node
 */
import { ckFormIds } from "@App/lib/convertKit/formIds";
import { Request } from "@remix-run/node";
import { lfmMiniCourseSignUpAction } from "../lfmMiniCourseActions";


describe('LFM: utils', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  // REMIX TEST ACTION EXAMPLE
  it('lfmMiniCourseSignUpAction: Action should return status error', async () => {
    let body = new URLSearchParams({
      name: "Sergio",
    });

    let request = new Request("http://localhost:3000/tuesday-makers", {
      method: "POST",
      body,
    });

    // return error because we dont have proper form fields
    const response = await lfmMiniCourseSignUpAction(request);
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.status).toBe(500);
    expect(result.message).toBe('No form type provided');

  })

  it('lfmMiniCourseSignUpAction: Action should return status 200 with correct formID', async () => {
    let formData = new FormData()
    formData.append('email', 'spencer.bigum@gmail.com')
    formData.append('_action', 'test')
    formData.append('_openstatus', 'true')
    formData.append('lastName', '')

    let request = new Request("http://localhost:3000/tuesday-makers", {
      method: "POST",
      body: formData,
    });

    const response = await lfmMiniCourseSignUpAction(request);
    const result = await response.json()
    expect(response.status).toBe(200);
    expect(result.form.test.message).toBe('success')
    expect(result.form.test.formId).toBe(ckFormIds.miniCourse.signUp)

  })

  it('lfmMiniCourseSignUpAction: Action should return form error because the honeypot was filled out', async () => {
    let formData = new FormData()
    formData.append('email', 'spencer.bigum@gmail.com')
    formData.append('_action', 'test')
    formData.append('_openstatus', 'false')
    formData.append('lastName', 'Bigum')

    let request = new Request("http://localhost:3000/tuesday-makers", {
      method: "POST",
      body: formData,
    });

    const response = await lfmMiniCourseSignUpAction(request);
    const result = await response.json()

    expect(response.status).toBe(200);
    expect(result.formError.test.message).toBe('No email provided')
    expect(result.formError.test.formId).toBe('error')

  })

  it('lfmMiniCourseSignUpAction: Action should return status 200 with correct formID for no funnel CK ID', async () => {
    let formData = new FormData()
    formData.append('email', 'spencer.bigum@gmail.com')
    formData.append('_action', 'test')
    formData.append('_openstatus', 'false')
    formData.append('lastName', '')

    let request = new Request("http://localhost:3000/tuesday-makers", {
      method: "POST",
      body: formData,
    });

    const response = await lfmMiniCourseSignUpAction(request);
    const result = await response.json()
    expect(response.status).toBe(200);
    expect(result.form.test.message).toBe('success')
    expect(result.form.test.formId).toBe(ckFormIds.miniCourse.getNotified)

  })
})
  