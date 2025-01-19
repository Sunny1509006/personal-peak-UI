import Axios from "../Axios/Axios";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";

export default function useLoginSubmit(setStep) {
  // const router = useRouter();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await Axios.post(
        `/users/login`,
        {
          email: data.username,
          password: data.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.error) {
        notifyError(res?.error);
      } else {
        notifySuccess("Logged in successfully");
        // window.location.replace("https://dashboard.your-personal-peak360.de/");
        // window.location.href = "https://dashboard.your-personal-peak360.de/";
        // Set agreement status in local storage
      localStorage.removeItem("hasAgreedToTerms");
          navigate('/dashboard');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError(error?.response?.data?.detail || error.message);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      console.log(data);

      setLoading(true);
      const res = await Axios.post(
        `/users/pre-registration`,
        {
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
          street_and_house: data.street,
          zip_code: data.zipcode,
          location: data.city,
          phone_number: data.phone,
          // allow_contact: data.contactPermission,
          interests: data.interests,
          activation_code: data.activationCode,
          username: data.username,
          // password: data.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.error) {
        console.log(res?.error);

        notifyError(res?.error);
      } else {
        notifySuccess("Registered successfully");
        navigate("/login");

        //   router.push('/');
      }
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.detail);

      setLoading(false);
      notifyError(error?.response?.data?.detail || error.message);
    }
  };

  const onActivationCode = async (data) => {
    console.log(data);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/activate`,
        {
          activation_code: data.activationCode,
          email: data.email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.error) {
        notifyError(res?.error);
      } else {
        notifySuccess("Activated successfully");
        navigate("/login");
        //   router.push('/');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError(error?.response?.data?.detail || error.message);
    }
  };

  return {
    register,
    handleSubmit,
    clearErrors,
    errors,
    loading,
    onLoginSubmit,
    onRegisterSubmit,
    onActivationCode,
  };
}
