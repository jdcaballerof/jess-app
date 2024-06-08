import React, { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  // facingMode: "user"  // user: front, { exact: "environment" }: back
};

export const WebcamCapture = () => {
  const webcamRef = React.useRef<any>(null);

  const [ss, setSs] = useState('')
  const [disabledRecord, setDisabledRecord] = useState(false)
  const [facingMode, _setFacingMode] = useState<'user'|'environment'>('user');
  const switchFacingMode = () => {
    const mode = facingMode=='user' ? 'environment' : 'user'
    _setFacingMode(mode)
  }

  const capture = React.useCallback( () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setSs(imageSrc as string)
  }, [webcamRef]);


  //ToDo: Sustituir Webcam por la img y boton de volver a tomar foto (ss = undefined) (si !!img)
  return (
  <>
    { disabledRecord ?
      <div className="flex-center" style={styles.skeleton} >
        <i className="pi pi-eye-slash" style={{fontSize: '5rem'}}/>
      </div>
      : 
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          height={720}
          mirrored={facingMode=='user'}
          videoConstraints={{...videoConstraints, facingMode }}
        />
        <div className="flex-center gap-2">
          <button onClick={capture} className="bg-blue-700" style={styles.btn} >Capture photo</button>
          <button onClick={switchFacingMode} className="bg-slate-500" style={styles.btn} >Switch camera</button>
        </div>
      </>
    }


    <button onClick={() => setDisabledRecord(prev => !prev)} className="bg-purple-700 mx-auto" style={styles.btn} >{disabledRecord ? 'Open':'Close'} camera</button>

    { !!ss &&  <img src={ss} alt="screenshot" width='' height='' /> }
  </>
  );
};

//  
const styles:Record<string, React.CSSProperties> = {
  btn: {
    display:'block',
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '.5rem',
    borderRadius: '.5rem',
    fontWeight: 'bold'
  },
  skeleton: {
    backgroundColor: 'gray',
    width: '100%',
    height: '355px',
  }
}