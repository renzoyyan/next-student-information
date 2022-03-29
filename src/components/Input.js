import { ErrorMessage, Field } from "formik";

const Input = ({ label, placeholder, className, type, name, error }) => {
  return (
    <div className="relative pb-1 mb-1">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <Field
        type={!type ? "text" : type}
        min={type === "number" ? 0 : undefined}
        className={`form-control ${error && "error"} ${className}`}
        placeholder={placeholder}
        name={name}
        id={name}
      />
      <ErrorMessage name={name} component="span" className="error-message" />
    </div>
  );
};

export default Input;
