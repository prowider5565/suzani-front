// import { Form, Formik } from "formik";
// import React, { useEffect, useState } from "react";
// import FormControl from "../../utils/form-utils/FormControl";
// import * as Yup from "yup";
// import { getUserData, Login, OtpVerify, Register } from "../../hooks/productsHook";
// import { getFromLS } from "../../utils/localStorage";
// import { useNavigate } from "react-router-dom";
// import OtpInput from "../../utils/form-utils/OtpInput";
// import Modal from "../modal/Index";

// export const SignIn = ({ onClose }) => {
//     const navigate = useNavigate();
//     const initialValuesObj = {
//         username: "",
//         password: "",
//     };
//     const { mutate } = Login();

//     const userToken = getFromLS("access");
//     const { data } = getUserData(userToken);

//     // console.log(data);

//     const [initialValues, setInitialValues] = useState(initialValuesObj);
//     // validation with Yup
//     const validationSchema = Yup.object({
//         username: Yup.string()
//             .required("Ma'lumot kiritilmadi")
//             .max(200, "Bunday ism mavjud emas"),
//         password: Yup.string()
//             .required("Ma'lumot kiritilmadi")
//             .max(8, "8 tadan kam belgi kiritishingiz kerak")
//             .min(4, "4 tadan ko'p belgi kiritishingiz kerak"),
//     });

//     const onSubmit = (values, onSubmitProps) => {
//         mutate(values);

//         setTimeout(() => {
//             setInitialValues(initialValuesObj);
//             onSubmitProps.setSubmitting(false);
//             onSubmitProps.resetForm();
//         }, 3000);
//     };


//     return (
//         <Modal title={"Sign in"}>
//             {
//                 <Formik
//                     onSubmit={onSubmit}
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                 >
//                     {(formik) => {
//                         return (
//                             <Form className="flex flex-col gap-6">
//                                 <FormControl
//                                     control={"input"}
//                                     name={"username"}
//                                     label={"Username"}
//                                     placeholder={"Enter username"}
//                                 />
                                
//                                 <FormControl
//                                     control={"password"}
//                                     name={"password"}
//                                     label={"Password"}
//                                     placeholder={"Enter password"}
//                                 />
                                
//                                 <div className="flex justify-end gap-4">
//                                     <button
//                                         onClick={() => onClose()}
//                                         className="bg-red-500 text-white px-4 py-2 rounded"
//                                     >
//                                         <span>Close</span>
//                                     </button>
//                                     <button
//                                         disabled={
//                                             !formik.isValid ||
//                                             formik.isSubmitting
//                                         }
//                                         className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                                         type="submit"
//                                     >
//                                         <span>Submit</span>
//                                     </button>
//                                 </div>
//                             </Form>
//                         );
//                     }}
//                 </Formik>
//             }
//         </Modal>
//     );
// };



import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormControl from "../../utils/form-utils/FormControl";
import * as Yup from "yup";
import { Login } from "../../hooks/productsHook";
import { addToLS, getFromLS } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Index";

export const SignIn = ({ onClose }) => {
  const navigate = useNavigate();
  const initialValuesObj = {
    username: "",
    password: "",
  };
  const [initialValues, setInitialValues] = useState(initialValuesObj);
    const userToken = getFromLS("access");
    console.log(userToken, "ssxswfuserToken");

  const { mutate } = Login({
    onSuccess: (data) => {
    
      if (data?.access) {
        addToLS("access", data.access);
        navigate("/"); 
        onClose(); 
      }
    },
    onError: (error) => {
      console.error("Login Error:", error);
    },
  });

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Ma'lumot kiritilmadi")
      .max(200, "Bunday ism mavjud emas"),
    password: Yup.string()
      .required("Ma'lumot kiritilmadi")
      .max(8, "8 tadan kam belgi kiritishingiz kerak")
      .min(4, "4 tadan ko'p belgi kiritishingiz kerak"),
  });

  const onSubmit = (values, onSubmitProps) => {
    mutate(values);

    setTimeout(() => {
      setInitialValues(initialValuesObj);
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    }, 3000);
  };

  return (
    <Modal title={"Sign in"}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form className="flex flex-col gap-6">
              <FormControl
                control={"input"}
                name={"username"}
                label={"Username"}
                placeholder={"Enter username"}
              />
              <FormControl
                control={"password"}
                name={"password"}
                label={"Password"}
                placeholder={"Enter password"}
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => onClose()}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  <span>Close</span>
                </button>
                <button
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  <span>Submit</span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};