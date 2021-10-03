import { useNode, UserComponent } from '@craftjs/core';
import { Typography } from 'antd';

interface ParagraphProps {
  children: React.ReactNode;
}

export const Paragraph: UserComponent<Partial<ParagraphProps>> = ({
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(el: HTMLDivElement) => {
        connect(drag(el));
      }}
    >
      {children ? (
        <Typography.Paragraph>{children}</Typography.Paragraph>
      ) : (
        <Typography.Text keyboard>Drag text to me</Typography.Text>
      )}
    </div>
  );
};
