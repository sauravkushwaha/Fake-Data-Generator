import { useState } from "react";

export default function DataGenerator() {
  const [count, setCount] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `https://fakerapi.it/api/v1/persons?_quantity=${count}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const mapped = json.data.map((p, i) => ({
        id: i + 1,
        name: `${p.firstname} ${p.lastname}`,
        email: p.email,
        phone: p.phone,
      }));
      setRows(mapped);
    } catch (e) {
      setError("Failed to fetch data. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setRows([]);
    setError("");
  }

  return (
    <>
      <nav className="nav">
        <div className="brand">Saurav Kushwaha</div>
        <div className="links">
        <a
          href="https://github.com/sauravkushwaha"
          target="_blank"
          rel="noopener"
          className="prime"
          aria-label="GitHub"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/sauravkushwaha/"
          target="_blank"
          rel="noopener"
          className="prime"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
        <a
          href="https://saurav-portfolio-nj68.vercel.app/"
          target="_blank"
          rel="noopener"
          className="prime"
          aria-label="Portfolio"
        >
          Portfolio
        </a>
        </div>
      </nav>

      <div className="wrap">
        <header className="hdr">
          <h1>Fake Data Generator</h1>
          <p className="sub">
            Generate Names, Emails & Phone Numbers via Faker API — Assignment
            for Anslation
          </p>
        </header>

        <div className="controls">
          <label className="label">
            Count&nbsp;:&nbsp;
            <input
              type="number"
              min="1"
              value={count}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                setCount(Math.max(1, Number.isNaN(n) ? 1 : n));
              }}
            />
          </label>

          <button className="btn primary" onClick={generate} disabled={loading}>
            {loading ? "Loading..." : "Generate"}
          </button>
          <button
            className="btn Clear"
            onClick={clearAll}
            disabled={loading || rows.length === 0}
          >
            Clear
          </button>

          {error && <span className="err">{error}</span>}
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.phone}</td>
                </tr>
              ))}
              {rows.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No data yet. Click Generate.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
