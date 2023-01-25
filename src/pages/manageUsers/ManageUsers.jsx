import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import UserCard from "../../components/userCard/UserCard";
import { useGlobalContext } from "../../context/UserContext";
import { getAllUsers } from "../../util/api";
import "./ManageUsers.css";

const ManageUsers = () => {
  const { rerender } = useGlobalContext();
  const [editing, setEditing] = useState(false);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    cacheTime: 1000 * 60 * 20,
  });

  if (error) {
    console.log("Getting all users error: ", error);
    toast.error(error.response ? error.response.data.message : error.message);
  }

  useEffect(() => {
    refetch();
  }, [refetch, rerender]);

  return !isLoading || editing ? (
    <main className="main">
      <section className="section-users">
        <h2 className="heading-secondary mb-xlg">Manage all users</h2>
        <div className="section-users__users-wrapper">
          {data.data.map((user, i) => (
            <UserCard key={user._id} user={user} setEditing={setEditing} />
          ))}
        </div>
      </section>
    </main>
  ) : (
    <Spinner />
  );
};

export default ManageUsers;
