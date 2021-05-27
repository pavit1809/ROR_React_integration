import React from "react";
import Navbar from "../../Components/Navbar";
import PersonalForm from "../../Components/PersonalForm";
import AccountForm from "../../Components/AccountForm";
import ContactForm from "../../Components/ContactForm";
import { useRouter } from "next/router";

export default function StepForm() {
  const [step, setStep] = React.useState(0);
  const [values, setValues] = React.useState({});
  const router = useRouter();

  // Proceed to next step
  const nextStep = () => {
    const tempStep = step + 1;
    setStep(tempStep);
  };

  // Go back to prev step
  const prevStep = () => {
    const tempStep = step - 1;
    setStep(tempStep);
  };

  const submit = async () => {
    console.log(values);
    router.push("/");
    setStep(0);
    setValues({});
  };

  // Handle fields change
  const handleChange = (input) => (e, dateString) => {
    // console.log(e, dateString);
    if (input === "DOB") {
      const tempValues = {
        ...values,
        [input]: dateString,
      };
      setValues(tempValues);
    } else if (input === "state" || input === "city") {
      const tempValues = {
        ...values,
        [input]: e,
      };
      setValues(tempValues);
    } else {
      const tempValues = {
        ...values,
        [input]: e.target.value,
      };
      setValues(tempValues);
    }
  };

  switch (step) {
    case 0:
      return (
        <div>
          <Navbar current="stepform" />
          <PersonalForm
            handleChange={handleChange}
            values={values}
            nextStep={nextStep}
          />
        </div>
      );
    case 1:
      return (
        <div>
          <Navbar current="stepform" />
          <AccountForm
            handleChange={handleChange}
            values={values}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </div>
      );
    case 2:
      return (
        <div>
          <Navbar current="stepform" />
          <ContactForm
            handleChange={handleChange}
            values={values}
            prevStep={prevStep}
            submit={submit}
          />
        </div>
      );
    default:
      return (
        <div>
          <Navbar current="stepform" />
          <PersonalForm
            handleChange={handleChange}
            values={values}
            nextStep={nextStep}
          />
        </div>
      );
  }
}
