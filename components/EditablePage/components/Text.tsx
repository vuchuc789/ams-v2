import { RESET_EDITOR_INDICATOR } from '@constants';
import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { Checkbox, Col, Row, Select, Space, Typography } from 'antd';
import { SyncDispatch } from 'interfaces';
import { useDispatch } from 'react-redux';

interface TextProps {
  code: boolean;
  deleted: boolean;
  disabled: boolean;
  italic: boolean;
  keyboard: boolean;
  mark: boolean;
  strong: boolean;
  text: string;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  underline: boolean;
}

export const Text: UserComponent<Partial<TextProps>> = ({
  text = '',
  code = false,
  deleted = false,
  disabled = false,
  italic = false,
  keyboard = false,
  mark = false,
  strong = false,
  type,
  underline = false,
}) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();

  const {
    query: { getOptions },
  } = useEditor();

  const { enabled } = getOptions();

  const dispatch = useDispatch<SyncDispatch>();

  return (
    <span
      ref={(el: HTMLSpanElement) => {
        connect(drag(el));
      }}
    >
      <Typography.Text
        editable={
          enabled && {
            tooltip: false,
            onChange: (value) => {
              dispatch({ type: RESET_EDITOR_INDICATOR });
              setProp((props: TextProps) => {
                props.text = value;
              });
            },
          }
        }
        code={code}
        delete={deleted}
        disabled={disabled}
        italic={italic}
        keyboard={keyboard}
        mark={mark}
        strong={strong}
        type={type}
        underline={underline}
      >
        {text}
      </Typography.Text>
    </span>
  );
};

const TextSettings: React.FC = () => {
  const {
    actions: { setProp },
    code,
    deleted,
    disabled,
    italic,
    keyboard,
    mark,
    strong,
    underline,
    type,
  } = useNode((node) => ({
    code: node.data.props.code,
    deleted: node.data.props.deleted,
    disabled: node.data.props.disabled,
    italic: node.data.props.italic,
    keyboard: node.data.props.keyboard,
    mark: node.data.props.mark,
    strong: node.data.props.strong,
    underline: node.data.props.underline,
    type: node.data.props.type,
  }));

  return (
    <Space direction="vertical">
      <Space>
        Type:
        <Select
          defaultValue={type || ''}
          onChange={(value) => {
            setProp((props: TextProps) => {
              props.type = value || undefined;
            });
          }}
        >
          {['', 'secondary', 'success', 'warning', 'danger'].map(
            (value, index) => (
              <Select.Option key={index} value={value}>
                {value || 'default'}
              </Select.Option>
            ),
          )}
        </Select>
      </Space>
      <Row>
        <Col span={12}>
          <Checkbox
            defaultChecked={code}
            onChange={(e) => {
              setProp((props: TextProps) => {
                props.code = e.target.checked;
              });
            }}
          >
            Code
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            defaultChecked={deleted}
            onChange={(e) => {
              setProp((props: TextProps) => {
                props.deleted = e.target.checked;
              });
            }}
          >
            Delete
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            defaultChecked={disabled}
            onChange={(e) => {
              setProp((props: TextProps) => {
                props.disabled = e.target.checked;
              });
            }}
          >
            Disabled
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            defaultChecked={italic}
            onChange={(e) => {
              setProp((props: TextProps) => {
                props.italic = e.target.checked;
              });
            }}
          >
            Italic
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            defaultChecked={keyboard}
            onChange={(e) => {
              setProp((props: TextProps) => {
                props.keyboard = e.target.checked;
              });
            }}
          >
            Keyboard
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            defaultChecked={mark}
            onChange={(e) => {
              setProp((props: TextProps) => {
                props.mark = e.target.checked;
              });
            }}
          >
            Mark
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            defaultChecked={strong}
            onChange={(e) => {
              setProp((props: TextProps) => {
                props.strong = e.target.checked;
              });
            }}
          >
            Strong
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            defaultChecked={underline}
            onChange={(e) => {
              setProp((props: TextProps) => {
                props.underline = e.target.checked;
              });
            }}
          >
            Underline
          </Checkbox>
        </Col>
      </Row>
    </Space>
  );
};

Text.craft = {
  name: 'Text',
  displayName: 'Text',
  props: {
    text: 'Edit me...',
    code: false,
    deleted: false,
    disabled: false,
    italic: false,
    keyboard: false,
    mark: false,
    strong: false,
    underline: false,
  },
  related: {
    settings: TextSettings,
  },
};
