import express from "express";
import cors from "cors";
import database from "./database.js";

const app = express();

app.use(cors());
app.use(express.json());

const clinicsController = async (req, res) => {
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
};

app.get("/api/clinics", clinicsController);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});