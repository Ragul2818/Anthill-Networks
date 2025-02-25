import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";
import "./App.css";

interface Order {
  id: string;
  carName: string;
  carPrice: number;
  timestamp: string;
}

const PurchaseHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) {
        alert("You must be logged in to view purchase history.");
        return;
      }

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const orderList: Order[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];

        console.log("🔥 Fetched Purchase History:", orderList);
        setOrders(orderList);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h1>Purchase History</h1>
      {orders.length === 0 ? (
        <p>⚠️ No purchases found.</p>
      ) : (
        <div className="history-list">
          {orders.map((order) => (
            <div key={order.id} className="history-card">
              <h2>{order.carName}</h2>
              <p>Price: ${order.carPrice}</p>
              <p>Purchased on: {new Date(order.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
