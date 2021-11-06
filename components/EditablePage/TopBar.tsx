import { grey } from '@ant-design/colors';
import { useEditor } from '@craftjs/core';
import { notifySuccess } from 'actions';
import { Button, Select, Space } from 'antd';
import { AsyncDispatch, RootState } from 'interfaces';
import lz from 'lzutf8';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getPage, savePage } from 'services';

interface TopBarProps {
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ className }) => {
  const { query } = useEditor();

  const {
    page: { pages, selectedPage },
    auth: { accessToken, loginType },
  } = useSelector((state: RootState) => state, shallowEqual);

  const dispatch = useDispatch<AsyncDispatch>();

  const {
    actions: { deserialize },
  } = useEditor();

  useEffect(() => {
    if (!selectedPage) {
      return;
    }

    const asyncFunc = async () => {
      const { content } = await getPage(
        selectedPage.slug,
        accessToken,
        loginType,
      );

      if (!content) {
        return;
      }

      const decodedContent = lz.decompress(lz.decodeBase64(content));

      deserialize(decodedContent);
    };

    asyncFunc();
  }, [selectedPage, accessToken, loginType, deserialize]);

  return (
    <div className={className} style={{ backgroundColor: grey[0] }}>
      <Space>
        <Button>Undo</Button>
        <Button>Redo</Button>
      </Space>
      <Space>
        {!!pages.length && (
          <Select value={selectedPage?.slug}>
            {pages.map((page, i) => (
              <Select.Option value={page.slug} key={i}>
                {page.name}
              </Select.Option>
            ))}
          </Select>
        )}
        <Button
          onClick={async () => {
            if (!selectedPage) {
              return;
            }

            const content = lz.encodeBase64(lz.compress(query.serialize()));
            window.localStorage.setItem('state', content);
            await savePage(selectedPage.slug, content, accessToken, loginType);

            dispatch(notifySuccess('Your page is saved'));
          }}
        >
          Save
        </Button>
      </Space>
    </div>
  );
};
