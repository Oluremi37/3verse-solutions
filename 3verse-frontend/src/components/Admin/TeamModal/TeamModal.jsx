import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { createTeamMember, updateTeamMember } from "../../../services/teamService";

import "./TeamModal.css";

export default function TeamModal({ isOpen, onClose, member, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    position: "",
    teamType: "Management",
    bio: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    displayOrder: 0,
    isPreview: false,
    isPublished: true,
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      if (member) {
        setForm({
          fullName: member.fullName || "",
          position: member.position || "",
          teamType: member.teamType || "Management",
          bio: member.bio || "",
          linkedin: member.linkedin || "",
          twitter: member.twitter || "",
          instagram: member.instagram || "",
          facebook: member.facebook || "",
          displayOrder: member.displayOrder || 0,
          isPreview: member.isPreview || false,
          isPublished: member.isPublished,
        });

        setPreview(member.image || "");
        setImage(null);
      } else {
        setForm({
          fullName: "",
          position: "",
          teamType: "Management",
          bio: "",
          linkedin: "",
          twitter: "",
          instagram: "",
          facebook: "",
          displayOrder: 0,
          isPreview: false,
          isPublished: true,
        });

        setPreview("");
        setImage(null);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isOpen, member]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", form.fullName);
      formData.append("position", form.position);
      formData.append("teamType", form.teamType);
      formData.append("bio", form.bio);

      formData.append("linkedin", form.linkedin);
      formData.append("twitter", form.twitter);
      formData.append("instagram", form.instagram);
      formData.append("facebook", form.facebook);

      formData.append("displayOrder", form.displayOrder);
      formData.append("isPreview", form.isPreview);
      formData.append("isPublished", form.isPublished);

      if (image) {
        formData.append("image", image);
      }

      if (member) {
        await updateTeamMember(member._id, formData);

        toast.success("Team member updated successfully.");
      } else {
        await createTeamMember(formData);

        toast.success("Team member created successfully.");
      }

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="team-modal">
        <div className="team-modal-header">
          <h2>{member ? "Edit Team Member" : "Add Team Member"}</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="team-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Position</label>

              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Team Type</label>

              <select
                name="teamType"
                value={form.teamType}
                onChange={handleChange}
              >
                <option value="Managing Director">Managing Director</option>

                <option value="Chief Technology Officer">
                  Chief Technology Officer
                </option>

                <option value="Management">Management</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Bio</label>

              <textarea
                rows="5"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                required={
                  form.teamType === "Managing Director" ||
                  form.teamType === "Chief Technology Officer"
                }
              />
            </div>

            <div className="form-group">
              <label>LinkedIn</label>

              <input
                type="text"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Twitter</label>

              <input
                type="text"
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Instagram</label>

              <input
                type="text"
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Facebook</label>

              <input
                type="text"
                name="facebook"
                value={form.facebook}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Display Order</label>

              <input
                type="number"
                name="displayOrder"
                value={form.displayOrder}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <label>Profile Image</label>

              <input type="file" accept="image/*" onChange={handleImage} />

              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-group checkbox-group full-width">
              <label>
                <input
                  type="checkbox"
                  name="isPreview"
                  checked={form.isPreview}
                  onChange={handleChange}
                />
                Show on Homepage
              </label>
            </div>

            <div className="form-group checkbox-group full-width">
              <label>
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                />
                Published
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : member
                  ? "Update Team Member"
                  : "Create Team Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
