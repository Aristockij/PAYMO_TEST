import { useEffect } from "react";
import { Formik, Form } from "formik";
import FormField from "../FormField";
import { cardMask, dateMask, cvvMask } from "../../constance/masks";
import { useNavigate } from "react-router-dom";

import "../../helpers/luhnValidation";
import { sha256 } from "js-sha256";

import * as Yup from "yup";
import s from "./index.module.scss";

function RemittanceForm() {
  const PersonName = "Иван К.";
  const PersonTarget = "Экскурсия";

  const navigate = useNavigate();

  const initialValuesForm = {
    card_number: "",
    date_card: "",
    cvv: "",
    sum: "",
    name: "",
    message: "",
  };

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.assign(initialValuesForm, parsedData);
    }
  }, []);

  const FormValidationSchema = Yup.object().shape({
    card_number: Yup.string()
      .required("Введите номер карты")
      .matches(
        /^\d{4} \d{4} \d{4} \d{4}$/,
        "Введите номер карты полностью (16 цифр)"
      )
      .luhn("Неверный номер карты"),

    date_card: Yup.string()
      .matches(/^\d{2}\/\d{2}$/, "Введите срок полностью")
      .required("Введите срок"),

    cvv: Yup.string()
      .required("Введите CVV ")
      .matches(/^\d{3}$/, "Введите CVV полностью"),

    sum: Yup.string()
      .required("Введите сумму")
      .matches(/^\d+$/, "Сумма должна содержать только цифры")
      .min(2, "Введите сумму не менее чем из 2 цифр"),

    name: Yup.string().max(50, "Слишком длинное имя").required("Введите имя"),
    message: Yup.string().max(50, "Слишком длинное сообщение"),
  });

  return (
    <Formik
      initialValues={initialValuesForm}
      validationSchema={FormValidationSchema}
      onSubmit={async (values) => {
        const transaction = "3243243244324";
        const hashSum = sha256
          .create()
          .update(
            `${import.meta.env.VITE_API_KEY}${transaction}100${
              import.meta.env.VITE_SECRET
            }`
          )
          .hex();

        const data = {
          hash_sum: hashSum,
          transaction: transaction,
          description: "описание_платежа",
          api_key: import.meta.env.VITE_API_KEY,
          amount: 100,
          email: "электронная_почта",
          custom_data: {
            values,
          },
        };

        localStorage.setItem("formData", JSON.stringify(data));

        navigate("/result");
      }}
    >
      {({ isSubmitting }) => (
        <Form className={s.form__wrap}>
          <div className={s.form__header}>
            {PersonName} собирает на «{PersonTarget}»{" "}
          </div>

          <FormField name='card_number' label='Номер карты' mask={cardMask} />
          <div className={s.form__cols}>
            <FormField
              name='date_card'
              label='Срок действия'
              placeholder='ММ/ГГ'
              mask={dateMask}
            />
            <FormField name='cvv' type='password' label='CVV' mask={cvvMask} />
          </div>
          <FormField name='sum' label='Сумма перевода' />
          <FormField name='name' label='Ваше имя' />
          <FormField name='message' label='Сообщение получателю' />

          <div className={s.btn__wrap}>
            <button type='submit' className={s.btn} disabled={isSubmitting}>
              Перевести
            </button>
            <button type='button' className={`${s.btn} ${s.btn__light}`}>
              Вернуться
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RemittanceForm;
