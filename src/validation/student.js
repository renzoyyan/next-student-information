import * as yup from "yup";

export const studentValidationSchema = yup.object().shape({
  firstName: yup.string().required("This field is requried"),
  lastName: yup.string().required("This field is requried"),
  age: yup
    .string()
    .required("This field is requried")
    .matches(/^[0-9]+$/, "Must be only digits"),
  address: yup.string().required("This field is requried"),
  course: yup.string().required("This field is requried"),
  sex: yup.string().required("This field is requried"),
  mobileNumber: yup
    .string()
    .required("This field is requried")
    .matches(
      /((^(\+)(\d){12}$)|(^\d{11}$))/gm,
      "Please enter a valid mobile number"
    ),
});
