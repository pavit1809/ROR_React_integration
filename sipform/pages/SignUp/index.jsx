import React from "react";
import Navbar from "../../Components/Navbar";
import PersonalForm from "../../Components/PersonalForm";
import AccountForm from "../../Components/AccountForm";
import ContactForm from "../../Components/ContactForm";
import { useRouter } from "next/router";
import Axios from 'axios';

export default function SignUp() {
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
    await Axios.post("http://localhost:5000/api/v1/users/new", user)
       .then((res) => {
        console.log(res)
        router.push("/");
        setStep(0);
        setValues({});
       })
       .catch((err) => {
         console.log("Axios", err.response.data);
       });
  };

  // Handle fields change
  const handleChange = (input) => (e, dateString) => {
    
    if (input === "dob") {
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
          <Navbar current="signup" />
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
          <Navbar current="signup" />
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
          <Navbar current="signup" />
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
          <Navbar current="signup" />
          <PersonalForm
            handleChange={handleChange}
            values={values}
            nextStep={nextStep}
          />
        </div>
      );
  }
}
