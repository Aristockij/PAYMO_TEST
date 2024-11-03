import { Field, useField } from "formik";
import MaskedInput from "react-text-mask";

import s from "./index.module.scss";

type propsType = {
  name: string;
  label: string;
  mask?: (RegExp | string)[];
  placeholder?: string;
  type?: string;
};

function FormField(props: propsType) {
  const [field, meta] = useField(props);

  return (
    <div
      className={`${s.field__wrap} ${
        meta.touched && meta.error ? s.field__error : ""
      }`}
    >
      <label htmlFor={props.name}>{props.label}</label>
      {props.mask ? (
        <MaskedInput
          {...field}
          placeholder={props.placeholder}
          type={props.type ? props.type : "text"}
          name={props.name}
          id={props.name}
          mask={props.mask}
        />
      ) : (
        <Field
          type={props.type ? props.type : "text"}
          placeholder={props.placeholder}
          name={props.name}
          id={props.name}
        />
      )}
      {meta.touched && meta.error ? (
        <span className={s.error__message}>{meta.error}</span>
      ) : null}
    </div>
  );
}

export default FormField;
