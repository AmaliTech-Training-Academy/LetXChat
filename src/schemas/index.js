
import * as yup from 'yup'


const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const basicSchema = yup.object().shape({
    image: yup.mixed().required('This field is required').test('fileFormat', 'Unsupported file format', (value) => {
        if (value) {
          return ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type);
        }
        return true;
      }),
    name: yup.string().required('This field is required'),
    employeeID: yup.string().required('This field is required'),
    username: yup.string().required('This field is required'),
    mail: yup.string().email('Invalid email').required('This field is required'),
    password: yup.string().min(8).matches(passwordRules, {message: 'Please create a stronger password'}).required('This field is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required('This field is required')

})


export const loginSchema = yup.object().shape({
  emailID: yup.string().required('Invalid email or ID. Try again!'),
  password: yup.string().required('Incorrect password. Try again!'),
})