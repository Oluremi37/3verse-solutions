import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FiUsers, FiCheckCircle, FiXCircle } from "react-icons/fi";

import { getTeamMembers, deleteTeamMember } from "../../../services/teamService";

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
      setLoading(true);

      const data = await getTeamMembers();

      setMembers(data.teamMembers || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load team members.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(loadMembers);
  }, [loadMembers]);
  const filteredMembers = members.filter((member) => {
    const keyword = search.toLowerCase();

    return (
      member.fullName.toLowerCase().includes(keyword) ||
      member.position.toLowerCase().includes(keyword)
    );
  });

  const stats = {
    total: members.length,
    published: members.filter((m) => m.isPublished).length,
    draft: members.filter((m) => !m.isPublished).length,
  };

  const columns = [
    {
      key: "image",
      label: "Photo",
      render: (member) => (
        <img src={member.image} alt={member.fullName} className="team-avatar" />
      ),
    },
    {
      key: "fullName",
      label: "Name",
    },
    {
      key: "position",
      label: "Position",
    },
    {
      key: "displayOrder",
      label: "Order",
    },
    {
      key: "isPublished",
      label: "Status",
      render: (member) => (
        <span className={`status ${member.isPublished ? "active" : "draft"}`}>
          {member.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
  ];

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
          <div className="actions">
            <button onClick={() => setSelectedMember(member)}>View</button>

            <button
              onClick={() => {
                setEditingMember(member);
                setOpenTeamModal(true);
              }}
            >
              Edit
            </button>

            <button
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
        onClose={() => {
          setOpenTeamModal(false);
          setEditingMember(null);
        }}
        onSuccess={loadMembers}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Team Member"
        message="Delete this team member permanently?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={async () => {
          try {
            await deleteTeamMember(deleteId);

            toast.success("Team member deleted successfully.");

            setDeleteId(null);

            await loadMembers();
          } catch (err) {
            console.error(err);
            toast.error("Failed to delete team member.");
          }
        }}
        onCancel={() => setDeleteId(null)}
      />

      {selectedMember && (
        <div className="view-team-overlay">
          <div className="view-team-modal">
            <div className="view-team-header">
              <h2>Team Member Details</h2>

              <button
                className="close-btn"
                onClick={() => setSelectedMember(null)}
              >
                ✕
              </button>
            </div>

            <div className="view-team-grid">
              <div className="full-width">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.fullName}
                  className="team-image-preview"
                />
              </div>

              <div>
                <label>Full Name</label>
                <p>{selectedMember.fullName}</p>
              </div>

              <div>
                <label>Position</label>
                <p>{selectedMember.position}</p>
              </div>

              <div className="full-width">
                <label>Bio</label>
                <p>{selectedMember.bio}</p>
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
                <p>{selectedMember.displayOrder}</p>
              </div>

              <div className="full-width">
                <label>Status</label>

                <span
                  className={`status ${
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
