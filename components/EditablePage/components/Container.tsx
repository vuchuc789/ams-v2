import { useNode, UserComponent } from '@craftjs/core';
import Head from 'next/head';
import { Space, Row, Col, InputNumber, Input } from 'antd';
import { SketchPicker } from 'react-color';

interface ContainerProps {
  children: React.ReactNode;
  className: string;
  textColor: string;
  titleColor: string;
  linkColor: string;
  backgroundColor: string;
  fontSize: number;
  fontFamily: {
    link: string;
    name: string;
  };
}

export const Container: UserComponent<Partial<ContainerProps>> = ({
  children,
  className,
  textColor = 'rgba(0, 0, 0, 0.85)',
  titleColor = 'rgba(0, 0, 0, 0.85)',
  linkColor = '#1890ff',
  backgroundColor = '#fff',
  fontSize = 14,
  fontFamily = {
    link: '',
    name: '',
  },
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <>
      <Head>
        {!!fontFamily?.link && (
          <link href={fontFamily.link} rel="stylesheet" key="custom-font" />
        )}
        <style key="custom-style">{`
          .root-container .ant-typography:not(a):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([class*="ant-typography-"]) {
            color: ${textColor} !important;
          }

          .root-container a.ant-typography {
            color: ${linkColor} !important;
          }

          .root-container h1.ant-typography,
          .root-container h2.ant-typography,
          .root-container h3.ant-typography,
          .root-container h4.ant-typography,
          .root-container h5.ant-typography,
          .root-container h6.ant-typography {
            color: ${titleColor} !important;
          }

          .root-container h1.ant-typography {
            font-size: ${(38 / 14) * fontSize}px !important;
          } 
            
          .root-container h2.ant-typography {
            font-size: ${(30 / 14) * fontSize}px !important;
          } 
            
          .root-container h3.ant-typography {
            font-size: ${(24 / 14) * fontSize}px !important;
          } 
            
          .root-container h4.ant-typography {
            font-size: ${(20 / 14) * fontSize}px !important;
          } 
            
          .root-container h5.ant-typography {
            font-size: ${(16 / 14) * fontSize}px !important;
          } 

          .root-container ::selection {
            color: ${backgroundColor} !important;
            background-color: ${textColor} !important;
          }
        `}</style>
      </Head>
      <div
        ref={(ref: HTMLDivElement) => {
          connect(ref);
        }}
        className={`root-container ${className}`}
        style={{
          backgroundColor,
          fontFamily: fontFamily.name,
          fontSize: `${fontSize}px`,
        }}
      >
        {children}
      </div>
    </>
  );
};

const ContainerSettings: React.FC = () => {
  const {
    actions: { setProp },
    textColor,
    titleColor,
    linkColor,
    backgroundColor,
    fontSize,
    fontFamily,
  } = useNode((node) => ({
    textColor: node.data.props.textColor,
    titleColor: node.data.props.titleColor,
    linkColor: node.data.props.linkColor,
    backgroundColor: node.data.props.backgroundColor,
    fontSize: node.data.props.fontSize,
    fontFamily: node.data.props.fontFamily,
  }));

  return (
    <Space direction="vertical">
      <Row>
        <Col span={10}>Font Source:</Col>
        <Col span={14}>
          <Input
            defaultValue={fontFamily?.link || ''}
            onChange={(event) => {
              setProp((props: ContainerProps) => {
                props.fontFamily = { ...fontFamily, link: event.target.value };
              });
            }}
            onFocus={(e) => {
              e.target.select();
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>Font Family:</Col>
        <Col span={14}>
          <Input
            defaultValue={fontFamily?.name || ''}
            onChange={(event) => {
              setProp((props: ContainerProps) => {
                props.fontFamily = { ...fontFamily, name: event.target.value };
              });
            }}
            onFocus={(e) => {
              e.target.select();
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>Font Size:</Col>
        <Col span={14}>
          <InputNumber
            min={1}
            defaultValue={fontSize}
            onChange={(value) => {
              setProp((props: ContainerProps) => {
                props.fontSize = value;
              });
            }}
          />
        </Col>
      </Row>
      <h5>Text Color</h5>
      <SketchPicker
        color={textColor}
        onChange={({ rgb: { r, g, b, a } }) => {
          setProp((props: ContainerProps) => {
            props.textColor = `rgba(${r}, ${g}, ${b}, ${a})`;
          });
        }}
      />
      <h5>Title Color</h5>
      <SketchPicker
        color={titleColor}
        onChange={({ rgb: { r, g, b, a } }) => {
          setProp((props: ContainerProps) => {
            props.titleColor = `rgba(${r}, ${g}, ${b}, ${a})`;
          });
        }}
      />
      <h5>Link Color</h5>
      <SketchPicker
        color={linkColor}
        onChange={({ rgb: { r, g, b, a } }) => {
          setProp((props: ContainerProps) => {
            props.linkColor = `rgba(${r}, ${g}, ${b}, ${a})`;
          });
        }}
      />
      <h5>Background Color</h5>
      <SketchPicker
        color={backgroundColor}
        onChange={({ rgb: { r, g, b, a } }) => {
          setProp((props: ContainerProps) => {
            props.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
          });
        }}
      />
    </Space>
  );
};

Container.craft = {
  props: {
    textColor: 'rgba(0, 0, 0, 0.85)',
    titleColor: 'rgba(0, 0, 0, 0.85)',
    linkColor: '#1890ff',
    backgroundColor: '#fff',
    fontSize: 14,
    fontFamily: {
      link: '',
      name: '',
    },
  },
  related: {
    settings: ContainerSettings,
  },
};
