const StudentCard = ({ students, editStudent, deleteStudent }) => {
  return (
    <>
      {students?.students?.map((student) => (
        <tr key={student._id}>
          <td className="py-4 pr-6 text-sm xl:pr-4 whitespace-nowrap">
            {`${student.firstName} ${student.lastName}`}
          </td>
          <td className="py-4 pr-6 text-sm xl:pr-4 whitespace-nowrap">
            {student.age}
          </td>
          <td className="py-4 pr-6 text-sm xl:pr-4 whitespace-nowrap">
            {student.sex}
          </td>
          <td className="py-4 text-sm whitespace-nowrap">{student.address}</td>
          <td className="py-4 pr-6 text-sm xl:pr-4 whitespace-nowrap">
            {student.course}
          </td>
          <td className="py-4 pr-6 text-sm xl:pr-4 whitespace-nowrap">
            {student.mobileNumber}
          </td>
          <td className="py-4 pr-6 space-x-4 text-sm xl:pr-4 whitespace-nowrap">
            <button
              type="button"
              className="text-indigo-500 font-medium"
              onClick={() => editStudent(student._id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-indigo-500 font-medium"
              onClick={() => deleteStudent(student._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default StudentCard;
