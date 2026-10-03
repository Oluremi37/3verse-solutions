import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import axios from "axios";
import ScrollReveal from "../ScrollReveal/ScrollReveal";
import "./ProjectCTA.css";

export default function ProjectCTA() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    consultationType: "In-Person Meeting",
    location: "",
    phoneNumber: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const combinedDateTime = `${formData.preferredDate}T${formData.preferredTime}`;

      await axios.post("http://localhost:5001/api/schedules", {
        fullName: formData.fullName,
        email: formData.email,
        preferredDate: combinedDateTime,
        consultationType: formData.consultationType,
        location:
          formData.consultationType === "In-Person Meeting"
            ? formData.location
            : undefined,
        phoneNumber:
          formData.consultationType === "Phone Call"
            ? formData.phoneNumber
            : undefined,
      });

      setIsSubmitted(true);

      setFormData({
        fullName: "",
        email: "",
        preferredDate: "",
        preferredTime: "",
        consultationType: "In-Person Meeting",
        location: "",
        phoneNumber: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to schedule discussion.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      consultationType: "In-Person Meeting",
      location: "",
      phoneNumber: "",
    });
    setIsSubmitted(false);
  };

  return (
    <section className="project-cta-section" id="schedule-demo">
      <ScrollReveal>
        <div className="project-cta-container">
          <div className="project-cta-left">
            <h2>Talk to us about your project</h2>
            <p>
              We're ready to help you bring your ideas to life with reliable
              telecom and IT solutions tailored to your business needs. Schedule
              a discussion with our team at your convenience.
            </p>

            <div className="project-cta-divider" />

            <h4>Need assistance with your booking?</h4>
            <p className="project-cta-subtext">You can contact us on :</p>
            <p className="project-cta-contact">
              +234 8135710769
            </p>
            <p className="project-cta-contact">3versesltd@gmail.com</p>
          </div>

          <div className="project-cta-right">
            {isSubmitted ? (
              <div className="thank-you-card">
                <div className="thank-you-icon">
                  <FiCheck />
                </div>

                <h3>Thank You!</h3>
                <p className="thank-you-subtitle">
                  Your Consultation request has been received
                </p>

                <p className="thank-you-body">
                  Our team will review your request and contact you within 24
                  hours to confirm your preferred time
                </p>

                <button className="reset-btn" onClick={handleReset}>
                  Schedule Another Meeting
                </button>
              </div>
            ) : (
              <form className="schedule-form" onSubmit={handleSubmit}>
                <h3>Schedule Discussion</h3>

                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Your full name here"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Yourname@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <div className="date-time-row">
                  <div className="date-time-field">
                    <label htmlFor="preferredDate">Preferred Date</label>

                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      onClick={(e) => e.currentTarget.showPicker?.()}
                      required
                    />
                  </div>

                  <div className="date-time-field">
                    <label htmlFor="preferredTime">Preferred Time</label>

                    <input
                      type="time"
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      onClick={(e) => e.currentTarget.showPicker?.()}
                      required
                    />
                  </div>
                </div>

                <label htmlFor="consultationType">
                  Preferred consultation type
                </label>
                <select
                  id="consultationType"
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleChange}
                >
                  <option value="In-Person Meeting">In-Person Meeting</option>
                  <option value="Phone Call">Phone Call</option>
                </select>

                {formData.consultationType === "In-Person Meeting" && (
                  <>
                    <label htmlFor="location">Your Office Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="e.g. 12 Admiralty Way, Lekki Phase 1, Lagos"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}

                {formData.consultationType === "Phone Call" && (
                  <>
                    <label htmlFor="phoneNumber">Your Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="+234 000 000 0000"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}

                {error && (
                  <p
                    style={{
                      color: "#dc2626",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    {error}
                  </p>
                )}
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
