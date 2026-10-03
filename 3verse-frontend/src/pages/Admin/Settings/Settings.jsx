import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

import { AuthContext } from "../../../context/AuthContext";
import {
  changePassword,
  updateProfile,
} from "../../../services/settingsService";

import "./Settings.css";

export default function Settings() {
  const { admin, updateAdmin } = useContext(AuthContext);

  // Profile state
  const [profileLoading, setProfileLoading] = useState(false);

  const [profileForm, setProfileForm] = useState({
    fullName: admin?.fullName || "",
    email: admin?.email || "",
  });

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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!profileForm.fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    if (!profileForm.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    try {
      setProfileLoading(true);

      const data = await updateProfile({
        fullName: profileForm.fullName,
        email: profileForm.email,
      });

      updateAdmin(data.admin);

      setProfileForm({
        fullName: data.admin.fullName,
        email: data.admin.email,
      });

            updateAdmin(data.admin);

            setProfileForm({
              fullName: data.admin.fullName,
              email: data.admin.email,
            });

            toast.success("Profile saved successfully.");
    } catch (error) {
      console.error("Update profile error:", error);

      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  
  //  PASSWORD
   

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (form.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
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
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your admin account settings.</p>
      </div>

      {/* =========================
          ADMIN ACCOUNT
      ========================= */}

      <div className="settings-card">
        <div className="settings-card-header">
          <h2>Admin Account</h2>
          <p>Update your administrator account information.</p>
        </div>

        <form onSubmit={handleProfileSubmit}>
          <div className="settings-form-group">
            <label htmlFor="fullName">Full Name</label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={profileForm.fullName}
              onChange={handleProfileChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="settings-form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="settings-form-group">
            <label>Role</label>

            <input type="text" value={admin?.role || "N/A"} disabled readOnly />

            <small>
              Your administrator role can only be changed by an authorized
              administrator.
            </small>
          </div>

          <button
            type="submit"
            className="settings-save-btn"
            disabled={profileLoading}
          >
            {profileLoading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      {/* =========================
          CHANGE PASSWORD
      ========================= */}

      <div className="settings-card">
        <div className="settings-card-header">
          <h2>Change Password</h2>
          <p>Update the password used to access the admin panel.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="settings-form-group">
            <label htmlFor="currentPassword">Current Password</label>

            <div className="password-field">
              <input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={form.currentPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={
                  showCurrentPassword
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="settings-form-group">
            <label htmlFor="newPassword">New Password</label>

            <div className="password-field">
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={form.newPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowNewPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={
                  showNewPassword ? "Hide new password" : "Show new password"
                }
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="settings-form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>

            <div className="password-field">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="settings-save-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
