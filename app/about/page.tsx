import AboutForm from "../components/AboutForm";

export default async function About() {
  return (
    <div>
      <p className=" text-md font-semibold">This is an about page </p>

      <AboutForm />
    </div>
  );
}
