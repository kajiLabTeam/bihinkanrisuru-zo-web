import type { RefObject } from 'react';
import { getUser } from '@/api/getUser';
import { SCAN_INTERVAL, UserStatus } from '@/constants';
import { isStudentId } from '@/utils/isId';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useZxing } from 'react-zxing';
import { useToast } from './useToast';

export function useUserCamera() {
  const router = useNavigate();
  const { message, isOpen, onOpen, onClose } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const studentIdRef = useRef<string | null>(null);

  const handleError = useCallback((message: string) => {
    onOpen(message, 'red');
    setIsLoading(false);
  }, []);

  const handleStudentIdScan = async (studentId: string) => {
    try {
      onClose();
      const user = await getUser(studentId);
      if (user.status !== UserStatus.APPROVED) {
        handleError('この学生証は利用できません。');
        return;
      }

      studentIdRef.current = studentId;
      void router(`/client/users/${studentIdRef.current}/register`);
    }
    catch (err) {
      handleError(err instanceof Error ? err.message : '学生証スキャンに失敗しました。もう一度試してください。');
    }
  };

  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn);
  };

  const videoRef = useZxing({
    async onDecodeResult(result) {
      const scannedText = result.getText();

      if (isStudentId(scannedText)) {
        await handleStudentIdScan(scannedText);
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
    message,
    isOpen,
    isLoading,
    videoRef,
    isCameraOn,
    handleCameraToggle,
    onClose,
  };
}
