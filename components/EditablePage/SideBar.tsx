import React from 'react';
import { blue } from '@ant-design/colors';
import { Element, useEditor } from '@craftjs/core';
import { Button, Divider, Space as AntSpace } from 'antd';
import { Paragraph, Text, Image, Space } from './components';
import { ROOT_NODE } from '@craftjs/utils';

interface SideBarProps {
  className?: string;
}

export const SideBar: React.FC<SideBarProps> = ({ className }) => {
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
        parent: state.nodes[currentNodeId].data.parent,
      };
    }

    return {
      selected,
    };
  });

  return (
    <AntSpace
      direction="vertical"
      className={className}
      style={{ backgroundColor: blue[0] }}
    >
      <Divider orientation="left">Components</Divider>
      <Button
        block
        ref={(ref: HTMLElement) => {
          connectors.create(ref, <Element is={Paragraph} canvas />);
        }}
      >
        Paragraph
      </Button>
      <Button
        block
        ref={(ref: HTMLElement) => {
          connectors.create(ref, <Text />);
        }}
      >
        Text
      </Button>
      <Button
        block
        ref={(ref: HTMLElement) => {
          connectors.create(ref, <Image alt="Change me" />);
        }}
      >
        Image
      </Button>
      <Button
        block
        ref={(ref: HTMLElement) => {
          connectors.create(ref, <Element is={Space} canvas />);
        }}
      >
        Space
      </Button>
      {!!selected && selected.id !== ROOT_NODE && (
        <>
          <Divider orientation="left">Settings</Divider>
          {!!selected.settings && React.createElement(selected.settings)}
          <Button
            block
            onClick={() => {
              actions.selectNode(selected.parent);
            }}
          >
            Select Parent
          </Button>
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
    </AntSpace>
  );
};
