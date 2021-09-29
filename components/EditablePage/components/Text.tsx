import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { Checkbox, Col, Row, Typography } from 'antd';

interface TextProps {
  text: string;
  code: boolean;
  deleted: boolean;
  disabled: boolean;
  keyboard: boolean;
  mark: boolean;
  strong: boolean;
  underline: boolean;
  type: 'secondary' | 'success' | 'warning' | 'danger';
}

export const Text: UserComponent<Partial<TextProps>> = ({
  text = '',
  code = false,
  deleted = false,
  disabled = false,
  keyboard = false,
  mark = false,
  strong = false,
  underline = false,
}: Partial<TextProps>) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();

  const {
    query: { getOptions },
  } = useEditor();

  const { enabled } = getOptions();

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
              setProp((props) => {
                props.text = value;
              });
            },
          }
        }
        code={code}
        delete={deleted}
        disabled={disabled}
        keyboard={keyboard}
        mark={mark}
        strong={strong}
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
    keyboard,
    mark,
    strong,
    underline,
  } = useNode((node) => ({
    code: node.data.props.code,
    deleted: node.data.props.deleted,
    disabled: node.data.props.disabled,
    keyboard: node.data.props.keyboard,
    mark: node.data.props.mark,
    strong: node.data.props.strong,
    underline: node.data.props.underline,
  }));

  return (
    <Row>
      <Col span={12}>
        <Checkbox
          defaultChecked={code}
          onChange={(e) => {
            setProp((props) => {
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
            setProp((props) => {
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
            setProp((props) => {
              props.disabled = e.target.checked;
            });
          }}
        >
          Disabled
        </Checkbox>
      </Col>
      <Col span={12}>
        <Checkbox
          defaultChecked={keyboard}
          onChange={(e) => {
            setProp((props) => {
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
            setProp((props) => {
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
            setProp((props) => {
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
            setProp((props) => {
              props.underline = e.target.checked;
            });
          }}
        >
          Underline
        </Checkbox>
      </Col>
    </Row>
  );
};

Text.craft = {
  props: {
    text: 'Edit me...',
    code: false,
    deleted: false,
    disabled: false,
    keyboard: false,
    mark: false,
    strong: false,
    underline: false,
  },
  displayName: 'Text',
  related: {
    settings: TextSettings,
  },
};
