import "./index.css";
import { Button, Input, QRCode, Space } from "antd";
import { useState } from "react";
import { DoubleRightOutlined } from "@ant-design/icons";

export default function App() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState("active");
  const [showDownload, setShowDownload] = useState(false);

  function handelConvert() {
    setShowDownload(true);

    {
      text !== "" && setQrCode(text);
    }
    // setLoading(true);
    // setQrCode(text);

    setText("");

    // setLoading("loading");
  }

  function doDownload(url, fileName) {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  const downloadCanvasQRCode = () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      doDownload(url, "QRCode.png");
    }
    setQrCode("");
    setShowDownload(false);
  };
  return (
    <div className="App">
      <div
        style={{
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showDownload && <Qr qrCode={qrCode} text={text} load={loading} />}
      </div>
      <InputValue text={text} onIn={setText} />
      <Space direction="vertical" size={15}>
        <ConvertBtn text={text} onClicking={handelConvert} />
        {showDownload && (
          <Button type="primary" onClick={downloadCanvasQRCode}>
            Download
          </Button>
        )}
      </Space>
    </div>
  );
}
function Qr({ qrCode, text, load }) {
  return (
    <>
      <QRCode
        className="qr"
        status={load}
        value={qrCode || "-"}
        bgColor="white"
        color="#000"
        id="myqrcode"
        size={180}
        bordered={true}
      />
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
