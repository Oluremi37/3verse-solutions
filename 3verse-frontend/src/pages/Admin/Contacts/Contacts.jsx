/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiInbox, FiEye } from "react-icons/fi";

import {
  getContacts,
  deleteContact,
  markAsRead,
} from "../../../services/contactService";

import PageHeader from "../../../components/Admin/PageHeader/PageHeader";
import StatsCards from "../../../components/Admin/StatsCards/StatsCards";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import ConfirmModal from "../../../components/Admin/ConfirmModal/ConfirmModal";

import "./Contacts.css";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadContacts = async () => {
    try {
      setLoading(true);

      const data = await getContacts();

      setContacts(data.contacts || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const keyword = search.toLowerCase();

    return (
      contact.fullName.toLowerCase().includes(keyword) ||
      contact.email.toLowerCase().includes(keyword) ||
      contact.subject.toLowerCase().includes(keyword)
    );
  });

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      toast.success("Contact marked as read.");

      loadContacts();
    } catch (error) {
      console.error(error);

      toast.error("Failed to mark contact as read.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteContact(deleteId);

      toast.success("Contact deleted successfully.");

      setDeleteId(null);

      loadContacts();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete contact.");
    }
  };

  const columns = [
    {
      key: "fullName",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "subject",
      label: "Subject",
    },
    {
      key: "status",
      label: "Status",
      render: (contact) =>
        contact.isRead ? (
          <span className="read">Read</span>
        ) : (
          <span className="unread">Unread</span>
        ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (contact) => new Date(contact.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="contacts-page">
      <PageHeader
        title="Contacts"
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Search contacts..."
      />

      <StatsCards
        cards={[
          {
            title: "Total Contacts",
            value: contacts.length,
            icon: <FiMail />,
            color: "#2563eb",
          },
          {
            title: "Unread",
            value: contacts.filter((c) => !c.isRead).length,
            icon: <FiInbox />,
            color: "#dc2626",
          },
          {
            title: "Read",
            value: contacts.filter((c) => c.isRead).length,
            icon: <FiEye />,
            color: "#16a34a",
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filteredContacts}
        loading={loading}
        emptyMessage="No contacts found."
        renderActions={(contact) => (
          <div className="actions">
            <button onClick={() => setSelectedContact(contact)}>View</button>

            {!contact.isRead && (
              <button onClick={() => handleRead(contact._id)}>Mark Read</button>
            )}

            <button
              className="delete-btn"
              onClick={() => setDeleteId(contact._id)}
            >
              Delete
            </button>
          </div>
        )}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Contact"
        message="Are you sure you want to permanently delete this contact?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {selectedContact && (
        <div className="contact-modal">
          <div className="modal-content">
            <h2>{selectedContact.fullName}</h2>

            <p>
              <strong>Email:</strong> {selectedContact.email}
            </p>

            <p>
              <strong>Phone:</strong> {selectedContact.phone || "N/A"}
            </p>

            <p>
              <strong>Subject:</strong> {selectedContact.subject}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <p>{selectedContact.message}</p>

            <button onClick={() => setSelectedContact(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
