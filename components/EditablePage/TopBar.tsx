import { grey } from '@ant-design/colors';
import { useEditor } from '@craftjs/core';
import { Button, Select, Space } from 'antd';
import { RootState } from 'interfaces';
import lz from 'lzutf8';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPages } from 'services';

interface TopBarProps {
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ className }) => {
  const { query } = useEditor();

  const [pages, setPages] = useState<{ name: string; slug: string }[]>([]);

  const { accessToken, loginType } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const asyncEffect = async () => {
      const resPages = getPages(accessToken, loginType);
    };
  }, []);

  return (
    <div className={className} style={{ backgroundColor: grey[0] }}>
      <Space>
        <Button>Undo</Button>
        <Button>Redo</Button>
      </Space>
      <Space>
        <Select></Select>
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
