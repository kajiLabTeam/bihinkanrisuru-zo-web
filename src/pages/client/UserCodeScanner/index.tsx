import { useUserCamera } from '@/hooks/useUserCamera';
import { Button, Spinner } from '@radix-ui/themes';
import styles from './index.module.scss';

export default function UserCodeScannerPage() {
  const {
    isLoading,
    videoRef,
    isCameraOn,
    handleCameraToggle,
  } = useUserCamera();

  const cameraButtonLabel = isCameraOn ? 'カメラを停止' : 'カメラを開始';

  return (
    <div className={styles.container}>
      <h1>ユーザ登録ページ</h1>
      <h3>登録したい学生証をスキャン</h3>
      <Button onClick={handleCameraToggle} type="button">
        {cameraButtonLabel}
      </Button>
      {isLoading && <Spinner size="3" />}
      {!isLoading && <video autoPlay playsInline ref={videoRef} />}
      {}
    </div>
  );
}
