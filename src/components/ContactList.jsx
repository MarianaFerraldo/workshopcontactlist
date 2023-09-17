import React from "react"; 
import { useState } from 'react'
import ContactRow from "./ContactRow";
import {useEffect} from "react";
import "../App"


export default function ContactList({ setSelectedContactId }) {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users");
        const data = await response.json();
        setContacts(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    }
    fetchContacts();
  }, []);

  if (error) {
    return (
      <div>
        <h2>Oh no! Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="3">Contact List</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
          </tr>
          {contacts.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              setSelectedContactId={setSelectedContactId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}