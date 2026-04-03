import express from "express";
import cors from "cors";
import database from "./database.js";

const app = express();

app.use(cors());
app.use(express.json());

const clinicsController = async (req, res) => {
  try {
    const table = "Clinics";
    const fields = [
      "ClinicID",
      "ClinicName",
      "ClinicAddress",
      "ClinicPostcode",
      "ClinicContact",
      "ClinicManagerID",
    ];

    const sql = `SELECT ${fields.join(", ")} FROM ${table}`;
    const [result] = await database.query(sql);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch clinics" });
  }
};

app.get("/api/clinics", clinicsController);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const staffController = async (req, res) => {
  try {
    const table = "Staff";
    const fields = [
      "StaffID",
      "StaffRoleID",
      "StaffFirstname",
      "StaffLastname",
      "StaffClinicID",
    ];

    const sql = `SELECT ${fields.join(", ")} FROM ${table}`;
    const [result] = await database.query(sql);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};

const createStaffController = async (req, res) => {
  try {
    const { firstname, lastname, clinicId } = req.body;

    const sql = `
      INSERT INTO Staff (StaffRoleID, StaffFirstname, StaffLastname, StaffClinicID)
      VALUES (?, ?, ?, ?)
    `;

    const values = [2, firstname, lastname, clinicId];

    const [result] = await database.query(sql, values);

    res.status(201).json({
      message: "Clinician created successfully",
      StaffID: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create clinician" });
  }
};

app.get("/api/staff", staffController);
app.post("/api/staff", createStaffController);