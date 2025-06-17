import React from 'react';
import { QrCodeIcon } from 'lucide-react';
interface QRGeneratorProps {
  value: string;
  size?: number;
}
// In a real implementation, we would use a library like react-qr-code
// This is a mock component for demonstration purposes
const QRGenerator: React.FC<QRGeneratorProps> = ({
  value,
  size = 200
}) => {
  return <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg mb-3" style={{
      width: size,
      height: size
    }}>
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
          <QrCodeIcon size={size * 0.6} className="text-black" />
          <div className="absolute text-xs text-black">Mock QR Code</div>
        </div>
      </div>
      <p className="text-sm text-gray-400">Scan this code at the door</p>
    </div>;
};
export default QRGenerator;