import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

interface QrReaderProps {
  classes?: string;
}

const QrReader = (props: QrReaderProps) => {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    console.log(result);
    // setScannedResult(result?.data);
    const scannedData = result?.data;
    if (scannedData && isValidUrl(scannedData)) {
      return window.open(scannedData);
    } else {
      setScannedResult("Your QR code is not a valid URL");
    }
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
      });
      scanner.current.start();
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  useEffect(() => {
    const drawVideoOnCanvas = () => {
      if (videoEl.current && canvasEl.current) {
        const context = canvasEl.current.getContext("2d");
        if (context) {
          context.drawImage(videoEl.current, 0, 0, canvasEl.current.width, canvasEl.current.height);
        }
      }
      requestAnimationFrame(drawVideoOnCanvas);
    };

    drawVideoOnCanvas();
  }, []);

  return (
    <div className={`qr-reader`}>
      <video ref={videoEl} className="hidden"></video>
      <canvas ref={canvasEl} className={`${props.classes} w-[80vw] aspect-video`}></canvas>
      <div ref={qrBoxEl} className="qr-box"></div>

      {scannedResult && (
        <div className="mt-4 p-2">
          <p className="text-lg font-semibold">Scanned Result:</p>
          <p>{scannedResult}</p>
        </div>
      )}
    </div>
  );
};

export default QrReader;