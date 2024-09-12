import "./index.css";
import { Button, Input, QRCode } from "antd";
import { useState } from "react";
import { DoubleRightOutlined } from "@ant-design/icons";

export default function App() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState("active");

  function handelConvert() {
    {
      text !== "" &&
        setInterval(() => {
          setLoading("active");
        }, 6000);
    }
    {
      text !== "" && setQrCode(text);
    }
    // setLoading(true);
    // setQrCode(text);

    {
      text !== "" && setLoading("loading");
    }
    setText("");
    // setLoading("loading");
  }

  return (
    <div className="App">
      <Qr qrCode={qrCode} text={text} load={loading} />
      <InputValue text={text} onIn={setText} />
      <ConvertBtn text={text} onClicking={handelConvert} />
    </div>
  );
}
function Qr({ qrCode, text, load }) {
  return (
    <>
      <QRCode className="qr" status={load} value={qrCode || "-"} />
    </>
  );
}
function InputValue({ text, onIn }) {
  return (
    <Input
      placeholder="Enter Text or link"
      allowClear
      maxLength={60}
      showCount
      value={text}
      status={text === "" ? "error" : ""}
      onChange={(e) => onIn(e.target.value)}
      prefix={<DoubleRightOutlined />}
    ></Input>
  );
}
function ConvertBtn({ onClicking }) {
  return (
    <Button className="Btn" onClick={onClicking}>
      Convert To Qr
    </Button>
  );
}
