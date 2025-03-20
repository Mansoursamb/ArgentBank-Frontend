import React, { useEffect, useState } from "react";
import Account from "./Account";
import { getUsers } from "../api";
import "../styles/UserContent.css";

const UserContent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
