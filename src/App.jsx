import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [url, setUrl] = React.useState();
  const [fileBase64, setfileBase64] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [response, setResponse] = React.useState();

  const convertToBase64 = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      console.log("called: ", reader);
      setfileBase64(reader.result);
    };
  };

  const onSend = () => {
    setIsLoading(true);
    var solution = fileBase64.split("base64,")[1];
    axios
      .post(
        url,
        {
          image: solution,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("api response", res);
        setResponse(
          fileBase64.split("base64,")[0] + "base64," + res.data.opImg
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <div>
        <input
          placeholder="enter url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input type="file" onChange={convertToBase64} />
        {fileBase64 && <p>file is in base64</p>}
      </div>
      <div>
        <button onClick={onSend}>send</button>
      </div>
      <div>{isLoading && <h6>Loading</h6>}</div>
      <div>
        {response && (
          <img
            src={response}
            style={{
              height: "auto",
              width: "50vw",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
