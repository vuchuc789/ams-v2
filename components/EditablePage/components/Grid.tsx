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
}

export const Row: UserComponent<Partial<RowProps>> = ({
  children,
  align = 'top',
  gutter = [0, 0],
  justify = 'start',
  wrap = true,
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
  } = useNode((node) => ({
    align: node.data.props.align,
    gutter: node.data.props.gutter,
    justify: node.data.props.justify,
    wrap: node.data.props.wrap,
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
    </Space>
  );
};

Row.craft = {
  props: {
    align: 'top',
    gutter: [0, 0],
    justify: 'start',
    wrap: true,
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
}

export const Column: UserComponent<Partial<ColumnProps>> = ({
  children,
  span = 0,
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
  } = useNode((node) => ({
    span: node.data.props.span,
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
    </Space>
  );
};

Column.craft = {
  props: {
    span: 0,
  },
  rules: {
    canDrop: (node) => node.data.name === 'Row',
  },
  related: {
    settings: ColumnSettings,
  },
};
