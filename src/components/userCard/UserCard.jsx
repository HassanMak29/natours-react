import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { IoMdMore } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/UserContext";
import { deleteUser, updateUser } from "../../util/api";
import "./UserCard.css";

const UserCard = ({ user, setEditing }) => {
  const { rerender, setRerender } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [openMoreActions, setOpenMoreActions] = useState(null);

  const queryClient = useQueryClient();

  const editUserMutation = useMutation({
    mutationFn: ({ userId, name, email, role }) =>
      updateUser(userId, name, email, role),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setRerender(!rerender);
    },
    onError: (err) => {
      console.log("Editing user error: ", err);
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setRerender(!rerender);
    },
    onError: (err) => {
      console.log("Deleting user error: ", err);
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  const handleEditUser = () => {
    setEditing(true);
    editUserMutation.mutate({ userId: user._id, name, email, role });
  };

  const handleDeleteUser = () => {
    setEditing(true);
    deleteUserMutation.mutate(user._id);
  };

  return (
    <>
      {openMoreActions && (
        <div
          className="actions__card--overlay"
          onClick={() => setOpenMoreActions(false)}
        ></div>
      )}
      <div className={`user-card ${isEditing ? "user-card__large" : ""}`}>
        {deleteUserMutation.isLoading && (
          <div className="user__card--overlay">
            <div className="user-card__spinner--overlay">
              <BeatLoader size={20} />
            </div>
          </div>
        )}
        <div className="user-card__content">
          {!editUserMutation.isLoading ? (
            <div className="user-card__content--credentials">
              {!isEditing ? (
                <h3>{user.name}</h3>
              ) : (
                <input
                  typr="text"
                  placeholder={user.name}
                  className="user-card__input"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              )}
              {!isEditing ? (
                <p>{user.email}</p>
              ) : (
                <input
                  typr="email"
                  placeholder={user.email}
                  className="user-card__input"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              )}
            </div>
          ) : (
            <div className="user-card__content--credentials">
              <div className="user-card__spinner--top">
                <BeatLoader size={10} />
              </div>
            </div>
          )}
          <div className="user-card__content--more-info">
            <div className="user-card__content--image">
              <img
                src={`${process.env.REACT_APP_BACKEND}/img/users/${user.photo}`}
                alt={user.name}
              />
            </div>
            {!editUserMutation.isLoading ? (
              !isEditing ? (
                <p>Role: {user.role}</p>
              ) : (
                <p>
                  Role:{" "}
                  <select
                    className="user-card__select"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="guid">Guide</option>
                    <option value="lead-guide">Lead guide</option>
                  </select>
                </p>
              )
            ) : (
              <div className="user-card__spinner--middle">
                <BeatLoader size={10} />
              </div>
            )}
          </div>
        </div>
        <div className="user-card__cta">
          <div>
            <button
              className={`${
                !isEditing ? "user-card__cta--edit" : "user-card__cta--save"
              }`}
              onClick={isEditing ? handleEditUser : () => setIsEditing(true)}
              disabled={
                deleteUserMutation.isLoading || editUserMutation.isLoading
              }
            >
              {!isEditing ? "Edit" : "Save"}
            </button>
            {isEditing && (
              <button
                className={`${
                  !isEditing ? "user-card__cta--edit" : "user-card__cta--cancel"
                }`}
                onClick={() => setIsEditing(false)}
                disabled={
                  deleteUserMutation.isLoading || editUserMutation.isLoading
                }
              >
                Cancel
              </button>
            )}
          </div>
          <IoMdMore
            className="user-card__cta--more"
            size={20}
            onClick={() =>
              !deleteUserMutation.isLoading &&
              !editUserMutation.isLoading &&
              setOpenMoreActions(!openMoreActions)
            }
          />
        </div>
        {openMoreActions && <MoreActions handleDeleteUser={handleDeleteUser} />}
      </div>
    </>
  );
};

const MoreActions = ({ handleDeleteUser }) => {
  return (
    <div className="actions__card" onClick={handleDeleteUser}>
      <div className="actions__card--delete">Delete</div>
      <RiDeleteBin6Line />
    </div>
  );
};

export default UserCard;
