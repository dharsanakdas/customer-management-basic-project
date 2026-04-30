import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    //connect to backend API
    try {
      const res = await axios.post("https://customer-management-basic-project.onrender.com/customers", form);

      console.log("Response from server:", res); // Debugging line
      setCustomers([...customers, res.data]);
      setForm({ name: "", email: "", phone: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  //get customers from backend API
  const [customers, setCustomers] = useState([]);
  React.useEffect(() => {
    //error handling
    try {
      axios.get("https://customer-management-basic-project.onrender.com/customers").then((res) => {
        setCustomers(res.data);
      });
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }, []);

  const handleDelete = (id) => {
    try {
      axios.delete(`https://customer-management-basic-project.onrender.com/customers/${id}`).then(() => {
        setCustomers(customers.filter((customer) => customer.id !== id));
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  return (
    // list of customers with delete button
    <>
      <div className="header">
        <h1>Customer Management</h1>
        <button onClick={() => setShowModal(true)}>+ Add Customer</button>
      </div>
      <div id="tablecust">

        <table className="customer-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customers
              .filter(Boolean) // prevent crash if undefined exists
              .map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <button onClick={() => handleDelete(customer.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Customer</h2>

            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />

              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
