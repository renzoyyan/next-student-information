import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import StudentCard from "../components/StudentCard";
import Table from "../components/Table";

const headers = ["Name", "Age", "Sex", "Address", "Course", "Mobile Number"];

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await fetch("/api/student");
        const parsedRes = await res.json();

        if (parsedRes) {
          setData(parsedRes);
          setIsLoading(false);
          return parsedRes;
        }

        return;
      } catch (error) {
        console.log(error.message);
      }
    };

    getStudents();
  }, []);

  const editStudent = async (id) => {
    try {
      const res = await fetch(
        `/api/student/${id}`,
        { method: "GET" },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const parsedData = await res.json();
      router.push(`/student/${id}`);
      return parsedData;
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const res = await fetch(`/api/student/${id}`, { method: "DELETE" });
      const parsedData = await res.json();
      return parsedData;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Student Information System</title>
      </Head>
      <main className="flex flex-col justify-center max-w-5xl mx-auto mt-32">
        <header className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold">Students</h1>
          <Link href="/student/new">
            <a className="btn">+ Add Student</a>
          </Link>
        </header>
        <Table tableHeaders={headers}>
          <StudentCard
            students={data}
            editStudent={editStudent}
            deleteStudent={deleteStudent}
          />

          {isLoading && (
            <tr className="h-[350px] text-gray-400 select-none pointer-events-none relative">
              <td className="absolute inset-0 w-[150px] h-[50px] m-auto">
                Loading...
              </td>
            </tr>
          )}
          {data?.students?.length < 1 && (
            <tr className="h-[350px] text-gray-400 select-none pointer-events-none relative">
              <td className="absolute inset-0 w-[150px] h-[50px] m-auto">
                No students found
              </td>
            </tr>
          )}
        </Table>
      </main>
    </>
  );
}
