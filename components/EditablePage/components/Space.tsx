import styles from 'styles/EditablePage.module.scss';
import {
  Col,
  Row,
  Select,
  Space as AntSpace,
  Typography,
  Checkbox,
  InputNumber,
} from 'antd';
import { useNode, UserComponent } from '@craftjs/core';

interface SpaceProps {
  children: React.ReactChildren;
  align?: 'start' | 'end' | 'center' | 'baseline';
  direction: 'vertical' | 'horizontal';
  size: 'small' | 'middle' | 'large';
  wrap: boolean;
  margin: {
    top: number;
    right: number;
    down: number;
    left: number;
  };
  padding: {
    top: number;
    right: number;
    down: number;
    left: number;
  };
}

export const Space: UserComponent<Partial<SpaceProps>> = ({
  children,
  align,
  direction = 'horizontal',
  size = 'small',
  wrap = false,
  margin = { top: 0, right: 0, down: 0, left: 0 },
  padding = { top: 0, right: 0, down: 0, left: 0 },
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
        <AntSpace
          align={align}
          direction={direction}
          size={size}
          wrap={wrap}
          style={{
            margin: `${margin?.top || 0}px ${margin?.right || 0}px ${
              margin?.down || 0
            }px ${margin?.left || 0}px`,
            padding: `${padding?.top || 0}px ${padding?.right || 0}px ${
              padding?.down || 0
            }px ${padding?.left || 0}px`,
          }}
        >
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
    margin,
    padding,
  } = useNode((node) => ({
    align: node.data.props.align,
    direction: node.data.props.direction,
    size: node.data.props.size,
    wrap: node.data.props.wrap,
    margin: node.data.props.margin,
    padding: node.data.props.padding,
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
      <Row align="middle">
        <Col span={10}>Margin:</Col>
        <Col span={14}>
          <AntSpace direction="vertical">
            <InputNumber
              defaultValue={margin?.top || 0}
              onChange={(value) => {
                setProp((props: SpaceProps) => {
                  props.margin = { ...props.margin, top: value };
                });
              }}
            />
            <InputNumber
              defaultValue={margin?.right || 0}
              onChange={(value) => {
                setProp((props: SpaceProps) => {
                  props.margin = { ...props.margin, right: value };
                });
              }}
            />
            <InputNumber
              defaultValue={margin?.down || 0}
              onChange={(value) => {
                setProp((props: SpaceProps) => {
                  props.margin = { ...props.margin, down: value };
                });
              }}
            />
            <InputNumber
              defaultValue={margin?.left || 0}
              onChange={(value) => {
                setProp((props: SpaceProps) => {
                  props.margin = { ...props.margin, left: value };
                });
              }}
            />
          </AntSpace>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={10}>Padding:</Col>
        <Col span={14}>
          <AntSpace direction="vertical">
            <InputNumber
              defaultValue={padding?.top || 0}
              min={0}
              onChange={(value) => {
                setProp((props: SpaceProps) => {
                  props.padding = { ...props.padding, top: value };
                });
              }}
            />
            <InputNumber
              defaultValue={padding?.right || 0}
              min={0}
              onChange={(value) => {
                setProp((props: SpaceProps) => {
                  props.padding = { ...props.padding, right: value };
                });
              }}
            />
            <InputNumber
              defaultValue={padding?.down || 0}
              min={0}
              onChange={(value) => {
                setProp((props: SpaceProps) => {
                  props.padding = { ...props.padding, down: value };
                });
              }}
            />
            <InputNumber
              defaultValue={padding?.left || 0}
              min={0}
              onChange={(value) => {
                setProp((props: SpaceProps) => {
                  props.padding = { ...props.padding, left: value };
                });
              }}
            />
          </AntSpace>
        </Col>
      </Row>
    </AntSpace>
  );
};

Space.craft = {
  name: 'Space',
  displayName: 'Space',
  props: {
    direction: 'horizontal',
    size: 'small',
    wrap: false,
  },
  related: {
    settings: SpaceSettings,
  },
};
