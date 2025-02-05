import { useState } from "react";
import PropTypes from "prop-types";
import "./userTable.scss";
import { FaTrash } from "react-icons/fa";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

const UserTable = ({ usersLists, onDeleteUser }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(usersLists);

  const handleDelete = async (id) => {
    try {
      const res = await apiRequest.delete(`users/${id}`);
      onDeleteUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "User delete error occurred.");
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersLists.map((user) => (
            <tr key={user.id}>
              <td>{`${user.username} ${user.isAdmin ? " -  (Admin)" : ""}`}</td>
              <td>{user.email}</td>
              <td>
                {!user.isAdmin && !user.googleId && (
                  <span
                    className="delete-icon"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash />
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <span>{error}</span>}
    </div>
  );
};

UserTable.propTypes = {
  usersLists: PropTypes.array.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default UserTable;
