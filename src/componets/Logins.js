import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
export default function Logins({setData}) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 4));
      try {
        axios.post("http://localhost:9232/login", { values }).then((res) => {
          alert(res.data.message)
          console.log(res.data);
          console.log(res.data.userexiting)
          setData(res.data.userexiting);
          
          navigate("/");

        });
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: yup.object({
      email: yup.string().required(),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20)
        .required(),
    }),
  });



  return (
    <div>
      <form className="container  w-25  border border-1 mt-5 rounded-2 shadow p-4 mb-4 bg-white" onSubmit={formik.handleSubmit}>
        <div className="mx-auto " style={{ width: "155px" }}>
          <h3>Login</h3>
        </div>
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control mb-3 mt-3"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control mb-3 mt-3"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}
        <div className="clearfix">
          <input
            type="submit"
            value="Login"
            className="btn btn-primary float-start"
          />
          <input
            type="button"
            value="register"
            className="btn btn-primary float-end"
            onClick={() => {
              navigate("/register");
            }}
          />
        </div>
      </form>
    </div>
  );
}
