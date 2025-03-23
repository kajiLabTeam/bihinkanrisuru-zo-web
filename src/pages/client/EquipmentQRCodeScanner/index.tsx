import { Toast } from '@/components/Toast';
import { useCamera } from '@/hooks/useCamera';
import { Button, Spinner } from '@radix-ui/themes';
import styles from './index.module.scss';

export default function EquipmentQRCodeScannerPage() {
  const {
    isToastOpen,
    isLoading,
    videoRef,
    scanState,
    scanMessage,
    error,
    isCameraOn,
    handleCameraToggle,
    onClose,
  } = useCamera();

  const cameraButtonLabel = isCameraOn ? 'カメラを停止' : 'カメラを開始';

  return (
    <div className={styles.container}>
      <h1>備品貸出・返却ページ</h1>
      <h3>{scanState.text}</h3>
      <Button onClick={handleCameraToggle} type="button">
        {cameraButtonLabel}
      </Button>
      {isLoading && <Spinner size="3" />}
      {!isLoading && <video autoPlay playsInline ref={videoRef} />}
      {isToastOpen && (error != null) && (
        <Toast color="red" message={error} onClose={onClose} />
      )}
      {isToastOpen && (scanMessage != null) && (
        <Toast color="green" message={scanMessage} onClose={onClose} />
      )}
    </div>
  );
}
