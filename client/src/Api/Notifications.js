import axios from 'axios';

export const fetchNotifications = async (page = 1, limit = 5) => {
  const res = await axios.get(`https://retailshieldcybersecurity.onrender.com/api/notifications?page=${page}&limit=${limit}`);
  return res.data;
};


export const fetchNotificationById = async (id) => {
  const res = await axios.get(`https://retailshieldcybersecurity.onrender.com/api/notifications/user/${id}`);
  return res.data;
};

export const markAsRead = async (id) => {
  try {
    await axios.patch(`https://retailshieldcybersecurity.onrender.com/api/notifications/${id}/read`);
  } catch (err) {
    console.error('Failed to mark as read:', err);
  }
};

// ✅ NEW function
export const fetchUnreadCount = async () => {
  try {
    const res = await axios.get("https://retailshieldcybersecurity.onrender.com/api/notifications/unread-count");
    return res.data.count;
  } catch (err) {
    console.error("Failed to fetch unread notification count", err);
    return 0;
  }
};
