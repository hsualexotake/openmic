import React, { useEffect, useState } from "react";
import { getOpenMics } from "../api";

const OpenMics = () => {
  const [mics, setMics] = useState([]);

  useEffect(() => {
    const fetchMics = async () => {
      const data = await getOpenMics();
      console.log("Fetched Open Mics:", data); // Debugging line
      setMics(data);
    };
    fetchMics();
  }, []);

  return (
    <div>
      <h1>NYC Open Mics</h1>
      <ul>
        {mics.length > 0 ? (
          mics.map((mic) => (
            <li key={mic.id}>
              <strong>{mic.name}</strong> - {mic.location}, {mic.borough} <br />
              Cost: {mic.cost} | Time: {mic.time} | Date: {mic.date} <br />
              Sign-up method: {mic.sign_up_method}
              <hr />
            </li>
          ))
        ) : (
          <p>No open mics found.</p>
        )}
      </ul>
    </div>
  );
};

export default OpenMics;
