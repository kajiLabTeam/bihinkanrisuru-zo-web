import { getEquipment } from '@/api/getEquipment';
import { getUser } from '@/api/getUser';
import { EquipmentStatus, UserStatus } from '@/constants';
import { isEquipmentId, isStudentId } from '@/utils/isId';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

interface ScanStateType {
  mode: 'studentIdOrEquipmentId' | 'borrowEquipmentId';
  text: string;
}

const modeTextMap: Record<ScanStateType['mode'], string> = {
  studentIdOrEquipmentId: '学生証または返却したい備品QRコードをスキャン',
  borrowEquipmentId: '借りたい備品QRコードをスキャン',
};

export function useScanState() {
  const router = useNavigate();
  const [scanState, setScanState] = useState<ScanStateType>({
    mode: 'studentIdOrEquipmentId',
    text: modeTextMap.studentIdOrEquipmentId,
  });
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const studentIdRef = useRef<string | null>(null);
  const equipmentIdRef = useRef<string | null>(null);

  const handleStudentIdScan = async (studentId: string) => {
    try {
      const user = await getUser(studentId);
      if (user.status !== UserStatus.APPROVED) {
        throw new Error('この学生証は利用できません。');
      }

      studentIdRef.current = studentId;
      setScanState({ mode: 'borrowEquipmentId', text: modeTextMap.borrowEquipmentId });
      setScanMessage('学生証をスキャンしました。備品QRコードをスキャンしてください。');
    }
    catch (err) {
      setScanMessage(err instanceof Error ? err.message : '学生証スキャンに失敗しました。');
    }
  };

  const handleEquipmentIdScan = async (equipmentId: string) => {
    try {
      const equipment = await getEquipment(equipmentId);
      equipmentIdRef.current = equipmentId;

      if (equipment.status === EquipmentStatus.BORROWED && (studentIdRef.current == null)) {
        if ((equipment.borrower?.id) == null) {
          throw new Error('この備品は返却可能な状態ではありません。');
        }
        void router(`/client/equipments/${equipmentIdRef.current}/returns/${equipment.borrower.id}/confirm`);
        return;
      }

      if (equipment.status !== EquipmentStatus.AVAILABLE) {
        throw new Error('この備品は貸出可能な状態ではありません。');
      }

      void router(`/client/equipments/${equipmentIdRef.current}/loans/${studentIdRef.current}/confirm`);
    }
    catch (err) {
      setScanMessage(err instanceof Error ? err.message : '備品QRコードスキャンに失敗しました。');
    }
  };

  const handleScan = async (scannedText: string) => {
    if (isStudentId(scannedText)) {
      await handleStudentIdScan(scannedText);
    }
    else if (isEquipmentId(scannedText)) {
      await handleEquipmentIdScan(scannedText);
    }
  };

  return { scanState, scanMessage, handleScan };
}
