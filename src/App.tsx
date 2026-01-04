import { useState } from "react";
import "./App.css";
import Header from "./Header";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("get");
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(false);

  const syntaxHighlight = (json: any) => {
    json = JSON.stringify(json, null, 2);

    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match: any) => {
        let cls = "json-number";
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? "json-key" : "json-string";
        } else if (/true|false/.test(match)) {
          cls = "json-boolean";
        } else if (/null/.test(match)) {
          cls = "json-null";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };

  const showJSON = (data: any) => {
    const el = document.getElementById("json");
    if (el) {
      el.innerHTML = syntaxHighlight(data);
    }
  };

  const sendRequest = async () => {
    try {
      setLoading(true);

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const options: RequestInit = {
        method,
        headers,
      };

      if (method !== "GET" && method !== "DELETE") {
        options.body = JSON.stringify(request);
      }

      const res = await fetch(url, options);

      const data = await res.json();
      showJSON(data);
    } catch (error) {
      showJSON({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="window-root">
      <Header />
      <div className="content">
        {loading && <div className="loader"></div>}
        <div className="url-row">
          <input
            className="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <select
            className="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value={"get"} label="GET" />
            <option value={"post"} label="POST" />
            <option value={"put"} label="PUT" />
            <option value={"delete"} label="DELETE" />
          </select>
        </div>
        <div className="payload-container">
          <p className="payload-heading">Payload</p>
          <textarea
            className="payload"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
        </div>
        <button className="ping-btn" onClick={sendRequest}>
          PING
        </button>
        <div className="payload-container">
          <h3 className="payload-heading">Response</h3>
          <div className="payload custom-scroll">
            <pre id="json" className="json-viewer"></pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
