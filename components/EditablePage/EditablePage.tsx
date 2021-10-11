import { Editor, Element, Frame } from '@craftjs/core';
import { TopBar } from './TopBar';
import { SideBar } from './SideBar';
import styles from 'styles/EditablePage.module.scss';
import {
  Container,
  Paragraph,
  Text,
  Image,
  Space,
  Row,
  Column,
  Title,
  Link,
} from './components';
import React from 'react';
import { RenderNode } from './RenderNode';
import { useSelector } from 'react-redux';
import { RootState } from 'interfaces';

interface EditablePageProps {
  isEditable?: boolean;
  state?: string;
  className?: string;
}

export const EditablePage: React.FC<EditablePageProps> = ({
  isEditable = false,
  state,
  className,
}) => {
  const { x, y, width, height } = useSelector(
    (state: RootState) => state.editorIndicator,
  );

  return (
    <div className={className}>
      {!!isEditable && (
        <>
          <div
            className={styles.indicatorTop}
            style={{ width, top: y, left: x }}
          ></div>
          <div
            className={styles.indicatorRight}
            style={{ height, top: y, left: x + width }}
          ></div>
          <div
            className={styles.indicatorBottom}
            style={{ width, top: y + height, left: x }}
          ></div>
          <div
            className={styles.indicatorLeft}
            style={{ height, top: y, left: x }}
          ></div>
        </>
      )}
      <Editor
        resolver={{
          Container,
          Text,
          Paragraph,
          Image,
          Space,
          Row,
          Column,
          Title,
          Link,
        }}
        onRender={RenderNode}
        enabled={isEditable}
      >
        {isEditable && <TopBar className={styles.topBar} />}
        <div className={styles.editor}>
          <Frame json={state}>
            <Element
              is={Container}
              className={styles.container}
              canvas
            ></Element>
          </Frame>
          {isEditable && <SideBar className={styles.sideBar} />}
        </div>
      </Editor>
    </div>
  );
};
