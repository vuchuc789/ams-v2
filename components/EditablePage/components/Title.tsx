import { RESET_EDITOR_INDICATOR } from '@constants';
import { useEditor, useNode, UserComponent } from '@craftjs/core';
import {
  Col,
  Row,
  Select,
  Space,
  Typography,
  Checkbox,
  InputNumber,
} from 'antd';
import { SyncDispatch } from 'interfaces';
import { useDispatch } from 'react-redux';

interface TitleProps {
  code: boolean;
  deleted: boolean;
  disabled: boolean;
  italic: boolean;
  keyboard: boolean;
  mark: boolean;
  text: string;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  underline: boolean;
  level: 1 | 2 | 3 | 4 | 5;
}

export const Title: UserComponent<Partial<TitleProps>> = ({
  text = '',
  code = false,
  deleted = false,
  disabled = false,
  italic = false,
  keyboard = false,
  mark = false,
  type,
  underline = false,
  level = 1,
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
    <div
      ref={(el: HTMLDivElement) => {
        connect(drag(el));
      }}
    >
      <Typography.Title
        editable={
          enabled && {
            tooltip: false,
            onChange: (value) => {
              dispatch({ type: RESET_EDITOR_INDICATOR });
              setProp((props: TitleProps) => {
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
        type={type}
        underline={underline}
        level={level}
      >
        {text}
      </Typography.Title>
    </div>
  );
};

const TitleSettings: React.FC = () => {
  const {
    actions: { setProp },
    code,
    deleted,
    disabled,
    italic,
    keyboard,
    mark,
    underline,
    type,
    level,
  } = useNode((node) => ({
    code: node.data.props.code,
    deleted: node.data.props.deleted,
    disabled: node.data.props.disabled,
    italic: node.data.props.italic,
    keyboard: node.data.props.keyboard,
    mark: node.data.props.mark,
    underline: node.data.props.underline,
    type: node.data.props.type,
    level: node.data.props.level,
  }));

  return (
    <Space direction="vertical">
      <Space>
        Level:
        <InputNumber
          min={1}
          max={5}
          defaultValue={level}
          onChange={(value) => {
            setProp((props: TitleProps) => {
              props.level = value;
            });
          }}
        />
      </Space>
      <Space>
        Type:
        <Select
          defaultValue={type || ''}
          onChange={(value) => {
            setProp((props: TitleProps) => {
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
              setProp((props: TitleProps) => {
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
              setProp((props: TitleProps) => {
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
              setProp((props: TitleProps) => {
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
              setProp((props: TitleProps) => {
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
              setProp((props: TitleProps) => {
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
              setProp((props: TitleProps) => {
                props.mark = e.target.checked;
              });
            }}
          >
            Mark
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            defaultChecked={underline}
            onChange={(e) => {
              setProp((props: TitleProps) => {
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

Title.craft = {
  props: {
    text: 'Edit me...',
    code: false,
    deleted: false,
    disabled: false,
    italic: false,
    keyboard: false,
    mark: false,
    underline: false,
    level: 1,
  },
  related: {
    settings: TitleSettings,
  },
};
