
import { useState } from "react";
import "./ContactForm.css";

const API_URL = "http://localhost:5001/api/contacts";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "We couldn't send your message. Please try again."
        );
      }

      setSubmitted(true);
      setFormData({ ...INITIAL_FORM });
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to our server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError("");
    setFormData({ ...INITIAL_FORM });
  };

  if (submitted) {
    return (
      <section className="contact-form-section" aria-live="polite">
        <div className="contact-form-container">
          <div className="contact-success-card">
            <div className="contact-success-card__icon" aria-hidden="true">
              <span>✓</span>
            </div>

            <span className="contact-form-eyebrow">
              MESSAGE RECEIVED
            </span>

            <h2>Thank you for reaching out.</h2>

            <p>
              Your message has been sent successfully. The 3Verse Solutions
              team will review your enquiry and get back to you.
            </p>

            <button
              type="button"
              className="contact-btn contact-btn--secondary"
              onClick={resetForm}
            >
              Send Another Message
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="contact-form-section"
      id="contact-form"
      aria-labelledby="contact-form-title"
    >
      <div className="contact-form-container">
        <div className="contact-form-layout">
          <div className="contact-form-main">
            <div className="contact-form-header">
              <span className="contact-form-eyebrow">
                <span className="contact-form-eyebrow__line" />
                GET IN TOUCH
              </span>

              <h2 id="contact-form-title">
                We'd love to hear from you.
              </h2>

              <p>
                Tell us what your business needs. Our team will help you
                explore the right communication and technology solutions.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="contact-fullName">Full Name *</label>
                  <input
                    id="contact-fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    maxLength={120}
                    required
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 ..."
                    autoComplete="tel"
                    maxLength={30}
                  />
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-subject">Subject *</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    maxLength={200}
                    required
                  />
                </div>
              </div>

              <div className="contact-form__group">
                <label htmlFor="contact-message">Your Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us a little about your project or requirements..."
                  maxLength={5000}
                  required
                />
                <span className="contact-form__hint">
                  Please include any details that will help us understand
                  your requirements.
                </span>
              </div>

              {error && (
                <div className="contact-error" role="alert">
                  <span aria-hidden="true">!</span>
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="contact-btn"
                disabled={loading}
              >
                {loading ? "Sending your message..." : "Send Message"}
                {!loading && <span aria-hidden="true">↗</span>}
              </button>

              <p className="contact-form__privacy">
                Your details will only be used to respond to your enquiry.
              </p>
            </form>
          </div>

          <aside className="contact-form-aside">
            <div className="contact-form-aside__top">
              <span className="contact-form-aside__number">3V / 01</span>
              <span className="contact-form-aside__status">
                <span />
                HERE TO HELP
              </span>
            </div>

            <div className="contact-form-aside__content">
              <span className="contact-form-aside__eyebrow">
                START A CONVERSATION
              </span>

              <h3>
                Great things start with a <span>conversation.</span>
              </h3>

              <p>
                From business communication to IT infrastructure, let's
                discuss how the right technology can move your business
                forward.
              </p>
            </div>

            <div className="contact-form-aside__graphic" aria-hidden="true">
              <span className="contact-form-aside__ring contact-form-aside__ring--one" />
              <span className="contact-form-aside__ring contact-form-aside__ring--two" />
              <span className="contact-form-aside__graphic-mark">3V</span>
              <span className="contact-form-aside__graphic-line" />
              <span className="contact-form-aside__graphic-caption">
                CONNECTING WHAT MATTERS
              </span>
            </div>

            <div className="contact-form-aside__footer">
              <span>PEOPLE</span>
              <span className="contact-form-aside__footer-dot" />
              <span>TECHNOLOGY</span>
              <span className="contact-form-aside__footer-dot" />
              <span>POSSIBILITIES</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

