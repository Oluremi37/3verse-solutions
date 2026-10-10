import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

import { AuthContext } from "../../../context/AuthContext";
import {
  changePassword,
  updateProfile,
} from "../../../services/settingsService";

import "./Settings.css";

const getProfileFormValues = (currentAdmin) => ({
  fullName: currentAdmin?.fullName || "",
  email: currentAdmin?.email || "",
});

export default function Settings() {
  const { admin, updateAdmin } = useContext(AuthContext);

  // Profile state
  const [profileLoading, setProfileLoading] = useState(false);

  const [profileForm, setProfileForm] = useState(() =>
    getProfileFormValues(admin),
  );

  // Password state
  const [loading, setLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // =========================
  // PROFILE
  // =========================

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    const fullName = profileForm.fullName.trim();
    const email = profileForm.email.trim();

    if (!fullName) {
      toast.error("Full name is required.");
      return;
    }

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    try {
      setProfileLoading(true);

      const data = await updateProfile({ fullName, email });

      if (!data?.admin) {
        throw new Error("Updated profile data was not returned.");
      }

      updateAdmin(data.admin);

      setProfileForm({
        fullName: data.admin.fullName || "",
        email: data.admin.email || "",
      });

      toast.success("Profile saved successfully.");
    } catch (error) {
      console.error("Update profile error:", error);

      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  // =========================
  // PASSWORD
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.currentPassword) {
      toast.error("Current password is required.");
      return;
    }

    if (form.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (form.currentPassword === form.newPassword) {
      toast.error("Your new password must differ from your current password.");
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password changed successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      console.error("Change password error:", error);

      toast.error(
        error.response?.data?.message || "Failed to change password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <div>
          <span className="settings-eyebrow">ACCOUNT MANAGEMENT</span>
          <h1>Settings</h1>
          <p>Manage your administrator profile and security.</p>
        </div>
      </header>

      <div className="settings-sections">
        {/* ADMIN ACCOUNT */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">
              <span aria-hidden="true">01</span>
            </div>

            <div>
              <h2>Admin Account</h2>
              <p>Update your administrator account information.</p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit}>
            <div className="settings-form-group">
              <label htmlFor="settings-fullName">Full Name</label>

              <input
                id="settings-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="settings-form-group">
              <label htmlFor="settings-email">Email Address</label>

              <input
                id="settings-email"
                name="email"
                type="email"
                autoComplete="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="settings-form-group">
              <label htmlFor="settings-role">Administrator Role</label>

              <input
                id="settings-role"
                type="text"
                value={admin?.role || "N/A"}
                disabled
                readOnly
              />

              <small>
                Your administrator role can only be changed by an authorized
                administrator.
              </small>
            </div>

            <div className="settings-form-footer">
              <button
                type="submit"
                className="settings-save-btn"
                disabled={profileLoading}
              >
                {profileLoading ? "Saving Profile..." : "Save Profile"}
              </button>
            </div>
          </form>
        </section>

        {/* CHANGE PASSWORD */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon settings-card-icon--security">
              <span aria-hidden="true">02</span>
            </div>

            <div>
              <h2>Change Password</h2>
              <p>Keep your administrator account secure.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="settings-form-group">
              <label htmlFor="settings-currentPassword">Current Password</label>

              <div className="settings-password-field">
                <input
                  id="settings-currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter your current password"
                  required
                />

                <button
                  type="button"
                  className="settings-toggle-password"
                  onClick={() =>
                    setShowCurrentPassword((previous) => !previous)
                  }
                  aria-label={
                    showCurrentPassword
                      ? "Hide current password"
                      : "Show current password"
                  }
                  aria-pressed={showCurrentPassword}
                >
                  {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="settings-form-group">
              <label htmlFor="settings-newPassword">New Password</label>

              <div className="settings-password-field">
                <input
                  id="settings-newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter a new password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="settings-toggle-password"
                  onClick={() => setShowNewPassword((previous) => !previous)}
                  aria-label={
                    showNewPassword ? "Hide new password" : "Show new password"
                  }
                  aria-pressed={showNewPassword}
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <small>Use at least 8 characters.</small>
            </div>

            <div className="settings-form-group">
              <label htmlFor="settings-confirmPassword">
                Confirm New Password
              </label>

              <div className="settings-password-field">
                <input
                  id="settings-confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your new password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="settings-toggle-password"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  aria-pressed={showConfirmPassword}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="settings-form-footer">
              <button
                type="submit"
                className="settings-save-btn"
                disabled={loading}
              >
                {loading ? "Updating Password..." : "Change Password"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
