import { ErrorMessage, Field } from "formik";

const Select = ({ error, name }) => {
  return (
    <div className="relative pb-1 mb-1">
      <label htmlFor={name} className="label">
        Sex
      </label>
      <Field
        as="select"
        name={name}
        className={`form-control ${error && "error"}`}
        id={name}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Field>
      <ErrorMessage name={name} component="span" className="error-message" />
    </div>
  );
};

export default Select;
