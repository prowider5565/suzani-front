// import React, { useEffect, useState, useRef } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import FormControl from "../../utils/form-utils/FormControl";
// import { useProcessPayment } from "../../hooks/productsHook";
// import { OrderedForm } from "./OrderedForm";

// const PaymentForm = ({ saleAmount }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const modalRef = useRef(null);

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
//       .required("Enter the full name")
//       .max(100, "The name is too long"),
//     phone_number: Yup.string()
//       .required("Enter the phone number")
//       .matches(/^\+998\d{9}$/, "The phone number is incorrect"),
//     address: Yup.string()
//       .required("Enter the address")
//       .max(200, "The address is too long"),
//     sale_amount: Yup.number()
//       .required("Enter the sales amount")
//       .positive("Enter the amount positively"),
//     region: Yup.string()
//       .required("Enter the area")
//       .max(50, "The domain name is too long"),
//   });

//   const onSubmit = (values, onSubmitProps) => {
//     const token = localStorage.getItem("access");

//     if (token) {
//       const paymentData = {
//         full_name: values.full_name,
//         phone_number: values.phone_number,
//         address: values.address,
//         country: values.country,
//         sale_amount: values.sale_amount,
//         region: values.region,
//       };

//       processPayment(paymentData, {
//         onSuccess: () => {
//           localStorage.removeItem("cart");
//           onSubmitProps.setSubmitting(false);
//           onSubmitProps.resetForm();
//         },
//         onError: (error) => {
//           console.log("Payment failed: ", error);
//           onSubmitProps.setSubmitting(false);
//         },
//       });
//     } else {
//       setIsModalOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
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
//                 label="Full Name"
//                 placeholder="Enter your name"
//               />
//               <FormControl
//                 control="input"
//                 name="phone_number"
//                 label="Phone Number"
//                 placeholder="+998XXXXXXXXX"
//               />
//               <FormControl
//                 control="input"
//                 name="address"
//                 label="Address"
//                 placeholder="Enter your address"
//               />
//               <FormControl
//                 control="input"
//                 name="country"
//                 label="Country"
//                 placeholder="Enter the country"
//               />
//               <FormControl
//                 control="input"
//                 name="sale_amount"
//                 label="Sales amount"
//                 placeholder="Enter the amount"
//                 readOnly={true}
//               />
//               <FormControl
//                 control="input"
//                 name="region"
//                 label="Territory"
//                 placeholder="Enter the area"
//               />

//               <div className="flex justify-end">
//                 <button
//                   disabled={!formik.isValid || formik.isSubmitting}
//                   className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                   type="submit"
//                 >
//                   Purchase
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
//             className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
//           >
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <h2 className="text-lg font-semibold mb-4">Sign up</h2>
//             <OrderedForm />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PaymentForm;




///////////////////////////



// import React, { useEffect, useState, useRef } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import FormControl from "../../utils/form-utils/FormControl";
// import { useProcessPayment } from "../../hooks/productsHook";
// import { OrderedForm } from "./OrderedForm";

// const PaymentForm = ({ saleAmount }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPaymentPending, setIsPaymentPending] = useState(false);
//   const modalRef = useRef(null);

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
//       .required("Enter the full name")
//       .max(100, "The name is too long"),
//     phone_number: Yup.string()
//       .required("Enter the phone number")
//       .matches(/^\+998\d{9}$/, "The phone number is incorrect"),
//     address: Yup.string()
//       .required("Enter the address")
//       .max(200, "The address is too long"),
//     sale_amount: Yup.number()
//       .required("Enter the sales amount")
//       .positive("Enter the amount positively"),
//     region: Yup.string()
//       .required("Enter the area")
//       .max(50, "The domain name is too long"),
//   });

//   const onSubmit = (values, onSubmitProps) => {
//     const token = localStorage.getItem("access");

//     if (token) {
//       const paymentData = {
//         full_name: values.full_name,
//         phone_number: values.phone_number,
//         address: values.address,
//         country: values.country,
//         sale_amount: values.sale_amount,
//         region: values.region,
//       };

//       processPayment(paymentData, {
//         onSuccess: () => {
//           localStorage.removeItem("cart");
//           onSubmitProps.setSubmitting(false);
//           onSubmitProps.resetForm();
//         },
//         onError: (error) => {
//           console.log("Payment failed: ", error);
//           onSubmitProps.setSubmitting(false);
//         },
//       });
//     } else {
//       setIsModalOpen(true);
//     }
//   };

//   const handleOtpVerified = () => {
//     setIsPaymentPending(true);
//   };

//   useEffect(() => {
//     if (isPaymentPending) {
//       const formik = document.querySelector("form");
//       if (formik) {
//         formik.requestSubmit();
//         setIsPaymentPending(false);
//       }
//     }
//   }, [isPaymentPending]);

//   const closeModal = () => {
//     setIsModalOpen(false);
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
//                 label="Full Name"
//                 placeholder="Enter your name"
//               />
//               <FormControl
//                 control="input"
//                 name="phone_number"
//                 label="Phone Number"
//                 placeholder="+998XXXXXXXXX"
//               />
//               <FormControl
//                 control="input"
//                 name="address"
//                 label="Address"
//                 placeholder="Enter your address"
//               />
//               <FormControl
//                 control="input"
//                 name="country"
//                 label="Country"
//                 placeholder="Enter the country"
//               />
//               <FormControl
//                 control="input"
//                 name="sale_amount"
//                 label="Sales amount"
//                 placeholder="Enter the amount"
//                 readOnly={true}
//               />
//               <FormControl
//                 control="input"
//                 name="region"
//                 label="Territory"
//                 placeholder="Enter the area"
//               />

//               <div className="flex justify-end">
//                 <button
//                   disabled={!formik.isValid || formik.isSubmitting}
//                   className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                   type="submit"
//                 >
//                   Purchase
//                 </button>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>

//       {isModalOpen && (
//         <div
//           ref={modalRef}
//           className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
//         >
//           <div className="bg-white p-8 rounded">
//             <OrderedForm onOtpVerified={handleOtpVerified} />
//             <button
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PaymentForm;



import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormControl from "../../utils/form-utils/FormControl";
import { useProcessPayment } from "../../hooks/productsHook";
import { OrderedForm } from "./OrderedForm";

const PaymentForm = ({ saleAmount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const modalRef = useRef(null);

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
    full_name: Yup.string().required("Required").max(100, "Too long"),
    phone_number: Yup.string()
      .required("Required")
      .matches(/^\+998\d{9}$/, "Invalid phone number"),
    address: Yup.string().required("Required").max(200, "Too long"),
    sale_amount: Yup.number()
      .required("Required")
      .positive("Must be a positive number"),
    region: Yup.string().required("Required").max(50, "Too long"),
  });

  const onSubmit = (values, onSubmitProps) => {
    const token = localStorage.getItem("access");

    if (token) {
      const paymentData = {
        full_name: values.full_name,
        phone_number: values.phone_number,
        address: values.address,
        country: values.country,
        sale_amount: values.sale_amount,
        region: values.region,
      };

      processPayment(paymentData, {
        onSuccess: () => {
          localStorage.removeItem("cart");
          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
        },
        onError: (error) => {
          console.log("Payment failed: ", error);
          onSubmitProps.setSubmitting(false);
        },
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleOtpVerified = () => {
    setIsPaymentPending(true);
  };

  useEffect(() => {
    if (isPaymentPending) {
      const formik = document.querySelector("form");
      if (formik) {
        formik.requestSubmit();
        setIsPaymentPending(false);
      }
    }
  }, [isPaymentPending]);

  const closeModal = () => {
    setIsModalOpen(false);
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
            <Form className="p-4">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
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
                readOnly={true}
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
                  className="mt-4 bg-blue-500 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  Purchase
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
          <div className="relative bg-white p-6 rounded shadow-lg max-w-md w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <OrderedForm onOtpVerified={handleOtpVerified} />
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
