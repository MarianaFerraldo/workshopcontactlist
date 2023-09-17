import React, { useState, useEffect } from "react";

export default function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    async function fetchSelectedContact() {
        try {
          const response = await fetch(`http://localhost:3001/api/users/${selectedContactId}`);
          const data = await response.json();
          setSelectedContact(data);
        } catch (error) {
          console.error(error);
        }
      }

    if (selectedContactId) {
      fetchSelectedContact();
    }
  }, [selectedContactId]);

  const handleGoBack = () => {
    setSelectedContactId(null);
  };

  if (!selectedContact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <button className="button" onClick={handleGoBack}>Go Back</button>
      <h2>{selectedContact.name}</h2>
      <p>Email: {selectedContact.email}</p>
      <p>Phone: {selectedContact.phone}</p>
    </div>
  );
}