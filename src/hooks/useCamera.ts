import type { RefObject } from 'react';
import { getEquipment } from '@/api/getEquipment';
import { getUser } from '@/api/getUser';
import { EquipmentStatus, SCAN_INTERVAL, UserStatus } from '@/constants';
import { isEquipmentId, isStudentId } from '@/utils/isId';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useZxing } from 'react-zxing';

interface ScanStateType {
  mode: 'studentIdOrEquipmentId' | 'borrowEquipmentId';
  text: string;
}

const modeTextMap: Record<ScanStateType['mode'], string> = {
  studentIdOrEquipmentId: '学生証または返却したい備品QRコードをスキャン',
  borrowEquipmentId: '借りたい備品QRコードをスキャン',
};

export function useCamera() {
  const router = useNavigate();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [scanState, setScanState] = useState<ScanStateType>({ mode: 'studentIdOrEquipmentId', text: modeTextMap.studentIdOrEquipmentId });
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const studentIdRef = useRef<string | null>(null);
  const equipmentIdRef = useRef<string | null>(null);

  const handleError = useCallback((message: string) => {
    setErrorMessage(message);
    setIsToastOpen(true);
    setIsLoading(false);
  }, []);

  const handleStudentIdScan = async (studentId: string) => {
    try {
      setIsToastOpen(false);

      const user = await getUser(studentId);
      if (user.status !== UserStatus.APPROVED) {
        handleError('この学生証は利用できません。');
        return;
      }

      studentIdRef.current = studentId;
      setScanState({ mode: 'borrowEquipmentId', text: modeTextMap.borrowEquipmentId });
      setScanMessage('学生証をスキャンしました。備品QRコードをスキャンしてください。');
      setIsToastOpen(true);
    }
    catch (err) {
      handleError(err instanceof Error ? err.message : '学生証スキャンに失敗しました。もう一度試してください。');
    }
  };

  const handleEquipmentIdScan = async (equipmentId: string) => {
    try {
      setIsToastOpen(false);

      const equipment = await getEquipment(equipmentId);

      equipmentIdRef.current = equipmentId;

      if (equipment.status === EquipmentStatus.BORROWED && studentIdRef.current === null) {
        if (equipment.borrower?.id === undefined) {
          handleError('この備品は返却可能な状態ではありません。');
          return;
        }
        void router(`/client/equipments/${equipmentIdRef.current}/returns/${equipment.borrower.id}/confirm`);
      }
      if (equipment.status !== EquipmentStatus.AVAILABLE) {
        handleError('この備品は貸出可能な状態ではありません。');
        return;
      }

      if (isCameraOn)
        setIsCameraOn(false);
      void router(`/client/equipments/${equipmentIdRef.current}/loans/${studentIdRef.current}/confirm`);
    }
    catch (err) {
      handleError(err instanceof Error ? err.message : '備品QRコードスキャンに失敗しました。もう一度試してください。');
    }
  };

  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn);
  };

  const videoRef = useZxing({
    async onDecodeResult(result) {
      setScanMessage(null);

      const scannedText = result.getText();

      if (isStudentId(scannedText)) {
        await handleStudentIdScan(scannedText);
      }
      else if (isEquipmentId(scannedText)) {
        await handleEquipmentIdScan(scannedText);
      }

      setIsLoading(false);
    },
    timeBetweenDecodingAttempts: SCAN_INTERVAL,
  }).ref as RefObject<HTMLVideoElement>;

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current)
        videoRef.current.srcObject = stream;
    }
    catch {
      handleError('カメラへのアクセスに失敗しました。もう一度試してください。');
    }
  }, [videoRef, handleError]);

  const stopCamera = useCallback(() => {
    videoRef.current?.srcObject
    && (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => { track.stop(); });
  }, [videoRef]);

  useEffect(() => {
    isCameraOn ? void startCamera() : stopCamera();
    return () => {
      stopCamera();
    };
  }, [isCameraOn, startCamera, stopCamera]);

  return {
    isToastOpen,
    isLoading,
    videoRef,
    scanState,
    scanMessage,
    error: errorMessage,
    isCameraOn,
    handleCameraToggle,
    onClose: () => { setIsToastOpen(false); },
  };
}
