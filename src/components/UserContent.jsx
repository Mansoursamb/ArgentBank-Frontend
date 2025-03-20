import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import Account from "./Account";
import "../styles/UserContent.css";

const UserContent = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-content">
      <div className="header">
        <h1>Welcome back</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {users.map((user) => (
        <Account
          key={user.id}
          title={`Argent Bank Checking (${user.accountNumber})`}
          amount={`$${user.balance}`}
          description="Available Balance"
        />
      ))}
    </div>
  );
};

export default UserContent;
