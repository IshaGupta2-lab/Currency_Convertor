import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const currencies = ["USD","EUR","INR","GBP","JPY","AUD","CAD"];

    const handleConvert = async () => {
        if (!amount) {
            setError("Please enter an amount.");
            setResult(null);   

            return;     
        }

        setError(null);
        setResult(null);

        try {
            const response = await axios.get("http://localhost:5000/convert", {
                params: { from: fromCurrency, to: toCurrency, amount },
            });
            
            setResult(response.data.result);
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="converter-container">
            <h2>Currency Converter</h2>
            <div className="converter-box">
                <input
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    {currencies.map((cur) => (
                        <option key={cur} value={cur}>
                            {cur}
                        </option>
                    ))}
                </select>
            </div>
            <div className="converter-box">
                <input
                    type="text"
                    placeholder="Result"
                    
                    value={result !== null ? result.toFixed(2) : ""}
                    readOnly
                />
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {currencies.map((cur) => (
                        <option key={cur} value={cur}>
                            {cur}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleConvert}>Convert</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default App;