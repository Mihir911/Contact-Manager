import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [toast, setToast] = useState({ text: "", type: "" }); 

  const fetchContacts = async () => {
    try {
      const res = await axios.get("https://contact-manager-quli.onrender.com/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://contact-manager-quli.onrender.com/api/contacts", form);
      setToast({ text: "Contact added successfully!", type: "success" });
      setForm({ name: "", email: "", phone: "", message: "" });
      setShowForm(false);
      fetchContacts();
    } catch (err) {
      setToast({ text: err.response?.data?.message || "Failed to add contact", type: "error" });
    }

    setTimeout(() => setToast({ text: "", type: "" }), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md py-4 px-6 relative flex items-center">
  <h1 className="text-2xl font-bold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
    Contact Manager
  </h1>

  
  <div className="ml-auto">
    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
      Profile
    </button>
  </div>
</nav>

      {/* Toast Message */}
      {toast.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white shadow-lg transition`}
          style={{ backgroundColor: toast.type === "success" ? "#22c55e" : "#ef4444" }}
        >
          {toast.text}
        </div>
      )}

      <div className="flex-1 max-w-5xl mx-auto px-4 py-6">
     
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer border"
            >
              <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
              {c.email && <p className="text-gray-500 text-sm mt-1">Email: {c.email}</p>}
              <p className="text-gray-500 text-sm mt-1">Phone: {c.phone}</p>
              {c.message && <p className="text-gray-600 mt-2">{c.message}</p>}
            </div>
          ))}
        </div>

   
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition text-lg font-semibold"
        >
          + Add Contact
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative animate-fade-in">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
            >
              x
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Contact</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-2 font-semibold hover:bg-green-700 transition"
              >
                Save Contact
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
