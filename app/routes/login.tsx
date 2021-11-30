import {
  ActionFunction,
  createCookie,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate
} from 'remix'
import { Layout } from '../root'
import * as React from 'react'
import {getViewerClientSide, logUserInClient, logUserInServer } from '../lib/api/fetch'
import { getPreviewRedirectUrl, previewUrlParams } from '../lib/utils/loaderHelpers'
import { FormEvent, FormEventHandler, useState } from 'react'
import { isEmpty } from 'lodash'

export let loader: LoaderFunction = async ({request}) => {
  const {id, previewType, url} = previewUrlParams(request)

  return {
    params: {
      id,
      previewType,
      url
    }
  }
}

// redo TYPES HERE for PROMiSE
// export let action: ActionFunction = async ({request}): Promise<any> => {
//   let form = await request.formData();
//   let password = form.get('password')
//   let username = form.get('username')
//   // we do this type check to be extra sure and to make TypeScript happy
//   // we'll explore validation next!
//   if (
//     typeof password !== "string" ||
//     typeof username !== "string"
//   ) {
//     return { formError: `Form not submitted correctly.` };
//   }
//
//   let fields = { password, username };
//   let fieldErrors = {};
//
//   if(password.length < 4){
//     fieldErrors = {
//       password: `Password length too small`
//     };
//     return { fieldErrors, fields };
//   }
//
//   try{
//
//     const response = await logUserInServer({username, password})
//     const serverRes = await response.json()
//
//     if(serverRes.errors){
//         let errorMessages = serverRes.errors.map((error: any) => error.message)
//
//         fieldErrors = {
//           username: errorMessages.indexOf('invalid_username') > -1 ?  `Incorrect Username` : undefined,
//           password: errorMessages.indexOf('incorrect_password') > -1 ?  `Incorrect Password` : undefined
//         };
//     }
//
//     if (Object.values(fieldErrors).some(Boolean))
//       return { fieldErrors, fields };
//
//     let testCookie = createCookie("cookie-name", {
//       // all of these are optional defaults that can be overridden at runtime
//       domain: "localhost",
//       // expires: new Date(Date.now() + 60),
//       httpOnly: true,
//       maxAge: 60 * 60 * 24 * 7,
//       path: "/",
//       sameSite: "lax",
//       secrets: ["s3cret1"],
//       secure: true
//     });
//     const wpCookies = response.headers.get('Set-Cookie') // Has 3 cookies in it
//     const parsed = wpCookies?.split(',')
//     const customHeaders = new Headers()
//     parsed?.forEach((item, index) => {
//       if(item.length === 0){
//         return
//       }
//       customHeaders.append('Set-Cookie', item.trim() )
//     })
//
//     customHeaders.append('Set-Cookie', await testCookie.serialize(''))
//     const {id, previewType} = previewUrlParams(request)
//     const idString = previewType === 'post' ? 'previewPostId' : 'postId'
//     const previewUrl = `/preview?postType=${previewType}&${idString}=${id}`
//
//     return redirect(previewUrl,{
//       headers:customHeaders
//     })
//   }catch (e){
//     return { formError: `Form error: ${e}` };
//   }
// }

const Login = () => {
  let navigate = useNavigate();
  let data = useLoaderData()

  const [ loginFields, setLoginFields ] = useState( {
    username: '',
    password: '',
  } );
  const [ errorMessage, setErrorMessage ] = useState<{
    formError: null | string,
    username: null | string,
    password: null | string
  }>( {
    formError: null,
    username: null,
    password: null
  } );
  const { username, password } = loginFields;

  const handleOnChange = ( event: any) => {
    setLoginFields( { ...loginFields, [event?.target?.name]: event.target.value } );
  };
  async function handleSubmit(event: FormEvent){
    event.preventDefault()
    const login = await logUserInClient({username: username, password: password})
    const res = await login.json()

    // handle errors
    if(res.errors){
       switch (res.errors[0].message){
         case 'invalid_username':
           setErrorMessage({
             ...errorMessage,
             username: 'Invalid UserName'
           })
           return
         case 'incorrect_password':
           setErrorMessage({
             ...errorMessage,
             password: 'Invalid Password'
           })
           return
         default:
           console.error(res.errors)
       }

      return
    }

    if(data.params){
      console.log('no')

      // navigate('http://localhost:3000/preview?postType=post&previewPostId=8678')
      // navigate(getPreviewRedirectUrl(data.params?.previewType, data.params?.id))
      // window.location = `http://localhost:3000${getPreviewRedirectUrl(data.params?.previewType, data.params?.id)}`
      // window.location = `http://localhost:3000/preview?postType=post&previewPostId=8678`
      return
    }
    navigate('/api/wpLogin')
  }

  return (
    <Layout>
      <div className="login-form bg-gray-100 rounded-lg p-8 md:ml-auto mt-10 md:mt-12 w-5/12 m-auto">
        <h4 className="text-gray-900 text-lg font-medium title-font mb-5 block">Login</h4>
        {! isEmpty( errorMessage.formError ) && (
          <div
            className="text-red-600"
            dangerouslySetInnerHTML={{ __html: errorMessage.formError || '' }}
          />
        )}
        <form onSubmit={handleSubmit} className="mb-4" aria-describedby={
          errorMessage.username || errorMessage.password
            ? "form-error-message"
            : undefined
        }>
          <div>
            <label className="leading-7 text-sm text-gray-600" htmlFor="username-input">Username</label>
            <input
              className="mb-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              type="text"
              id="username-input"
              name="username"
              onChange={handleOnChange}
              defaultValue={username}
              aria-invalid={Boolean(
                errorMessage.username
              )}
              aria-describedby={
                errorMessage.username
                  ? "username-error"
                  : undefined
              }
            />
            {errorMessage.username ? (
              <p
                className="form-validation-error text-red-500"
                role="alert"
                id="username-error"
              >
                {errorMessage.username}
              </p>
            ) : null}
          </div>
          <div>
          <label htmlFor="password-input" className="leading-7 text-sm text-gray-600">
            Password:
          </label>
            <input
              id="password-input"
              type="password"
              className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="password"
              onChange={handleOnChange}
              aria-invalid={
                Boolean(
                  errorMessage.password
                ) || undefined
              }
              aria-describedby={
                errorMessage.password
                  ? "password-error"
                  : undefined
              }
            />
          {errorMessage.password ? (
            <p
              className="form-validation-error text-red-500"
              role="alert"
              id="password-error"
            >
              {errorMessage.password}
            </p>
          ) : null}
          </div>
          <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Login
          </button>
          {/*{loading ? <p>Loading...</p> : null  }*/}
        </form>
        {/*<button onClick={handleSubmit}>Client Side</button>*/}
        {/*<button onClick={getUser}>Get User</button>*/}
      </div>
    </Layout>
  )
}

export default Login
