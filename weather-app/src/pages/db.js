import { useState } from "react";

export default function DB() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [temp, setTemp] = useState("");
  const [result, setResult] = useState("");

  // read the db
  const handleRead = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/readWeather?city=${city}&date=${date}`);
      const data = await res.json();

      if (res.ok) setResult(JSON.stringify(data, null, 2));
      else setResult(data.error);

    } catch (err) {
      setResult(err.message);
    }
  };

  // update the temp in db
  const handleUpdate = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/updateWeather", {
        method: "PUT",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({city, date, temperate: temp}),
      });

      const data = await res.json();
      if (res.ok) setResult(data.message);
      else setResult(data.error);

    } catch (err) {
      setResult(err.message);
    }
  };

  // delete a row in db
  const handleDelete = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/deleteWeather", {
        method: "DELETE",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({city, date}),
      });

      const data = await res.json();
      if (res.ok) setResult(data.message);
      else setResult(data.error);
      
    } catch (err) {
      setResult(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Weather Database</h1>
        <div>
            <div>
                <div>
                    <input placeholder="City name e.g. Los Angeles" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div>
                    <input placeholder="Date e.g. YYYY-MM-DD" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div>
                    <button onClick={handleRead}>Read</button>
                </div>
            </div>

            <div>
                <div>
                    <input placeholder="New temp (for update) e.g. 290.83" value={temp} onChange={(e) => setTemp(e.target.value)} />
                </div>
            </div>

            <div>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>

      <pre>{result}</pre>
    </div>
  );
}