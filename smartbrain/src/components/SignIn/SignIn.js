import React, { useState } from "react";

const SignIn = ({ onRouteChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onInputChange = (event, name) => {
    if (name === "email") {
      setEmail(event.target.value);
    } else if (name === "password") setPassword(event.target.value);
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data === "success") {
          onRouteChange("home");
        } else {
          alert("Invalid user credentials!");
        }
      })
      .catch((e) => console.log("Login error:", e));
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure ">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
              value="Sign in"
              onClick={(e) => onSubmitSignIn(e)}
            />
          </div>
          <div className="lh-copy mt3">
            <a
              href="#0"
              className="f6 link dim black db pointer"
              onClick={() => onRouteChange("register")}
            >
              Register
            </a>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;
