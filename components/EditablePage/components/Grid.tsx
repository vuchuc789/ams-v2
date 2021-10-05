import { useNode, UserComponent } from '@craftjs/core';
import { Row as AntRow, Col as AntCol, Typography, Space, Select } from 'antd';

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
        <Typography.Text keyboard>Drag components to me</Typography.Text>
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
  related: {
    settings: RowSettings,
  },
};
