import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../util/api";
import "./Register.css";

function Register() {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary mb-lg">Create a new account</h2>
        <Form className="form form--login" method="post" action="/register">
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              Name
            </label>
            <input
              type="text"
              className="form__input"
              placeholder="John Doe"
              required
              name="name"
            />
          </div>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              type="email"
              className="form__input"
              placeholder="you@example.com"
              required
              name="email"
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              name="password"
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Confirm password
            </label>
            <input
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              name="passwordConfirm"
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  try {
    const response = await register(name, email, password, passwordConfirm);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    toast.success("You have been registered successfully!");
    toast.success("You are now logged in!");
  } catch (err) {
    console.log("Register error: ", err);
    toast.error(err.response.data.message);
    return;
  }

  return redirect("/");
};

export default Register;
