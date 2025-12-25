// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());             // allow requests from frontend in dev
app.use(express.json());     // parse JSON body

// In-memory demo store (replace with real DB later)
let employees = [
  { id: 1, name: 'Arun Garg', role: 'CA' },
  { id: 2, name: 'Priya Sharma', role: 'Accountant' },
];

let nextId = 3;

// GET /api/employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// GET /api/employees/:id
app.get('/api/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const emp = employees.find(e => e.id === id);
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp);
});

// POST /api/employees
app.post('/api/employees', (req, res) => {
  const { name, role } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const newEmp = { id: nextId++, name, role: role || '' };
  employees.push(newEmp);
  res.status(201).json(newEmp);
});

// PUT /api/employees/:id
app.put('/api/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = employees.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  employees[idx] = { ...employees[idx], ...req.body };
  res.json(employees[idx]);
});

// DELETE /api/employees/:id
app.delete('/api/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  employees = employees.filter(e => e.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
