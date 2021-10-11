import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { Typography, Col, Input, Row, Space, Select } from 'antd';

interface LinkProps {
  href: string;
  title: string;
}

export const Link: UserComponent<Partial<LinkProps>> = ({
  href = '',
  title = 'Click me',
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const {
    query: { getOptions },
  } = useEditor();

  const { enabled } = getOptions();

  return (
    <Typography.Link
      ref={(ele: HTMLAnchorElement) => {
        connect(drag(ele));
      }}
      href={href}
      disabled={enabled}
      target="_blank"
    >
      {title}
    </Typography.Link>
  );
};

const LinkSettings: React.FC = () => {
  const {
    actions: { setProp },
    href,
    target,
    title,
  } = useNode((node) => ({
    href: node.data.props.href,
    target: node.data.props.target,
    title: node.data.props.title,
  }));

  return (
    <Space direction="vertical">
      <Row>
        <Col span={10}>Title:</Col>
        <Col span={14}>
          <Input
            defaultValue={title}
            onChange={(event) => {
              setProp((props: LinkProps) => {
                props.title = event.target.value;
              });
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>Href:</Col>
        <Col span={14}>
          <Input
            defaultValue={href}
            onChange={(event) => {
              setProp((props: LinkProps) => {
                props.href = event.target.value;
              });
            }}
          />
        </Col>
      </Row>
    </Space>
  );
};

Link.craft = {
  props: {
    href: '',
    title: 'Click me',
  },
  related: {
    settings: LinkSettings,
  },
};
