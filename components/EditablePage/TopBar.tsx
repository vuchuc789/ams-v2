import { grey } from '@ant-design/colors';

interface TopBarProps {
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ className }: TopBarProps) => {
  return (
    <div className={className} style={{ backgroundColor: grey[0] }}>
      Top bar
    </div>
  );
};
