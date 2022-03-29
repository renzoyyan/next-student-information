import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import Input from "../../components/Input";
import { studentValidationSchema } from "../../validation/student";
import Select from "../../components/Select";

const EditStudentPage = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const {
    query: { studentId },
  } = router;

  useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await fetch(
          `/api/student/${studentId}`,
          { method: "GET" },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const parsedData = await res.json();
        if (parsedData) {
          setData(parsedData);
          setIsLoading(false);
          return parsedData;
        }

        return;
      } catch (error) {
        console.log(error.message);
      }
    };

    if (router.isReady) {
      getStudent();
    } else return;
  }, [router]);

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const currStudent = data?.currentStudent;
  return (
    <>
      <Head>
        <title>{`Student ${currStudent?.firstName} ${currStudent?.lastName}`}</title>
      </Head>
      <Formik
        initialValues={{
          firstName: currStudent?.firstName ?? "",
          lastName: currStudent?.lastName ?? "",
          age: currStudent?.age ?? "",
          address: currStudent?.address ?? "",
          course: currStudent?.course ?? "",
          sex: currStudent?.sex ?? "",
          mobileNumber: currStudent?.mobileNumber ?? "",
        }}
        validationSchema={studentValidationSchema}
        onSubmit={async (values) => {
          try {
            const res = await fetch(`/api/student/${studentId}`, {
              method: "PATCH",
              body: JSON.stringify(values),
              headers: { "Content-Type": "application/json" },
            });

            const status = res.status;
            const parsedData = await res.json();

            if (status === 500) {
              toast.error(parsedData?.message);
            } else {
              toast.success(parsedData?.message);
              router.replace("/");
              return parsedData;
            }

            return;
          } catch (error) {
            toast.error(error.message);
          }
        }}
      >
        {({ errors, touched, dirty, isValid, isSubmitting, handleSubmit }) => (
          <Form>
            <section className="flex flex-col justify-center h-[600px] max-w-2xl mx-auto space-y-5">
              <header className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold">{`Student ${currStudent?.firstName} ${currStudent?.lastName}`}</h1>

                <div className="space-x-4">
                  <Link href="/">
                    <a className="text-sm text-gray-500">Cancel</a>
                  </Link>
                  <button
                    type="submit"
                    disabled={!(dirty && isValid) || isSubmitting}
                    onClick={handleSubmit}
                    className={`px-8 btn ${
                      !(dirty && isValid) && "btn-disabled"
                    } ${isSubmitting && "btn-disabled"}`}
                  >
                    {isSubmitting ? "Updating" : "Update"}
                  </button>
                </div>
              </header>

              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="First Name"
                  name="firstName"
                  error={Boolean(errors.firstName && touched.firstName)}
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  error={Boolean(errors.lastName && touched.lastName)}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="Age"
                  name="age"
                  type="number"
                  error={Boolean(errors.age && touched.age)}
                />
                <Input
                  label="Mobile Number"
                  name="mobileNumber"
                  error={Boolean(errors.mobileNumber && touched.mobileNumber)}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="Course"
                  name="course"
                  error={Boolean(errors.course && touched.course)}
                />
                <Select name="sex" error={Boolean(errors.sex && touched.sex)} />
              </div>
              <Input
                label="Address"
                name="address"
                error={Boolean(errors.address && touched.address)}
              />
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditStudentPage;
