import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [showInput, setShowInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ show: showInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setShowInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Broadway quotes</title>
        <link rel="icon" href="/theatremasks.png" />
      </Head>

      <main className={styles.main}>
        <img src="/theatremasks.png" className={styles.icon} />
        <h3>Get a Broadway quote</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="show"
            placeholder="Enter a show"
            value={showInput}
            onChange={(e) => setShowInput(e.target.value)}
          />
          <input type="submit" value="Generate a quote" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
