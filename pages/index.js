import Head from 'next/head'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QRCode from 'qrcode.react';

export default function Home() {
  const [text, seText] = useState("")
  const [qrText, setQrText] = useState("")
  useEffect(() => {
    console.log({text})
  }, [])
  const updateText = (e) =>{
    seText(e.target.value)
  }
  //generateSmartCode
  const generateSmartCode = (e) =>{
    setQrText(text)
    seText("");
  }

  // download QR code
  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>mood</title>
        <meta name="description" content="Mood app read your mood by using your webcam or front camera to take picture and the fetch you quotable quotes that matches your mood"
         />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.main_container}>
        {/* header area */}
        <h2> QR Smartee </h2>
        {/* input for messages */}
        <div  className={styles.form_container}>
          <input type="text" value={text} onChange={updateText} className="form-control"/>
          <button className="btn btn-primary" disabled={text == ""} onClick={generateSmartCode}>Generate Qr Code</button>
        </div>
        {/* qrcode display area */}
        <div className={styles.qr_image_container}>
          {
            qrText!= "" &&
            <>
            <div className={styles.qr_text}>
              <h4>{qrText}</h4>
            </div>
            <QRCode
              id="qrCodeEl"
              size={150}
              value={qrText}
              onClick={downloadQRCode}
            />

            <p>Click the image to download</p>
            

            </>
          }
          
        </div>
      </div>
    </div>
  )
}
