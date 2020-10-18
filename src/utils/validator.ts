import { object, string, InferType } from 'yup';

const loginSchema = object().shape({
  username: string().required('Enter valid username'),
  password: string().required('Enter valid password'),
});

type Login = InferType<typeof loginSchema>;

const validateLoginForm = (formData: Login) => loginSchema.validate(formData, {
  abortEarly: false
});

export default validateLoginForm;
