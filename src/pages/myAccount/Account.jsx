import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteMyAccount, updatePassword, updateProfile } from "../../util/api";
import useLocalStorage from "../../util/hooks/useLocalStorage";
import "./Account.css";

const Account = () => {
  const [user, setUser] = useLocalStorage("user");

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [image, setImage] = useState("");

  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const updateProfileMutation = useMutation({
    mutationFn: (form) => updateProfile(form),
    onSuccess: (response) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Your profile has been updated successfully!");
      setTimeout(() => {
        navigate(0);
      }, 5000);
    },
    onError: (err) => {
      console.log(
        "Updating profile error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: ({ passwordCurrent, newPassword, passwordConfirm }) =>
      updatePassword(passwordCurrent, newPassword, passwordConfirm),
    onSuccess: () => {
      toast.success("Your password has been updated successfully!");
      setPasswordCurrent("");
      setPasswordConfirm("");
      setNewPassword("");
    },
    onError: (err) => {
      console.log(
        "Updating password error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      toast.success("Your account has been diactivated!");
      toast.success("We are sorry to see you go 🥲");
      setUser(null);
      setTimeout(() => {
        navigate(0);
      }, 5000);
    },
    onError: (err) => {
      console.log(
        "Deleting account error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("photo", image);

    updateProfileMutation.mutate(form);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    updatePasswordMutation.mutate({
      passwordCurrent,
      newPassword,
      passwordConfirm,
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account ?")) {
      deleteAccountMutation.mutate();
    }
  };

  return (
    <main className="main">
      <div className="user-view">
        {/* <Menu /> */}
        <section className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary mb-md">Your account settings</h2>
            <form
              className="form form-user-data"
              onSubmit={handleUpdateProfile}
            >
              <div className="form__group">
                <label htmlFor="name" className="form__label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form__input"
                  placeholder={user?.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form__group mb-md">
                <label htmlFor="email" className="form__label">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form__input"
                  placeholder={user?.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo"
                  src={`${process.env.REACT_APP_BACKEND}/img/users/${user?.photo}`}
                  alt={user?.name}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  className="form__upload"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>
              <div className="form__group right">
                <button
                  className="btn btn--small btn--green"
                  type="submit"
                  disabled={updateProfileMutation.isLoading}
                >
                  {!updateProfileMutation.isLoading
                    ? "Save settings"
                    : "Loading..."}
                </button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary mb-md">Password change</h2>
            <form
              className="form form-user-password"
              onSubmit={handleUpdatePassword}
            >
              <div className="form__group">
                <label htmlFor="password-current" className="form__label">
                  Current password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  minLength={8}
                  required
                  className="form__input"
                  id="password-current"
                  value={passwordCurrent}
                  onChange={(e) => setPasswordCurrent(e.target.value)}
                />
              </div>
              <div className="form__group">
                <label htmlFor="password" className="form__label">
                  New password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  minLength={8}
                  required
                  className="form__input"
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form__group mb-lg">
                <label htmlFor="password-confirm" className="form__label">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  minLength={8}
                  required
                  className="form__input"
                  id="password-confirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <div className="form__group right">
                <button
                  className="btn btn--small btn--green btn--save-password"
                  type="submit"
                  disabled={updatePasswordMutation.isLoading}
                >
                  {!updatePasswordMutation.isLoading
                    ? "Save password"
                    : "Loading..."}
                </button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container center">
            <button
              className="btn btn--small btn--red"
              onClick={handleDeleteAccount}
            >
              Delete my account
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Account;
