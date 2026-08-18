import { useRef, useState } from "react";
import { validatePhone } from "../services/validatePhone";
import { createOrder } from "../services/order";

const initialCheckout = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  country: "",
  state: "",
  city: "",
  address: "",
  postalCode: "",
};

function useCheckout() {
  const [form, setForm] = useState(initialCheckout);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = useRef({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }

  function validateAndSubmit() {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstError = Object.keys(validationErrors)[0];
      const firstErrorInput = inputRefs.current[firstError];

      firstErrorInput?.focus({ preventScroll: true });

      firstErrorInput?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return false;
    }
    setErrors({});

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Processing Complete");
    }, 2000);

    return true;
  }

  function validateForm() {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid Email";
    }

    if (!form.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!form.country) {
      newErrors.phone = "Select a country first";
    } else {
      const phoneError = validatePhone(form.phone, form.country);
      if (phoneError) {
        newErrors.phone = phoneError;
      }
    }
    if (!form.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State / Province is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }
    return newErrors;
  }

  return {
    form,
    errors,
    isSubmitting,
    inputRefs,
    handleChange,
    validateAndSubmit,
  };
}

export default useCheckout;
