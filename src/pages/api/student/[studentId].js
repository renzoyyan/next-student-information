import bson from "bson";
import {
  connectDatabase,
  deleteDocument,
  getDocument,
  updateDocument,
} from "../../../utils/db";

export default async function handler(req, res) {
  const { studentId } = req.query;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  switch (req.method) {
    case "GET":
      let currentStudent;

      try {
        currentStudent = await getDocument(client, "students", studentId);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch" });
        return;
      }
      res.status(200).json({ currentStudent });
      break;
    case "PATCH":
      const { firstName, lastName, age, address, course, sex, mobileNumber } =
        req.body;
      let result;

      const updateStudent = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        address: address,
        course: course,
        sex: sex,
        mobileNumber: mobileNumber,
      };

      try {
        result = await updateDocument(
          client,
          "students",
          studentId,
          updateStudent
        );
      } catch (error) {
        res.status(500).json({ message: "Update failed" });
        return;
      }

      res.status(200).json({
        message: `Updated successfully`,
        data: updateStudent,
      });
      break;

    case "DELETE":
      let document;

      try {
        document = await deleteDocument(client, "students", studentId);
      } catch (error) {
        res.status(500).json({ message: "Delete student failed" });
        return;
      }
      res.status(200).json({ message: "Sucessfully deleted" });
      break;
    default:
      res.status(500).end("Method is not allowed");
      break;
  }
}
