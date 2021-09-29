import React from 'react';
import { blue } from '@ant-design/colors';
import { useEditor } from '@craftjs/core';
import { Button, Divider, Space } from 'antd';
import { Text } from './components';

interface SideBarProps {
  className?: string;
}

export const SideBar: React.FC<SideBarProps> = ({
  className,
}: SideBarProps) => {
  const { connectors, selected, actions } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.displayName,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return (
    <Space
      direction="vertical"
      className={className}
      style={{ backgroundColor: blue[0] }}
    >
      <Divider orientation="left">Components</Divider>
      <Button
        block
        ref={(ref: HTMLElement) => {
          connectors.create(ref, <Text />);
        }}
      >
        Text
      </Button>
      {!!selected && (
        <>
          <Divider orientation="left">Settings</Divider>
          {!!selected.settings && React.createElement(selected.settings)}
          {!!selected.isDeletable && (
            <Button
              block
              onClick={() => {
                actions.delete(selected.id);
              }}
            >
              Delete
            </Button>
          )}
        </>
      )}
    </Space>
  );
};
