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
      console.log("Token in useEffect:", token); // Vérifiez si le token est disponible
      dispatch(fetchUser(token));
    } else {
      console.error("Token is null or undefined");
    }
  }, [dispatch, token]);

  // Synchronisation des champs d'édition avec les données utilisateur
  useEffect(() => {
    console.log("Updated user in UserContent:", user); // Vérifiez si les données utilisateur changent
    if (user) {
      setUserName(user.userName || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  // Gestion de la soumission du formulaire d'édition
  // Dans UserContent.jsx

  const handleSave = async () => {
    // Dispatch l'action avec les données du formulaire (userName, firstName, lastName) et le token
    const result = await dispatch(
      updateUser({ userName, firstName, lastName, token })
    );

    // Vérifie si l'action s'est terminée avec succès (fulfilled)
    if (updateUser.fulfilled.match(result)) {
      // result.payload contient l'objet utilisateur retourné par l'API après la mise à jour
      // (il contient le nouveau userName mais les anciens firstName/lastName dans ce cas)
      const updatedUser = result.payload; // Pour plus de clarté

      setIsEditing(false); // Ferme le formulaire d'édition

      // Crée l'alerte personnalisée en utilisant les données de l'utilisateur retournées par l'API
      alert(
        `User information for ${updatedUser.firstName} ${updatedUser.lastName} updated successfully!`
      );
    } else {
      // L'action a été rejetée (rejected)
      // On pourrait même utiliser result.error.message pour une alerte plus précise
      let errorMessage = "Failed to update user information.";
      if (result.payload) {
        // rejectWithValue renvoie l'erreur dans payload
        errorMessage += `\nError: ${
          typeof result.payload === "string"
            ? result.payload
            : JSON.stringify(result.payload)
        }`;
      } else if (result.error?.message) {
        errorMessage += `\nError: ${result.error.message}`;
      }
      alert(errorMessage);
    }
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
