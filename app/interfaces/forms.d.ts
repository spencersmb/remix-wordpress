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
