import React, { useState } from "react";

const Register = ({ onRouteChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onInputChange = (event, name) => {
    if (name === "email") {
      setEmail(event.target.value);
    } else if (name === "password") setPassword(event.target.value);
    else if (name === "name") setName(event.target.value);
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          onRouteChange("home");
        } else {
          alert("Please fill in the user details!");
        }
      })
      .catch((e) => console.log("Register error:", e));
  };
  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="name"
                name="name"
                id="name"
                onChange={(event) => onInputChange(event, "name")}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={(event) => onInputChange(event, "email")}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" HTMLfor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={(event) => onInputChange(event, "password")}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
              onClick={(e) => onSubmitRegister(e)}
            />
          </div>
          <div className="lh-copy mt3">
            <a
              href="#0"
              className="f6 link dim black db pointer"
              onClick={() => onRouteChange("signin")}
            >
              Sign In
            </a>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
