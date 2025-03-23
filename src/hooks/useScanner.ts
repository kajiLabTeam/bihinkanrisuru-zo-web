import { getEquipment } from '@/api/getEquipment';
import { getUser } from '@/api/getUser';
import { EquipmentStatus, SCAN_INTERVAL, UserStatus } from '@/constants';
import { isEquipmentId, isStudentId } from '@/utils/isId';
import { useRef } from 'react';
import { useZxing } from 'react-zxing';

export function useScanner({ onScanSuccess, onScanError }: {
  onScanSuccess: (type: 'studentId' | 'equipmentId', id: string) => void;
  onScanError: (message: string) => void;
}) {
  const studentIdRef = useRef<string | null>(null);
  const equipmentIdRef = useRef<string | null>(null);

  const { ref: videoRef } = useZxing({
    async onDecodeResult(result) {
      const scannedText = result.getText();
      console.log('Scanned text:', scannedText);

      try {
        if (isStudentId(scannedText)) {
          const user = await getUser(scannedText);
          if (user.status !== UserStatus.APPROVED) {
            onScanError('この学生証は利用できません。');
            return;
          }
          studentIdRef.current = scannedText;
          onScanSuccess('studentId', scannedText);
        }
        else if (isEquipmentId(scannedText)) {
          const equipment = await getEquipment(scannedText);
          if (equipment.status !== EquipmentStatus.AVAILABLE) {
            onScanError('この備品は貸出可能な状態ではありません。');
            return;
          }
          equipmentIdRef.current = scannedText;
          onScanSuccess('equipmentId', scannedText);
        }
      }
      catch (error) {
        onScanError(error instanceof Error ? error.message : 'スキャンに失敗しました。');
      }
    },
    timeBetweenDecodingAttempts: SCAN_INTERVAL,
  });

  return { videoRef };
}
