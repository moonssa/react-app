import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const [selectedCoin, setSelectedCoin] = useState(0);
  const [cash, setCash] = useState(0);
  const onSelect = (event) => {
    setSelectedCoin(event.target.value);
  };
  const onChange = (event) => {
    setCash(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1> The Coins !! {loading ? "" : `(${coins.length})`} </h1>
      {loading ? (
        <strong> Loading...</strong>
      ) : (
        <div>
          <label forHtml="coin-list">Coin List</label>
          <select id="coin-list" onChange={onSelect}>
            <option> Select coin</option>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>

          <label forHtml="amount"> Investment Amount ($) </label>
          <input
            id="amount"
            onChange={onChange}
            value={cash}
            type="number"
            placeholder="How many dollars?"
          ></input>
        </div>
      )}

      <span>
        You can buy <b />
        {selectedCoin ? cash / selectedCoin : 0} coins
      </span>
    </div>
  );
}

export default App;
