// import { Form, Formik } from 'formik';
// import React, { useState } from 'react';
// import FormControl from '../../utils/form-utils/FormControl';
// import * as Yup from "yup";
// import { OtpVerify, Register } from '../../hooks/productsHook';
// import { getFromLS } from '../../utils/localStorage';
// import { useNavigate } from 'react-router-dom';
// import OtpInput from '../../utils/form-utils/OtpInput';
// import { toast } from 'react-toastify';

// export const OrderedForm = () => {
//     const navigate = useNavigate()
//     const [isSuccessOtp, setisSuccessOtp] = useState(false)
//     const initialValuesObj = {
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         first_name: "",
//         last_name: "",
//         role: "client"

//     };
//     const { mutate:registerM } = Register({ setisSuccessOtp });
//     const { mutate:otpVerify } = OtpVerify({ setisSuccessOtp });

//     const [initialValues, setInitialValues] = useState(initialValuesObj);
//     // validation with Yup
//     const validationSchema = Yup.object({
//         username: Yup.string().required("Ma'lumot kiritilmadi").max(200, "Bunday ism mavjud emas"),
//         email: Yup.string().email("Email xato kiritildi").required("Ma'lumot kiritilmadi").max(200, "Bunday ism mavjud emas"),
//         password: Yup.string().required("Ma'lumot kiritilmadi").max(8, "8 tadan kam belgi kiritishingiz kerak").min(4, "4 tadan ko'p belgi kiritishingiz kerak"),
//         confirmPassword: Yup.string().required("Ma'lumot kiritilmadi").oneOf([Yup.ref("password"), ""], "Parollar mos kelmadi").max(8, "8 tadan kam belgi kiritishingiz kerak").min(4, "4 tadan ko'p belgi kiritishingiz kerak"),
//     });

//     const productOfCart = getFromLS("cart");
//     const onSubmit = (values, onSubmitProps) => {
//       registerM(values, {
//         onError: (error) => {
//           const errorMessage =
//             error.response?.data?.email?.[0] || error.message;
//           toast.error(errorMessage);
//           // Xatolik yuz berganda submitting holatini false ga qaytarish
//           onSubmitProps.setSubmitting(false); // Bu yerda qo'shiladi
//         },
//         onSuccess: () => {
//           toast.success("Ro'yxatdan muvaffaqiyatli o'tildi!");
//           setTimeout(() => {
//             // Faqat muvaffaqiyatli ro'yxatdan o'tganda formani tozalash
//             setInitialValues(initialValuesObj);
//             onSubmitProps.setSubmitting(false);
//             onSubmitProps.resetForm();
//           }, 3000);
//         },
//       });
//     };



//     const [otp, setOtp] = useState('');
//     const handleChange = (enteredOtp) => {
//         setOtp(enteredOtp);
//         console.log(enteredOtp);
//     };

//     return (
//       <>
//         {isSuccessOtp ? (
//           <div className="">
//             <OtpInput
//               value={otp}
//               separator={<span>-</span>}
//               onChange={handleChange}
//               numInputs={6}
//             />
//             {/* <button onClick={()=>otpVerify({otp:otp})} disabled={otp.length < 6} className='bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed'  variant="gradient" color="green">
//                         <span>Jo'natish</span>
//                     </button> */}
//             <button
//               onClick={() => {
//                 otpVerify(
//                   { otp: otp },
//                   {
//                     onSuccess: () => {
//                       // So'rov muvaffaqiyatli bajarilgandan keyin sahifani yangilash
//                       window.location.reload();
//                     },
//                     onError: (error) => {
//                       // Xatolik yuz bersa
//                       console.error("Xatolik yuz berdi:", error);
//                     },
//                   }
//                 );
//               }}
//               disabled={otp.length < 6}
//               className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//               variant="gradient"
//               color="green"
//             >
//               <span>Send</span>
//             </button>
//           </div>
//         ) : (
//           <Formik
//             onSubmit={onSubmit}
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//           >
//             {(formik) => {
//               return (
//                 <Form className="flex flex-col gap-6">
//                   <FormControl
//                     control={"input"}
//                     name={"username"}
//                     label={"Username"}
//                     placeholder={"Enter username"}
//                   />
//                   <FormControl
//                     control={"input"}
//                     name={"email"}
//                     label={"Enter email"}
//                     placeholder={"Enter Email name"}
//                   />
//                   <FormControl
//                     control={"password"}
//                     name={"password"}
//                     label={"Password"}
//                     placeholder={"Enter password"}
//                   />
//                   <FormControl
//                     control={"password"}
//                     name={"confirmPassword"}
//                     label={"Check password"}
//                     placeholder={"Check password"}
//                   />{" "}
//                   <div className="flex justify-end">
//                     <button
//                       disabled={!formik.isValid || formik.isSubmitting}
//                       className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                       type="submit"
//                       variant="gradient"
//                       color="green"
//                     >
//                       <span>Send</span>
//                     </button>
//                   </div>
//                 </Form>
//               );
//             }}
//           </Formik>
//         )}
//       </>
//     );
// };



//////////////////////////////////////////////////

// import { Form, Formik } from "formik";
// import React, { useState } from "react";
// import FormControl from "../../utils/form-utils/FormControl";
// import * as Yup from "yup";
// import { OtpVerify, Register } from "../../hooks/productsHook";
// import { getFromLS } from "../../utils/localStorage";
// import OtpInput from "../../utils/form-utils/OtpInput";
// import { toast } from "react-toastify";

// export const OrderedForm = ({ onOtpVerified }) => {
//   const [isSuccessOtp, setisSuccessOtp] = useState(false);
//   const [otp, setOtp] = useState("");
//   const { mutate: registerM } = Register({ setisSuccessOtp });
//   const { mutate: otpVerify } = OtpVerify({ setisSuccessOtp });

//   const initialValues = {
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     first_name: "",
//     last_name: "",
//     role: "client",
//   };

//   const validationSchema = Yup.object({
//     username: Yup.string().required("Required").max(200, "Too long"),
//     email: Yup.string()
//       .email("Invalid email")
//       .required("Required")
//       .max(200, "Too long"),
//     password: Yup.string()
//       .required("Required")
//       .min(4, "Too short")
//       .max(8, "Too long"),
//     confirmPassword: Yup.string()
//       .required("Required")
//       .oneOf([Yup.ref("password"), ""], "Passwords must match")
//       .min(4, "Too short")
//       .max(8, "Too long"),
//   });

//   const onSubmit = (values, onSubmitProps) => {
//     registerM(values, {
//       onSuccess: () => {
//         toast.success("Registered successfully!");
//         setisSuccessOtp(true);
//         onSubmitProps.setSubmitting(false);
//       },
//       onError: (error) => {
//         const errorMessage = error.response?.data?.email?.[0] || error.message;
//         toast.error(errorMessage);
//         onSubmitProps.setSubmitting(false);
//       },
//     });
//   };

//   const handleOtpChange = (enteredOtp) => {
//     setOtp(enteredOtp);
//   };

//   const handleOtpSubmit = () => {
//     otpVerify(
//       { otp: otp },
//       {
//         onSuccess: () => {
//           toast.success("OTP verified!");
//           onOtpVerified(); // Notify parent component
//         },
//         onError: (error) => {
//           console.error("Error verifying OTP:", error);
//         },
//       }
//     );
//   };

//   return (
//     <>
//       {isSuccessOtp ? (
//         <div>
//           <OtpInput
//             value={otp}
//             separator={<span>-</span>}
//             onChange={handleOtpChange}
//             numInputs={6}
//           />
//           <button
//             onClick={handleOtpSubmit}
//             disabled={otp.length < 6}
//             className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Send OTP
//           </button>
//         </div>
//       ) : (
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           {(formik) => (
//             <Form className="flex flex-col gap-6">
//               <FormControl
//                 control="input"
//                 name="username"
//                 label="Username"
//                 placeholder="Enter username"
//               />
//               <FormControl
//                 control="input"
//                 name="email"
//                 label="Email"
//                 placeholder="Enter email"
//               />
//               <FormControl
//                 control="password"
//                 name="password"
//                 label="Password"
//                 placeholder="Enter password"
//               />
//               <FormControl
//                 control="password"
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 placeholder="Confirm password"
//               />
//               <div className="flex justify-end">
//                 <button
//                   disabled={!formik.isValid || formik.isSubmitting}
//                   className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                   type="submit"
//                 >
//                   Register
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       )}
//     </>
//   );
// };


import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormControl from "../../utils/form-utils/FormControl";
import * as Yup from "yup";
import { OtpVerify, Register } from "../../hooks/productsHook";
import OtpInput from "../../utils/form-utils/OtpInput";
import { toast } from "react-toastify";

export const OrderedForm = ({ onOtpVerified }) => {
  const [isSuccessOtp, setisSuccessOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const { mutate: registerM } = Register({ setisSuccessOtp });
  const { mutate: otpVerify } = OtpVerify({ setisSuccessOtp });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    role: "client",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required").max(200, "Too long"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .max(200, "Too long"),
    password: Yup.string()
      .required("Required")
      .min(4, "Too short")
      .max(8, "Too long"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .min(4, "Too short")
      .max(8, "Too long"),
  });

  const onSubmit = (values, onSubmitProps) => {
    registerM(values, {
      onSuccess: () => {
        toast.success("Registered successfully!");
        setisSuccessOtp(true);
        onSubmitProps.setSubmitting(false);
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.email?.[0] || error.message;
        toast.error(errorMessage);
        onSubmitProps.setSubmitting(false);
      },
    });
  };

  const handleOtpChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  const handleOtpSubmit = () => {
    otpVerify(
      { otp: otp },
      {
        onSuccess: () => {
          toast.success("OTP verified!");
          onOtpVerified(); // Notify parent component
        },
        onError: (error) => {
          console.error("Error verifying OTP:", error);
        },
      }
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        {isSuccessOtp ? "Verify OTP" : "Register"}
      </h2>
      {isSuccessOtp ? (
        <div className="flex flex-col items-center">
          <OtpInput
            value={otp}
            separator={<span>-</span>}
            onChange={handleOtpChange}
            numInputs={6}
          />
          <button
            onClick={handleOtpSubmit}
            disabled={otp.length < 6}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify OTP
          </button>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form className="flex flex-col gap-4">
              <FormControl
                control="input"
                name="username"
                label="Username"
                placeholder="Enter username"
              />
              <FormControl
                control="input"
                name="email"
                label="Email"
                placeholder="Enter email"
              />
              <FormControl
                control="password"
                name="password"
                label="Password"
                placeholder="Enter password"
              />
              <FormControl
                control="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm password"
              />
              <div className="flex justify-end">
                <button
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="bg-blue-500 px-4 py-2 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};


