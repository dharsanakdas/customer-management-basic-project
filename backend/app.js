const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define routes here
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

let customers = [];
let idCounter = 1;

/*
- Name
- Email
- Phone Number

*/
//1. POST /customers – Add a new customer
app.post("/customers", (req, res) => {
  console.log("Received data:", req.body); // Debugging line
  const { name, email, phone } = req.body;
  const newCustomer = { id: idCounter++, name, email, phone };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

//2. GET /customers – Get all customers
app.get("/customers", (req, res) => {
  console.log("Fetching all customers"); // Debugging line
  res.json(customers);
});

//3. DELETE /customers/:id – Delete a customer
app.delete("/customers/:id", (req, res) => {
  console.log("Deleting customer with ID:", req.params.id); // Debugging line
  const { id } = req.params;
  customers = customers.filter((customer) => customer.id !== parseInt(id));
  res.status(204).send();
});
