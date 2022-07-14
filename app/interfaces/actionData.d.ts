interface ContactActionData{
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    name: string | undefined;
    subject: string | undefined;
    body: string | undefined;
  };
  fields?: {
    email: string;
    name: string;
    subject: string;
    body: string;
  }
  form?: string
  sendEmail?:{
    sent: boolean;
    origin: string;
    message: string;
  }
}