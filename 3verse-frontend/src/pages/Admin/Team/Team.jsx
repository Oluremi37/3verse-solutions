import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FiUsers, FiCheckCircle, FiXCircle } from "react-icons/fi";

import {
  getTeamMembers,
  deleteTeamMember,
} from "../../../services/teamService";

import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import StatsCards from "../../../components/Admin/StatsCards/StatsCards";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import ConfirmModal from "../../../components/Admin/ConfirmModal/ConfirmModal";
import TeamModal from "../../../components/Admin/TeamModal/TeamModal";

import "./Team.css";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [openTeamModal, setOpenTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadMembers = useCallback(async () => {
    try {
      const data = await getTeamMembers();
      setMembers(data?.teamMembers || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load team members.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      try {
        const data = await getTeamMembers();

        if (isMounted) {
          setMembers(data?.teamMembers || []);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          toast.error("Failed to load team members.");
          setLoading(false);
        }
      }
    };

    fetchMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMembers = members.filter((member) => {
    const keyword = search.trim().toLowerCase();

    return (
      (member.fullName || "").toLowerCase().includes(keyword) ||
      (member.position || "").toLowerCase().includes(keyword)
    );
  });

  const stats = {
    total: members.length,
    published: members.filter((member) => member.isPublished).length,
    draft: members.filter((member) => !member.isPublished).length,
  };

  const columns = [
    {
      key: "image",
      label: "Photo",
      render: (member) =>
        member.image ? (
          <img
            src={member.image}
            alt={member.fullName || "Team member"}
            className="team-page__avatar"
          />
        ) : (
          <div className="team-page__avatar-placeholder" aria-label="No photo">
            {(member.fullName || "?").charAt(0).toUpperCase()}
          </div>
        ),
    },
    {
      key: "fullName",
      label: "Name",
      render: (member) => member.fullName || "N/A",
    },
    {
      key: "position",
      label: "Position",
      render: (member) => member.position || "N/A",
    },
    {
      key: "displayOrder",
      label: "Order",
      render: (member) => member.displayOrder ?? "N/A",
    },
    {
      key: "isPublished",
      label: "Status",
      render: (member) => (
        <span
          className={`team-page__status ${
            member.isPublished ? "active" : "draft"
          }`}
        >
          {member.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
  ];

  const closeTeamModal = () => {
    setOpenTeamModal(false);
    setEditingMember(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteTeamMember(deleteId);

      toast.success("Team member deleted successfully.");

      setDeleteId(null);

      if (selectedMember?._id === deleteId) {
        setSelectedMember(null);
      }

      await loadMembers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete team member.");
    }
  };

  return (
    <div className="team-page">
      <PageHeader
        title="Team"
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search team..."
        buttonText="Add Member"
        onButtonClick={() => {
          setEditingMember(null);
          setOpenTeamModal(true);
        }}
      />

      <StatsCards
        cards={[
          {
            title: "Total Members",
            value: stats.total,
            icon: <FiUsers />,
          },
          {
            title: "Published",
            value: stats.published,
            icon: <FiCheckCircle />,
          },
          {
            title: "Draft",
            value: stats.draft,
            icon: <FiXCircle />,
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filteredMembers}
        loading={loading}
        emptyMessage="No team members found."
        renderActions={(member) => (
          <div className="team-page__actions">
            <button type="button" onClick={() => setSelectedMember(member)}>
              View
            </button>

            <button
              type="button"
              onClick={() => {
                setEditingMember(member);
                setOpenTeamModal(true);
              }}
            >
              Edit
            </button>

            <button
              type="button"
              className="delete-btn"
              onClick={() => setDeleteId(member._id)}
            >
              Delete
            </button>
          </div>
        )}
      />

      <TeamModal
        isOpen={openTeamModal}
        member={editingMember}
        onClose={closeTeamModal}
        onSuccess={loadMembers}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Team Member"
        message="Delete this team member permanently?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {selectedMember && (
        <div
          className="view-team-overlay"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="view-team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-team-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="view-team-header">
              <h2 id="view-team-title">Team Member Details</h2>

              <button
                type="button"
                className="view-team-close"
                onClick={() => setSelectedMember(null)}
                aria-label="Close team member details"
              >
                ✕
              </button>
            </div>

            <div className="view-team-grid">
              <div className="team-page__profile">
                {selectedMember.image ? (
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.fullName || "Team member"}
                    className="team-page__image-preview"
                  />
                ) : (
                  <div className="team-page__image-placeholder">
                    {(selectedMember.fullName || "?").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div>
                <label>Full Name</label>
                <p>{selectedMember.fullName || "N/A"}</p>
              </div>

              <div>
                <label>Position</label>
                <p>{selectedMember.position || "N/A"}</p>
              </div>

              <div className="team-page__full-width">
                <label>Bio</label>
                <p>{selectedMember.bio || "N/A"}</p>
              </div>

              <div>
                <label>LinkedIn</label>
                <p>{selectedMember.linkedin || "N/A"}</p>
              </div>

              <div>
                <label>Twitter</label>
                <p>{selectedMember.twitter || "N/A"}</p>
              </div>

              <div>
                <label>Instagram</label>
                <p>{selectedMember.instagram || "N/A"}</p>
              </div>

              <div>
                <label>Facebook</label>
                <p>{selectedMember.facebook || "N/A"}</p>
              </div>

              <div>
                <label>Display Order</label>
                <p>{selectedMember.displayOrder ?? "N/A"}</p>
              </div>

              <div>
                <label>Status</label>
                <span
                  className={`team-page__status ${
                    selectedMember.isPublished ? "active" : "draft"
                  }`}
                >
                  {selectedMember.isPublished ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
