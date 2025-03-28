import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../redux/userSlice";
import Account from "./Account";
import "../styles/UserContent.css";

const UserContent = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Mock des comptes utilisateur
  const mockAccounts = [
    {
      id: "1",
      accountNumber: "123456789",
      balance: 48098.43,
      description: "Available Balance",
    },
    {
      id: "2",
      accountNumber: "987654321",
      balance: 32000.0,
      description: "Available Balance",
    },
    {
      id: "3",
      accountNumber: "456789123",
      balance: 1500.75,
      description: "Available Balance",
    },
  ];

  // Récupération des données utilisateur si le token est disponible
  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token]);

  // Mise à jour des champs d'édition lorsque les données utilisateur changent
  useEffect(() => {
    if (user) {
      setUserName(user.userName || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  // Gestion de la soumission du formulaire d'édition
  const handleSave = () => {
    dispatch(updateUser({ userName, firstName, lastName, token }));
    setIsEditing(false);
  };

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="user-content">
      <div className="header">
        {isEditing ? (
          <div className="edit-user-info">
            <h1>Edit user info</h1>
            <div className="input-wrapper">
              <label htmlFor="userName">User name:</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="button-wrapper">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>
              Welcome back, {user.firstName} {user.lastName}
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {mockAccounts.map((account) => (
        <Account
          key={account.id}
          title={`Argent Bank Checking (${account.accountNumber})`}
          amount={`$${account.balance.toFixed(2)}`}
          description={account.description}
        />
      ))}
    </div>
  );
};

export default UserContent;
