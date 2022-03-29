import moment from "moment";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../utils/db";

async function handler(req, res) {
  const { firstName, lastName, age, address, course, sex, mobileNumber } =
    req.body;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  switch (req.method) {
    case "GET":
      let students;

      try {
        students = await getAllDocuments(client, "students");
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch" });
      }
      res.status(200).json({ students });
      break;
    case "POST":
      if (
        !firstName ||
        firstName.trim() === "" ||
        !lastName ||
        lastName.trim() === "" ||
        !age ||
        !address ||
        address.trim() === "" ||
        !course ||
        course.trim() === "" ||
        !sex ||
        sex.trim() === "" ||
        !mobileNumber
      ) {
        res.status(422).json({ message: "Invalid input." });
        client.close();
        return;
      }

      const newStudent = {
        firstName,
        lastName,
        age,
        address,
        course,
        sex,
        mobileNumber,
        date_created: moment().format(),
      };

      let result;

      try {
        result = await insertDocument(client, "students", newStudent);
      } catch (error) {
        res.status(500).json({ message: "Adding student failed" });
        return;
      }

      res.status(201).json({ message: "Student added.", data: newStudent });
      break;

    default:
      break;
  }
}

export default handler;
