import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import Head from "next/head";
import Input from "../../components/Input";
import { studentValidationSchema } from "../../validation/student";
import Select from "../../components/Select";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const newStudent = async (data) => {
  try {
    const response = await fetch("/api/student/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const status = await response.status;
    const parsedResponse = await response.json();

    if (!parsedResponse) return;

    if (status === 500) {
      toast.error(parsedResponse?.message);
      return;
    }

    return parsedResponse;
  } catch (error) {
    toast.error(error.message);
  }
};

const NewStudentPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>New Student</title>
      </Head>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          age: "",
          address: "",
          course: "",
          sex: "Male",
          mobileNumber: "",
        }}
        validationSchema={studentValidationSchema}
        onSubmit={async (values, actions) => {
          const addUser = await newStudent(values);
          if (addUser) {
            router.replace("/");
            toast.success("Added successfully");
            actions.resetForm();
          }
        }}
      >
        {({ errors, touched, dirty, isValid, isSubmitting, handleSubmit }) => (
          <Form>
            <section className="flex flex-col justify-center h-[600px] max-w-2xl mx-auto space-y-5">
              <header className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold">New Student</h1>

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
                    {isSubmitting ? "Saving" : "Save"}
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

export default NewStudentPage;
