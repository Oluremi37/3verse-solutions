import { useState } from "react";
import "./ContactForm.css";

const API_URL = "http://localhost:5001/api/contacts";
export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSubmitted(true);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setSubmitted(false);
    setError("");
  };

  if (submitted) {
    return (
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-success-card">
            <div className="success-icon">✓</div>

            <h2>Message Sent Successfully</h2>

            <p>
              Thank you for contacting 3Verse Solution. One of our
              consultants will get back to you within 24 hours.
            </p>

            <button className="contact-btn" onClick={resetForm}>
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-form-section" id="contact-form">
      <div className="contact-form-container">
        <div className="contact-form-header">
          <span>CONTACT US</span>

          <h2>Send Us a Message</h2>

          <p>
            Tell us about your project or enquiry and our team will respond as
            quickly as possible.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact-fullName">Full Name</label>

              <input
                id="contact-fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>

              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact-phone">Phone Number</label>

              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234..."
                autoComplete="tel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>

              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>

            <textarea
              id="contact-message"
              rows="7"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              required
            />
          </div>

          {error && <div className="contact-error">{error}</div>}

          <button type="submit" className="contact-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
