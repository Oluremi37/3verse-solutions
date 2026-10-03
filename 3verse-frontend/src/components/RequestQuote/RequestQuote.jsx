import { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FiCheck } from "react-icons/fi";
import "./RequestQuote.css";

export default function RequestQuote() {
  const location = useLocation();

  const itemName = location.state?.itemName || "";
  const itemType = location.state?.itemType || "";

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    product: itemName,
    quantity: "",
    details: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const productRef = useRef(null);
  const quantityRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove the error as soon as the user starts correcting the field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    }

    // Product / Service
    if (!formData.product.trim()) {
      newErrors.product =
        itemType === "service"
          ? "Please tell us which service you are interested in."
          : "Please tell us which product you are interested in.";
    }

    // Quantity is required for products
    if (itemType !== "service") {
      if (!formData.quantity) {
        newErrors.quantity = "Please enter the quantity you need.";
      } else if (Number(formData.quantity) < 1) {
        newErrors.quantity = "Quantity must be at least 1.";
      }
    }

    setErrors(newErrors);

    return newErrors;
  };

  const focusFirstError = (validationErrors) => {
    if (validationErrors.fullName) {
      fullNameRef.current?.focus();
      return;
    }

    if (validationErrors.email) {
      emailRef.current?.focus();
      return;
    }

    if (validationErrors.phone) {
      phoneRef.current?.focus();
      return;
    }

    if (validationErrors.product) {
      productRef.current?.focus();
      return;
    }

    if (validationErrors.quantity) {
      quantityRef.current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before sending anything to the backend
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      focusFirstError(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:5001/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      console.log(data);

      setIsSubmitted(true);
      setErrors({});
    } catch (error) {
      console.error(error);

      // If backend sends a validation error, try to show it properly
      // instead of displaying a generic "Validation failed."
      if (error.message) {
        setErrors({
          submit: error.message,
        });
      } else {
        setErrors({
          submit: "Unable to submit your request. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      product: "",
      quantity: "",
      details: "",
    });

    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <>
      <Navbar />

      <section className="request-quote-section">
        <div className="request-quote-container">
          {isSubmitted ? (
            <div className="quote-thank-you">
              <div className="quote-thank-you-icon">
                <FiCheck />
              </div>

              <h2>Thank You!</h2>

              <p className="quote-thank-you-subtitle">
                Your quote request has been received
              </p>

              <p className="quote-thank-you-body">
                Our team will review your request and get back to you within 24
                hours with pricing and next steps.
              </p>

              <div className="quote-thank-you-actions">
                <button className="btn-outline" onClick={handleReset}>
                  Request Another Quote
                </button>

                <Link to="/" className="btn-filled">
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="request-quote-header">
                <span className="request-quote-tag">GET A QUOTE</span>

                <h1>Request a Quote</h1>

                <p>
                  Tell us what you need and our team will get back to you with
                  pricing and availability.
                </p>
              </div>

              <form className="quote-form" onSubmit={handleSubmit} noValidate>
                {/* FULL NAME + COMPANY */}
                <div className="quote-form-row">
                  <div
                    className={`quote-form-field ${
                      errors.fullName ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="fullName">
                      Full Name <span className="required">*</span>
                    </label>

                    <input
                      ref={fullNameRef}
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? "input-error" : ""}
                    />

                    {errors.fullName && (
                      <span className="field-error">{errors.fullName}</span>
                    )}
                  </div>

                  <div className="quote-form-field">
                    <label htmlFor="companyName">Company Name</label>

                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      placeholder="Your company (optional)"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* EMAIL + PHONE */}
                <div className="quote-form-row">
                  <div
                    className={`quote-form-field ${
                      errors.email ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>

                    <input
                      ref={emailRef}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "input-error" : ""}
                    />

                    {errors.email && (
                      <span className="field-error">{errors.email}</span>
                    )}
                  </div>

                  <div
                    className={`quote-form-field ${
                      errors.phone ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="phone">
                      Phone <span className="required">*</span>
                    </label>

                    <input
                      ref={phoneRef}
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+234 000 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "input-error" : ""}
                    />

                    {errors.phone && (
                      <span className="field-error">{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* PRODUCT / SERVICE */}
                <div
                  className={`quote-form-field ${
                    errors.product ? "has-error" : ""
                  }`}
                >
                  <label htmlFor="itemName">
                    {itemType === "service"
                      ? "Service you're interested in"
                      : "Product you're interested in"}

                    <span className="required"> *</span>
                  </label>

                  <input
                    ref={productRef}
                    type="text"
                    id="itemName"
                    name="product"
                    placeholder={
                      itemType === "service"
                        ? "e.g. Website Development"
                        : "e.g. Dell XPS 14, IP Telephony"
                    }
                    value={formData.product}
                    onChange={handleChange}
                    className={errors.product ? "input-error" : ""}
                  />

                  {errors.product && (
                    <span className="field-error">{errors.product}</span>
                  )}
                </div>

                {/* QUANTITY */}
                {itemType !== "service" && (
                  <div
                    className={`quote-form-field ${
                      errors.quantity ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="quantity">
                      Quantity <span className="required">*</span>
                    </label>

                    <input
                      ref={quantityRef}
                      type="number"
                      id="quantity"
                      name="quantity"
                      placeholder="e.g. 5"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={errors.quantity ? "input-error" : ""}
                    />

                    {errors.quantity && (
                      <span className="field-error">{errors.quantity}</span>
                    )}
                  </div>
                )}

                {/* ADDITIONAL DETAILS */}
                <div className="quote-form-field">
                  <label htmlFor="details">
                    Additional details
                    <span className="optional"> (optional)</span>
                  </label>

                  <textarea
                    id="details"
                    name="details"
                    placeholder="Tell us more about what you need..."
                    rows="4"
                    value={formData.details}
                    onChange={handleChange}
                  />
                </div>

                {/* BACKEND ERROR */}
                {errors.submit && (
                  <div className="submit-error">{errors.submit}</div>
                )}

                <button
                  type="submit"
                  className="quote-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
