type PasswordActionData = {
  formError?: string;
  fieldErrors?: {
    password: string | undefined;
  };
  fields?: {
    password: string;
  };
};
type FetcherData = {
  fieldErrors?: {
    email: string
  }
  formError?: string
  pass: boolean
  user?: IResourceUser
}

type FetcherState =
  | "idle"
  | "submitting"
  | "loading"

type FetcherTypes =
  | "done"
  | "normalLoad"
  | "actionReload"
  | "loaderSubmission"
  | "actionSubmission"
  | "init"
  | "actionRedirect"

interface InputBaseProps {
  type: string
  label?: string
  labelCss?: string
  defaultValue?: string
  id?: string
  name: string
  invalid: boolean | undefined
  required?: boolean
  placeholder?: string
  onChange?: any
  value?: any
  disabled?: boolean
  className?: string
  minLength?: number
  autoComplete?: string
  min?: number
  ref?: (node?: Element | null | undefined) => void
}
type MiniCourseSignUpActionData = {
  formError?: string;
  subscriberError?: string
  fieldErrors?: {
    email: string | undefined;
  };
  fields?: {
    email: string;
  }
  form?: string
};