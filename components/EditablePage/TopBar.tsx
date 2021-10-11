import { grey } from '@ant-design/colors';
import { useEditor } from '@craftjs/core';
import { Button, Space } from 'antd';
import lz from 'lzutf8';

interface TopBarProps {
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ className }) => {
  const { query } = useEditor();
  return (
    <div className={className} style={{ backgroundColor: grey[0] }}>
      <Space>
        <Button>Undo</Button>
        <Button>Redo</Button>
      </Space>
      <Space>
        <Button
          onClick={() => {
            const state = lz.encodeBase64(lz.compress(query.serialize()));
            window.localStorage.setItem('state', state);
          }}
        >
          Save
        </Button>
      </Space>
    </div>
  );
};
