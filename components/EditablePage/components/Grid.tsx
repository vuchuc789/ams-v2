import { useNode, UserComponent } from '@craftjs/core';
import {
  Row as AntRow,
  Col as AntCol,
  Typography,
  Space,
  Select,
  InputNumber,
  Checkbox,
} from 'antd';

interface RowProps {
  children: React.ReactNode;
  align: 'top' | 'middle' | 'bottom' | 'stretch';
  gutter: [number, number];
  justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
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

export const Row: UserComponent<Partial<RowProps>> = ({
  children,
  align = 'top',
  gutter = [0, 0],
  justify = 'start',
  wrap = true,
  margin = { top: 0, right: 0, down: 0, left: 0 },
  padding = { top: 0, right: 0, down: 0, left: 0 },
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <AntRow
      ref={(el: HTMLDivElement) => {
        connect(drag(el));
      }}
      align={align}
      gutter={gutter}
      justify={justify}
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
      {children || (
        <AntCol>
          <Typography.Text keyboard>Drag cols to me</Typography.Text>
        </AntCol>
      )}
    </AntRow>
  );
};

const RowSettings: React.FC = () => {
  const {
    actions: { setProp },
    align,
    gutter,
    justify,
    wrap,
    margin,
    padding,
  } = useNode((node) => ({
    align: node.data.props.align,
    gutter: node.data.props.gutter,
    justify: node.data.props.justify,
    wrap: node.data.props.wrap,
    margin: node.data.props.margin,
    padding: node.data.props.padding,
  }));

  return (
    <Space direction="vertical">
      <AntRow align="middle">
        <AntCol span={10}>Align:</AntCol>
        <AntCol span={14}>
          <Select
            defaultValue={align}
            onChange={(value) => {
              setProp((props: RowProps) => {
                props.align = value;
              });
            }}
          >
            {['top', 'middle', 'bottom', 'stretch'].map((value, index) => (
              <Select.Option key={index} value={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </AntCol>
      </AntRow>
      <AntRow align="middle">
        <AntCol span={10}>Justify:</AntCol>
        <AntCol span={14}>
          <Select
            defaultValue={justify}
            onChange={(value) => {
              setProp((props: RowProps) => {
                props.justify = value;
              });
            }}
          >
            {['start', 'end', 'center', 'space-around', 'space-between'].map(
              (value, index) => (
                <Select.Option key={index} value={value}>
                  {value}
                </Select.Option>
              ),
            )}
          </Select>
        </AntCol>
      </AntRow>
      <AntRow align="middle">
        <AntCol span={10}>Gutter:</AntCol>
        <AntCol span={14}>
          <Space direction="vertical">
            <InputNumber
              min={0}
              defaultValue={gutter[0]}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.gutter = [value, props.gutter[1]];
                });
              }}
            />
            <InputNumber
              min={0}
              defaultValue={gutter[1]}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.gutter = [props.gutter[0], value];
                });
              }}
            />
          </Space>
        </AntCol>
      </AntRow>
      <AntRow align="middle">
        <AntCol span={10}>Wrap:</AntCol>
        <AntCol span={14}>
          <Checkbox
            checked={wrap}
            onChange={(e) => {
              setProp((props: RowProps) => {
                props.wrap = e.target.checked;
              });
            }}
          />
        </AntCol>
      </AntRow>
      <AntRow align="middle">
        <AntCol span={10}>Margin:</AntCol>
        <AntCol span={14}>
          <Space direction="vertical">
            <InputNumber
              defaultValue={margin?.top || 0}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.margin = { ...props.margin, top: value };
                });
              }}
            />
            <InputNumber
              defaultValue={margin?.right || 0}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.margin = { ...props.margin, right: value };
                });
              }}
            />
            <InputNumber
              defaultValue={margin?.down || 0}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.margin = { ...props.margin, down: value };
                });
              }}
            />
            <InputNumber
              defaultValue={margin?.left || 0}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.margin = { ...props.margin, left: value };
                });
              }}
            />
          </Space>
        </AntCol>
      </AntRow>
      <AntRow align="middle">
        <AntCol span={10}>Padding:</AntCol>
        <AntCol span={14}>
          <Space direction="vertical">
            <InputNumber
              defaultValue={padding?.top || 0}
              min={0}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.padding = { ...props.padding, top: value };
                });
              }}
            />
            <InputNumber
              defaultValue={padding?.right || 0}
              min={0}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.padding = { ...props.padding, right: value };
                });
              }}
            />
            <InputNumber
              defaultValue={padding?.down || 0}
              min={0}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.padding = { ...props.padding, down: value };
                });
              }}
            />
            <InputNumber
              defaultValue={padding?.left || 0}
              min={0}
              onChange={(value) => {
                setProp((props: RowProps) => {
                  props.padding = { ...props.padding, left: value };
                });
              }}
            />
          </Space>
        </AntCol>
      </AntRow>
    </Space>
  );
};

Row.craft = {
  props: {
    align: 'top',
    gutter: [0, 0],
    justify: 'start',
    wrap: true,
    margin: { top: 0, right: 0, down: 0, left: 0 },
    padding: { top: 0, right: 0, down: 0, left: 0 },
  },
  rules: {
    canMoveIn: (node) => node.data.name === 'Column',
  },
  related: {
    settings: RowSettings,
  },
};

interface ColumnProps {
  children: React.ReactNode;
  span: number;
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

export const Column: UserComponent<Partial<ColumnProps>> = ({
  children,
  span = 0,
  margin = { top: 0, right: 0, down: 0, left: 0 },
  padding = { top: 0, right: 0, down: 0, left: 0 },
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <AntCol
      ref={(ele: HTMLDivElement) => {
        connect(drag(ele));
      }}
      span={span || undefined}
      style={{
        margin: `${margin?.top || 0}px ${margin?.right || 0}px ${
          margin?.down || 0
        }px ${margin?.left || 0}px`,
        padding: `${padding?.top || 0}px ${padding?.right || 0}px ${
          padding?.down || 0
        }px ${padding?.left || 0}px`,
      }}
    >
      {children || (
        <Typography.Text keyboard>Drag components to me</Typography.Text>
      )}
    </AntCol>
  );
};

const ColumnSettings: React.FC = () => {
  const {
    actions: { setProp },
    span,
    margin,
    padding,
  } = useNode((node) => ({
    span: node.data.props.span,
    margin: node.data.props.margin,
    padding: node.data.props.padding,
  }));

  return (
    <Space direction="vertical">
      <AntRow align="middle">
        <AntCol span={10}>Span:</AntCol>
        <AntCol span={14}>
          <InputNumber
            min={0}
            defaultValue={span}
            onChange={(value) => {
              setProp((props: ColumnProps) => {
                props.span = value;
              });
            }}
          />
        </AntCol>
      </AntRow>
      <AntRow align="middle">
        <AntCol span={10}>Margin:</AntCol>
        <AntCol span={14}>
          <Space direction="vertical">
            <InputNumber
              defaultValue={margin?.top || 0}
              onChange={(value) => {
                setProp((props: ColumnProps) => {
                  props.margin = { ...props.margin, top: value };
                });
              }}
            />
            <InputNumber
              defaultValue={margin?.right || 0}
              onChange={(value) => {
                setProp((props: ColumnProps) => {
                  props.margin = { ...props.margin, right: value };
                });
              }}
            />
            <InputNumber
              defaultValue={margin?.down || 0}
              onChange={(value) => {
                setProp((props: ColumnProps) => {
                  props.margin = { ...props.margin, down: value };
                });
              }}
            />
            <InputNumber
              defaultValue={margin?.left || 0}
              onChange={(value) => {
                setProp((props: ColumnProps) => {
                  props.margin = { ...props.margin, left: value };
                });
              }}
            />
          </Space>
        </AntCol>
      </AntRow>
      <AntRow align="middle">
        <AntCol span={10}>Padding:</AntCol>
        <AntCol span={14}>
          <Space direction="vertical">
            <InputNumber
              defaultValue={padding?.top || 0}
              min={0}
              onChange={(value) => {
                setProp((props: ColumnProps) => {
                  props.padding = { ...props.padding, top: value };
                });
              }}
            />
            <InputNumber
              defaultValue={padding?.right || 0}
              min={0}
              onChange={(value) => {
                setProp((props: ColumnProps) => {
                  props.padding = { ...props.padding, right: value };
                });
              }}
            />
            <InputNumber
              defaultValue={padding?.down || 0}
              min={0}
              onChange={(value) => {
                setProp((props: ColumnProps) => {
                  props.padding = { ...props.padding, down: value };
                });
              }}
            />
            <InputNumber
              defaultValue={padding?.left || 0}
              min={0}
              onChange={(value) => {
                setProp((props: ColumnProps) => {
                  props.padding = { ...props.padding, left: value };
                });
              }}
            />
          </Space>
        </AntCol>
      </AntRow>
    </Space>
  );
};

Column.craft = {
  props: {
    span: 0,
    margin: { top: 0, right: 0, down: 0, left: 0 },
    padding: { top: 0, right: 0, down: 0, left: 0 },
  },
  rules: {
    canDrop: (node) => node.data.name === 'Row',
  },
  related: {
    settings: ColumnSettings,
  },
};
