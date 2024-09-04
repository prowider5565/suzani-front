import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormControl from "../../utils/form-utils/FormControl";
import { useProcessPayment } from "../../hooks/productsHook";

const PaymentForm = ({ saleAmount }) => {
  const { mutate: processPayment } = useProcessPayment();

  const initialValues = {
    full_name: "",
    phone_number: "",
    address: "",
    country: "Uzbekistan",
    sale_amount: saleAmount,
    region: "",
  };

  const validationSchema = Yup.object({
    full_name: Yup.string()
      .required("To'liq ismni kiriting")
      .max(100, "Ism juda uzun"),
    phone_number: Yup.string()
      .required("Telefon raqamini kiriting")
      .matches(/^\+998\d{9}$/, "Telefon raqami noto'g'ri"),
    address: Yup.string()
      .required("Manzilni kiriting")
      .max(200, "Manzil juda uzun"),
    sale_amount: Yup.number()
      .required("Sotuv summasini kiriting")
      .positive("Summani ijobiy kiriting")
      .integer("Butun son kiriting"),
    region: Yup.string()
      .required("Hududni kiriting")
      .max(50, "Hudud nomi juda uzun"),
  });

  const onSubmit = (values, onSubmitProps) => {
    const paymentData = {
      full_name: values.full_name,
      phone_number: values.phone_number,
      address: values.address,
      country: values.country,
      sale_amount: values.sale_amount,
      region: values.region,
    };

    processPayment(paymentData);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {(formik) => {
        useEffect(() => {
          formik.setFieldValue("sale_amount", saleAmount);
        }, [saleAmount]);

        return (
          <Form className="flex flex-col gap-6">
            <FormControl
              control="input"
              name="full_name"
              label="To'liq ism"
              placeholder="Ismingizni kiriting"
            />
            <FormControl
              control="input"
              name="phone_number"
              label="Telefon raqami"
              placeholder="+998XXXXXXXXX"
            />
            <FormControl
              control="input"
              name="address"
              label="Manzil"
              placeholder="Manzilingizni kiriting"
            />
            <FormControl
              control="input"
              name="country"
              label="Mamlakat"
              placeholder="Mamlakatni kiriting"
            />
            <FormControl
              control="input"
              name="sale_amount"
              label="Sotuv summasi"
              placeholder="Summani kiriting"
              disabled={true}
            />
            <FormControl
              control="input"
              name="region"
              label="Hudud"
              placeholder="Hududni kiriting"
            />

            <div className="flex justify-end">
              <button
                disabled={!formik.isValid || formik.isSubmitting}
                className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                Jo'natish
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PaymentForm;

// import React from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import FormControl from "../../utils/form-utils/FormControl";
// import { useProcessPayment } from "../../hooks/productsHook";
// // import { useProcessPayment } from "../../hooks/useProcessPayment";

// const PaymentForm = ({ saleAmount }) => {
//   console.log("sssssssssssssssssvvvvvvvvvvvvvvvvv", saleAmount)
//   // Prop sifatida saleAmount qiymatini qabul qilamiz
//   const { mutate: processPayment } = useProcessPayment();

//   const initialValues = {
//     full_name: "",
//     phone_number: "",
//     address: "",
//     country: "Uzbekistan",
//     sale_amount: saleAmount, // saleAmount ni boshlang'ich qiymat sifatida o'rnatamiz
//     region: "",
//   };

//   const validationSchema = Yup.object({
//     full_name: Yup.string()
//       .required("To'liq ismni kiriting")
//       .max(100, "Ism juda uzun"),
//     phone_number: Yup.string()
//       .required("Telefon raqamini kiriting")
//       .matches(/^\+998\d{9}$/, "Telefon raqami noto'g'ri"),
//     address: Yup.string()
//       .required("Manzilni kiriting")
//       .max(200, "Manzil juda uzun"),
//     sale_amount: Yup.number()
//       .required("Sotuv summasini kiriting")
//       .positive("Summani ijobiy kiriting")
//       .integer("Butun son kiriting"),
//     region: Yup.string()
//       .required("Hududni kiriting")
//       .max(50, "Hudud nomi juda uzun"),
//   });

//   const onSubmit = (values, onSubmitProps) => {
//     const paymentData = {
//       full_name: values.full_name,
//       phone_number: values.phone_number,
//       address: values.address,
//       country: values.country,
//       sale_amount: values.sale_amount, // sale_amount qiymatini values dan olamiz
//       region: values.region,
//     };

//     processPayment(paymentData);
//     onSubmitProps.setSubmitting(false);
//     onSubmitProps.resetForm();
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//       validateOnMount={true}
//     >
//       {(formik) => (
//         <Form className="flex flex-col gap-6">
//           <FormControl
//             control="input"
//             name="full_name"
//             label="To'liq ism"
//             placeholder="Ismingizni kiriting"
//           />
//           <FormControl
//             control="input"
//             name="phone_number"
//             label="Telefon raqami"
//             placeholder="+998XXXXXXXXX"
//           />
//           <FormControl
//             control="input"
//             name="address"
//             label="Manzil"
//             placeholder="Manzilingizni kiriting"
//           />
//           <FormControl
//             control="input"
//             name="country"
//             label="Mamlakat"
//             placeholder="Mamlakatni kiriting"
//           />
//           <FormControl
//             control="input"
//             name="sale_amount"
//             label="Sotuv summasi"
//             placeholder="Summani kiriting"
//             value={saleAmount}
//           />
//           <FormControl
//             control="input"
//             name="region"
//             label="Hudud"
//             placeholder="Hududni kiriting"
//           />

//           <div className="flex justify-end">
//             <button
//               disabled={!formik.isValid || formik.isSubmitting}
//               className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//               type="submit"
//             >
//               Jo'natish
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default PaymentForm;
