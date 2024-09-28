import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormControl from "../../utils/form-utils/FormControl";
import * as Yup from "yup";
import { getUserData, OtpVerify, Register } from "../../hooks/productsHook";
import { getFromLS } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../utils/form-utils/OtpInput";

export const OrderedForm = () => {
    const navigate = useNavigate();
    const [isSuccessOtp, setisSuccessOtp] = useState(false);
    const initialValuesObj = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        role: "client",
    };
    const { mutate: registerM } = Register({ setisSuccessOtp });
    const { mutate: otpVerify, isSuccess } = OtpVerify({ setisSuccessOtp });

    const userToken = getFromLS("access");

    const { data } = getUserData(userToken);

    console.log(data);

    const [initialValues, setInitialValues] = useState(initialValuesObj);
    // validation with Yup
    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Ma'lumot kiritilmadi")
            .max(200, "Bunday ism mavjud emas"),
        email: Yup.string()
            .email("Email xato kiritildi")
            .required("Ma'lumot kiritilmadi")
            .max(200, "Bunday ism mavjud emas"),
        password: Yup.string()
            .required("Ma'lumot kiritilmadi")
            .max(8, "8 tadan kam belgi kiritishingiz kerak")
            .min(4, "4 tadan ko'p belgi kiritishingiz kerak"),
        confirmPassword: Yup.string()
            .required("Ma'lumot kiritilmadi")
            .oneOf([Yup.ref("password"), ""], "Parollar mos kelmadi")
            .max(8, "8 tadan kam belgi kiritishingiz kerak")
            .min(4, "4 tadan ko'p belgi kiritishingiz kerak"),
    });

    // onsubmit function
    const productOfCart = getFromLS("cart");

    // console.log(productOfCart);
    const onSubmit = (values, onSubmitProps) => {
        registerM(values);

        setTimeout(() => {
            setInitialValues(initialValuesObj);
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
        }, 3000);
    };

    const [otp, setOtp] = useState("");
    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
        console.log(enteredOtp);
    };

    return (
        <>
            {isSuccessOtp ? (
                <div className="">
                    <OtpInput
                        value={otp}
                        separator={<span>-</span>}
                        onChange={handleChange}
                        numInputs={6}
                    />
                    <button
                        onClick={() => otpVerify({ otp: otp })}
                        disabled={otp.length < 6}
                        className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        variant="gradient"
                        color="green"
                    >
                        <span>Jo'natish</span>
                    </button>
                </div>
            ) : (
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
                                    control={"input"}
                                    name={"email"}
                                    label={"Enter email"}
                                    placeholder={"Enter Email name"}
                                />
                                <FormControl
                                    control={"password"}
                                    name={"password"}
                                    label={"Password"}
                                    placeholder={"Enter password"}
                                />
                                <FormControl
                                    control={"password"}
                                    name={"confirmPassword"}
                                    label={"Check password"}
                                    placeholder={"Check password"}
                                />{" "}
                                <div className="flex justify-end">
                                    <button
                                        disabled={
                                            !formik.isValid ||
                                            formik.isSubmitting
                                        }
                                        className="bg px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="submit"
                                        variant="gradient"
                                        color="green"
                                    >
                                        <span>Jo'natish</span>
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            )}
        </>
    );
};
