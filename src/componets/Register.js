import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios'
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Register() {
 
    // const passwordpattern = '/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/'
    const navigate=useNavigate()
;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 4));
      try{
        axios.post('http://localhost:9232/register',{values}).then(res=>{console.log(res.data)})
       navigate("/");
      }
      catch(error){
        console.error(error)
      }

    },
    validationSchema: yup.object({
      name: yup.string().min(3).max(20).required(),
      email: yup.string().required(),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20)
        .required(),
        
      confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords must match")
        
    }),
  });

  return (
    <div>
      <form
        className="container w-25 border border-1 mt-5 rounded-2 shadow p-4 mb-4 bg-white"
        onSubmit={formik.handleSubmit}
      >
        <div className="mx-auto" style={{ width: "155px" }}>
          <h3>Register</h3>
        </div>
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control mb-3 mt-3"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && (
          <div style={{ color: "red" }}>{formik.errors.name}</div>
        )}
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
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password:
        </label>
        <input
          type="password"
          className="form-control mb-3 mt-3"
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
        />
        {formik.errors.confirmPassword &&
          formik.touched.confirmPassword &&(
            <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
          )}
        <div className="clearfix">
          <input
            type="submit"
            value="Register"
            className="btn btn-primary float-start"
          />
          <input
            type="button"
            value="Login"
            className="btn btn-primary float-end"
            onClick={()=>{navigate('/login')}}
          />
        </div>
      </form>
    </div>
  );
}
