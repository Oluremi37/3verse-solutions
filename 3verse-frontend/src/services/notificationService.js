import { getContacts } from "./contactService";
import { getQuotes } from "./quoteService";
import { getSchedules } from "./scheduleService";

export const getNotifications = async () => {
  const [contactsData, quotesData, schedulesData] = await Promise.all([
    getContacts(),
    getQuotes(),
    getSchedules(),
  ]);

  const contacts = contactsData.contacts || [];
  const quotes = quotesData.quotes || [];
  const schedules = schedulesData.schedules || [];

  const unreadContacts = contacts.filter((contact) => !contact.isRead);

  const pendingQuotes = quotes.filter((quote) => quote.status === "Pending");

  const pendingSchedules = schedules.filter(
    (schedule) => schedule.status === "Pending",
  );

  return {
    unreadContacts,
    pendingQuotes,
    pendingSchedules,

    total:
      unreadContacts.length + pendingQuotes.length + pendingSchedules.length,
  };
};
