import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../util/api";
import "./Login.css";

function Login() {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary mb-lg">Log into your account</h2>
        <Form className="form form--login" method="post" action="/login">
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
            <button className="btn btn--green" type="submit">
              Log in
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await login(email, password);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    toast.success("You have been logged in successfully!");
  } catch (err) {
    console.log("Login error: ", err);
    toast.error(err.response.data.message);
    return;
  }

  return redirect("/");
};

export default Login;
