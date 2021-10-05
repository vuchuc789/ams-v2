import styles from 'styles/EditablePage.module.scss';
import {
  Col,
  Row,
  Select,
  Space as AntSpace,
  Typography,
  Checkbox,
} from 'antd';
import { useNode, UserComponent } from '@craftjs/core';

interface SpaceProps {
  children: React.ReactChildren;
  align?: 'start' | 'end' | 'center' | 'baseline';
  direction: 'vertical' | 'horizontal';
  size: 'small' | 'middle' | 'large';
  wrap: boolean;
}

export const Space: UserComponent<Partial<SpaceProps>> = ({
  children,
  align,
  direction = 'horizontal',
  size = 'small',
  wrap = false,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(el: HTMLDivElement) => {
        connect(drag(el));
      }}
      className={styles.inlineBlock}
    >
      {!!children ? (
        <AntSpace align={align} direction={direction} size={size} wrap={wrap}>
          {children}
        </AntSpace>
      ) : (
        <Typography.Text keyboard>Drag components to me</Typography.Text>
      )}
    </div>
  );
};

const SpaceSettings: React.FC = ({}) => {
  const {
    actions: { setProp },
    align,
    size,
    direction,
    wrap,
  } = useNode((node) => ({
    align: node.data.props.align,
    direction: node.data.props.direction,
    size: node.data.props.size,
    wrap: node.data.props.wrap,
  }));

  return (
    <AntSpace direction="vertical">
      <Row align="middle">
        <Col span={10}>Direction:</Col>
        <Col span={14}>
          <Select
            defaultValue={direction}
            onChange={(value) => {
              setProp((props: SpaceProps) => {
                props.direction = value;
              });
            }}
          >
            {['horizontal', 'vertical'].map((value, index) => (
              <Select.Option key={index} value={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={10}>Align:</Col>
        <Col span={14}>
          <Select
            defaultValue={align || 'default'}
            onChange={(value) => {
              setProp((props: SpaceProps) => {
                props.align = value || undefined;
              });
            }}
          >
            {['', 'start', 'end', 'center', 'baseline'].map((value, index) => (
              <Select.Option key={index} value={value}>
                {value || 'default'}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={10}>Size:</Col>
        <Col span={14}>
          <Select
            defaultValue={size}
            onChange={(value) => {
              setProp((props: SpaceProps) => {
                props.size = value;
              });
            }}
          >
            {['small', 'middle', 'large'].map((value, index) => (
              <Select.Option key={index} value={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Checkbox
        defaultChecked={wrap}
        onChange={(e) => {
          setProp((props: SpaceProps) => {
            props.wrap = e.target.checked;
          });
        }}
      >
        Wrap
      </Checkbox>
    </AntSpace>
  );
};

Space.craft = {
  props: {
    direction: 'horizontal',
    size: 'small',
    wrap: false,
  },
  related: {
    settings: SpaceSettings,
  },
};
