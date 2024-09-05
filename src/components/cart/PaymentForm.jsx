// import React, { useEffect, useState, useRef } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import FormControl from "../../utils/form-utils/FormControl";
// import { useProcessPayment } from "../../hooks/productsHook";
// import OrderedForm from "./OrderedForm"; // To'g'ri import qilish

// const PaymentForm = ({ saleAmount }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const modalRef = useRef(null); // Modal uchun referens

//   const { mutate: processPayment } = useProcessPayment();

//   const initialValues = {
//     full_name: "",
//     phone_number: "",
//     address: "",
//     country: "Uzbekistan",
//     sale_amount: saleAmount,
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
//     const token = localStorage.getItem("token"); // LocalStorage'dan tokenni olish

//     if (token) {
//       // Token mavjud bo'lsa, so'rov yuboriladi
//       const paymentData = {
//         full_name: values.full_name,
//         phone_number: values.phone_number,
//         address: values.address,
//         country: values.country,
//         sale_amount: values.sale_amount,
//         region: values.region,
//       };

//       processPayment(paymentData);
//       onSubmitProps.setSubmitting(false);
//       onSubmitProps.resetForm();
//     } else {
//       // Token yo'q bo'lsa, modalni ochish
//       setIsModalOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); // Modalni yopish
//   };

//   return (
//     <>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//         validateOnMount={true}
//       >
//         {(formik) => {
//           useEffect(() => {
//             formik.setFieldValue("sale_amount", saleAmount);
//           }, [saleAmount]);

//           return (
//             <Form className="flex flex-col gap-6">
//               <FormControl
//                 control="input"
//                 name="full_name"
//                 label="To'liq ism"
//                 placeholder="Ismingizni kiriting"
//               />
//               <FormControl
//                 control="input"
//                 name="phone_number"
//                 label="Telefon raqami"
//                 placeholder="+998XXXXXXXXX"
//               />
//               <FormControl
//                 control="input"
//                 name="address"
//                 label="Manzil"
//                 placeholder="Manzilingizni kiriting"
//               />
//               <FormControl
//                 control="input"
//                 name="country"
//                 label="Mamlakat"
//                 placeholder="Mamlakatni kiriting"
//               />
//               <FormControl
//                 control="input"
//                 name="sale_amount"
//                 label="Sotuv summasi"
//                 placeholder="Summani kiriting"
//                 disabled={true}
//               />
//               <FormControl
//                 control="input"
//                 name="region"
//                 label="Hudud"
//                 placeholder="Hududni kiriting"
//               />

//               <div className="flex justify-end">
//                 <button
//                   disabled={!formik.isValid || formik.isSubmitting}
//                   className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                   type="submit"
//                 >
//                   Jo'natish
//                 </button>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
//           <div
//             ref={modalRef}
//             className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transform transition-transform duration-300 ease-in-out scale-100"
//           >
//             <h2 className="text-lg font-semibold mb-4">
//               Buyurtmani Rasmiylashtirish
//             </h2>
//             <OrderedForm />
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
//               >
//                 Yopish
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PaymentForm;

// import React, { useEffect } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import FormControl from "../../utils/form-utils/FormControl";
// import { useProcessPayment } from "../../hooks/productsHook";
// import { OrderedForm } from "./OrderedForm";

// const PaymentForm = ({ saleAmount }) => {
//   const { mutate: processPayment } = useProcessPayment();

//   const initialValues = {
//     full_name: "",
//     phone_number: "",
//     address: "",
//     country: "Uzbekistan",
//     sale_amount: saleAmount,
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
//       sale_amount: values.sale_amount,
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
//       {(formik) => {
//         useEffect(() => {
//           formik.setFieldValue("sale_amount", saleAmount);
//         }, [saleAmount]);

//         return (
//           <div>
//             <Form className="flex flex-col gap-6">
//               <FormControl
//                 control="input"
//                 name="full_name"
//                 label="To'liq ism"
//                 placeholder="Ismingizni kiriting"
//               />
//               <FormControl
//                 control="input"
//                 name="phone_number"
//                 label="Telefon raqami"
//                 placeholder="+998XXXXXXXXX"
//               />
//               <FormControl
//                 control="input"
//                 name="address"
//                 label="Manzil"
//                 placeholder="Manzilingizni kiriting"
//               />
//               <FormControl
//                 control="input"
//                 name="country"
//                 label="Mamlakat"
//                 placeholder="Mamlakatni kiriting"
//               />
//               <FormControl
//                 control="input"
//                 name="sale_amount"
//                 label="Sotuv summasi"
//                 placeholder="Summani kiriting"
//                 disabled={true}
//               />
//               <FormControl
//                 control="input"
//                 name="region"
//                 label="Hudud"
//                 placeholder="Hududni kiriting"
//               />

//               <div className="flex justify-end">
//                 <button
//                   disabled={!formik.isValid || formik.isSubmitting}
//                   className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                   type="submit"
//                 >
//                   Jo'natish
//                 </button>
//               </div>
//             </Form>
//             {/* <OrderedForm /> */}
//           </div>
//         );
//       }}
//     </Formik>
//   );
// };

// export default PaymentForm;



////////////////////////


import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormControl from "../../utils/form-utils/FormControl";
import { useProcessPayment } from "../../hooks/productsHook";
// import OrderedForm from "./OrderedForm"; // OrderedForm to'g'ri import qilinishi kerak
import { OrderedForm } from "./OrderedForm";

const PaymentForm = ({ saleAmount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal ochilish holatini boshqarish
  const modalRef = useRef(null); // Modal uchun referens

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
      .required("Enter the full name")
      .max(100, "The name is too long"),
    phone_number: Yup.string()
      .required("Enter the phone number")
      .matches(/^\+998\d{9}$/, "The phone number is incorrect"),
    address: Yup.string()
      .required("Enter the address")
      .max(200, "The address is too long"),
    sale_amount: Yup.number()
      .required("Enter the sales amount")
      .positive("Enter the amount positively")
      .integer("Enter an integer"),
    region: Yup.string()
      .required("Enter the area")
      .max(50, "The domain name is too long"),
  });

  const onSubmit = (values, onSubmitProps) => {
    const token = localStorage.getItem("access"); // LocalStorage'dan tokenni olish

    if (token) {
      // Token mavjud bo'lsa, so'rov yuborish
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
    } else {
      // Token yo'q bo'lsa, modalni ochish
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modalni yopish
  };

  return (
    <>
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
                label="Full Name"
                placeholder="Enter your name"
              />
              <FormControl
                control="input"
                name="phone_number"
                label="Phone Number"
                placeholder="+998XXXXXXXXX"
              />
              <FormControl
                control="input"
                name="address"
                label="Address"
                placeholder="Enter your address"
              />
              <FormControl
                control="input"
                name="country"
                label="Country"
                placeholder="Enter the country"
              />
              <FormControl
                control="input"
                name="sale_amount"
                label="Sales amount"
                placeholder="Enter the amount"
                disabled={true}
              />
              <FormControl
                control="input"
                name="region"
                label="Territory"
                placeholder="Enter the area"
              />

              <div className="flex justify-end">
                <button
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  Shipping
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transform transition-transform duration-300 ease-in-out scale-100"
          >
            <h2 className="text-lg font-semibold mb-4">Sign up</h2>
            <OrderedForm />
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;