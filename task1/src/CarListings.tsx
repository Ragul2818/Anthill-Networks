import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig"; // ✅ Import auth to get user info
import "./App.css";

interface Car {
  id: string;
  name: string;
  price: number;
  image: string;
}

const CarListings: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carList: Car[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Car[];

        console.log("🔥 Fetched Cars from Firestore:", carList);
        setCars(carList);
      } catch (error) {
        console.error("❌ Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // ✅ Function to handle "Buy Now" button click
  const handleBuyNow = async (car: Car) => {
    if (!auth.currentUser) {
      alert("You must be logged in to buy a car.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        carId: car.id,
        carName: car.name,
        carPrice: car.price,
        timestamp: new Date(),
      });

      alert(`🚗 You have requested to buy: ${car.name}`);
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Available Cars</h1>
      <input
        type="text"
        placeholder="Search for a car..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="car-list">
        {cars.length === 0 ? (
          <p>⚠️ No cars available. Try adding cars in Firestore.</p>
        ) : (
          cars
            .filter((car) => car.name.toLowerCase().includes(search.toLowerCase()))
            .map((car) => (
              <div key={car.id} className="car-card">
                <img src={car.image} alt={car.name} className="car-image" />
                <h2>{car.name}</h2>
                <p>Price: ${car.price}</p>
                <button className="buy-now-btn" onClick={() => handleBuyNow(car)}>
                  Buy Now
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default CarListings;
