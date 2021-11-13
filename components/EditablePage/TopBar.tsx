import { grey } from '@ant-design/colors';
import { useEditor } from '@craftjs/core';
import { notifyError, notifySuccess } from 'actions';
import { createPage, deletePage, selectPage } from 'actions/page';
import { Button, Divider, Input, Select, Space, Modal, Switch } from 'antd';
import { AsyncDispatch, RootState } from 'interfaces';
import lz from 'lzutf8';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getPage, publicPage, savePage } from 'services';

interface TopBarProps {
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ className }) => {
  const [newPageName, setNewPageName] = useState<string>('');
  const [isModalDeleteVisible, setModalDeleteVisible] =
    useState<boolean>(false);
  const [isCurrentPagePublic, setCurrentPagePublic] = useState<boolean>(false);

  const { query } = useEditor();

  const {
    page: { pages, selectedPage },
    auth: { accessToken, loginType },
  } = useSelector((state: RootState) => state, shallowEqual);

  const dispatch = useDispatch<AsyncDispatch>();

  const {
    actions: { deserialize, history },
    canUndo,
    canRedo,
  } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  useEffect(() => {
    if (!selectedPage) {
      return;
    }

    const asyncFunc = async () => {
      try {
        const { content, isPublic } = await getPage(
          selectedPage.slug,
          accessToken,
          loginType,
        );

        setCurrentPagePublic(isPublic);

        if (!content) {
          dispatch(
            notifyError(
              'The current selected page is blank (contents of previous one might be kept)',
            ),
          );
          return;
        }

        const decodedContent = lz.decompress(lz.decodeBase64(content));

        deserialize(decodedContent);
      } catch (e: any) {
        dispatch(notifyError(e.message || 'Fail to get page'));
      }
    };

    asyncFunc();
  }, [selectedPage, accessToken, loginType, deserialize, dispatch]);

  return (
    <div className={className} style={{ backgroundColor: grey[0] }}>
      <Space>
        <Button
          onClick={() => {
            if (canUndo) {
              history.undo();
            }
          }}
        >
          Undo
        </Button>
        <Button
          onClick={() => {
            if (canRedo) {
              history.redo();
            }
          }}
        >
          Redo
        </Button>
      </Space>
      <Space>
        <Switch
          checkedChildren="Public"
          unCheckedChildren="Draft"
          checked={isCurrentPagePublic}
          onClick={async () => {
            if (!selectedPage) {
              return;
            }

            try {
              setCurrentPagePublic(!isCurrentPagePublic);

              await publicPage(
                selectedPage.slug,
                !isCurrentPagePublic,
                accessToken,
                loginType,
              );
              dispatch(notifySuccess('Change page status successfully'));
            } catch (error) {
              setCurrentPagePublic(!isCurrentPagePublic);
              dispatch(notifyError('Fail to change page status'));
            }
          }}
        />
        {!!pages.length && (
          <Select
            style={{ minWidth: '10rem' }}
            value={selectedPage?.slug}
            onSelect={(selectedOption) => {
              const content = lz.encodeBase64(lz.compress(query.serialize()));

              dispatch(selectPage(selectedOption, content));
            }}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '0.25rem' }} />
                <Space style={{ padding: '0 0.25rem' }}>
                  <Input
                    placeholder="Enter page name"
                    value={newPageName}
                    onChange={(e) => {
                      setNewPageName(e.target.value);
                    }}
                  />
                  <Button
                    onClick={async () => {
                      if (!newPageName) {
                        return;
                      }

                      dispatch(createPage(newPageName));
                      setNewPageName('');

                      if (selectedPage) {
                        const content = lz.encodeBase64(
                          lz.compress(query.serialize()),
                        );

                        await savePage(
                          selectedPage.slug,
                          content,
                          accessToken,
                          loginType,
                        );
                      }
                    }}
                  >
                    Add
                  </Button>
                </Space>
              </>
            )}
          >
            {pages.map((page, i) => (
              <Select.Option value={page.slug} key={i}>
                {page.name}
              </Select.Option>
            ))}
          </Select>
        )}
        <Button
          onClick={async () => {
            try {
              if (!selectedPage) {
                return;
              }

              const content = lz.encodeBase64(lz.compress(query.serialize()));
              window.localStorage.setItem('state', content);
              await savePage(
                selectedPage.slug,
                content,
                accessToken,
                loginType,
              );

              dispatch(notifySuccess('Your page is saved'));
            } catch (e: any) {
              dispatch(notifyError(e.message || 'Fail to save page'));
            }
          }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            setModalDeleteVisible(true);
          }}
        >
          Delete
        </Button>
      </Space>
      <Modal
        title="Are you sure to delete this page?"
        centered
        visible={isModalDeleteVisible}
        onOk={() => {
          dispatch(deletePage());
          setModalDeleteVisible(false);
        }}
        onCancel={() => {
          setModalDeleteVisible(false);
        }}
      >
        <p>Deleted page can&apos;t be reverted</p>
      </Modal>
    </div>
  );
};
