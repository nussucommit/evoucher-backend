import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";

import { Routes } from "constants/routes";
import { register } from "api/auth";
import history from "utils/history";
import { FACULTY_OPTIONS, YEAR_OPTIONS } from "constants/options";

import { Button, Heading } from "@commitUI/index";
import { Input, Select } from "components/Form";
import Navbar from "components/Navbar";
import LinkButton from "components/LinkButton";

import styles from "./Register.module.css";
import logo from "../../assets/images/logo.png";
import logo2 from "assets/images/logo2.jpeg";

type Option = {
    value: string | number;
    label: string;
};

interface Values {
    name: string;
    nusnetID: string;
    year: Option;
    faculties: Option[];
    password: string;
}

const Register = () => {
    const initialValues: Values = {
        name: "",
        nusnetID: "",
        year: {
            label: "",
            value: "",
        },
        faculties: [],
        password: "",
    };

    const validationSchema: yup.SchemaOf<Values> = yup
        .object({
            name: yup.string().required("Required"),
            nusnetID: yup.string().required("Required"),
            year: yup
                .object()
                .shape({
                    value: yup.mixed().required("Required"),
                    label: yup.string(),
                })
                .required("Required"),
            faculties: yup
                .array()
                .of(
                    yup.object().shape({
                        value: yup.mixed().required("Required"),
                        label: yup.string().required("Required"),
                    })
                )
                .test({
                    message: "Please pick a faculty",
                    test: (arr) => Boolean(arr) && arr!.length > 0,
                }),
            password: yup.string().required("Required"),
        })
        .defined();

    const handleRegister = (
        values: Values,
        formikHelpers: FormikHelpers<Values>
    ) => {
        register({
            username: values.nusnetID,
            password: values.password,
            name: values.name,
            year: values.year.value as number,
            faculty1: values.faculties[0].value as string,
            faculty2:
                values.faculties.length === 2
                    ? (values.faculties[1].value as string)
                    : "",
        });
        formikHelpers.setSubmitting(false);
        history.push("/login");
    };

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img src={logo2} alt="logo" height={60} />
                    <img src={logo} alt="logo" height={80} />
                </div>

                <Heading className={styles.heading}>Sign Up</Heading>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        <Input
                            name="name"
                            label="Name"
                            className={styles.input}
                        />

                        <div className={styles.halfInputContainer}>
                            <Input
                                name="nusnetID"
                                label="NUSNET ID"
                                className={styles.halfField}
                            />

                            <Select
                                name="year"
                                label="Year"
                                options={YEAR_OPTIONS}
                                className={styles.halfField}
                            />
                        </div>

                        <Select
                            name="faculties"
                            label="Faculty"
                            options={FACULTY_OPTIONS}
                            isMulti
                            isSearchable
                            limitPick={2}
                            className={styles.select}
                        />
                        {/* </div> */}
                        <Input
                            name="password"
                            type="password"
                            label="Password"
                            className={styles.input}
                        />

                        <Button
                            className={styles.btn}
                            isSubmit
                            // Click handler is handled by the onSubmit props in the parent Formik component
                        >
                            Sign Up
                        </Button>
                    </Form>
                </Formik>
                <div className={styles.linkTextContainer}>
                    <LinkButton to={Routes.login} type="text">
                        Already have an account? Sign in.
                    </LinkButton>
                </div>
            </div>
        </>
    );
};

export default Register;
