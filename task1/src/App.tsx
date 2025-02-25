import React, { useState } from "react";
import { signInWithGoogle, logOut } from "./firebaseConfig";
import CarListings from "./CarListings";
import PurchaseHistory from "./PurchaseHistory"; // ✅ Import PurchaseHistory
import "./App.css"; 

function App() {
  const [user, setUser] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    setUser(userData);
  };

  return (
    <div className="container">
      <h1>Second-Hand Cars</h1>
      {user ? (
        <>
          <div className="user-info">
            <p>Welcome, {user.displayName}</p>
            <button onClick={logOut}>Log Out</button>
            <button onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? "Back to Listings" : "View Purchase History"}
            </button>
          </div>
          {showHistory ? <PurchaseHistory /> : <CarListings />}
        </>
      ) : (
        <button onClick={handleLogin}>Sign in with Google</button>
      )}
    </div>
  );
}

export default App;
