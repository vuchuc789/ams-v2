import { UploadOutlined } from '@ant-design/icons';
import { IMAGE_UPLOADER_API } from '@constants';
import { useEditor, useNode, UserComponent } from '@craftjs/core';
import {
  Image as AntImage,
  Upload,
  Typography,
  Space,
  Input,
  Button,
  InputNumber,
  Row,
  Col,
} from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { IBBResponse } from 'interfaces';
import styles from 'styles/EditablePage.module.scss';

const { Dragger } = Upload;

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

export const Image: UserComponent<Partial<ImageProps>> = ({
  src = '',
  width,
  height,
  alt = 'This is an image',
}) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();

  const {
    query: { getOptions },
  } = useEditor();

  const { enabled } = getOptions();

  return (
    <div
      ref={(el: HTMLDivElement) => {
        connect(drag(el));
      }}
      className={styles.inlineBlock}
    >
      {!!src ? (
        <AntImage
          src={src}
          width={width}
          height={height}
          alt={alt}
          preview={false}
          fallback="/image-not-found.png"
        />
      ) : (
        enabled && (
          <Dragger
            name="image"
            action={IMAGE_UPLOADER_API}
            openFileDialogOnClick={false}
            onChange={(info: UploadChangeParam<UploadFile<IBBResponse>>) => {
              const {
                file: { status, response },
              } = info;
              if (status === 'done' && response?.data?.url) {
                setProp((props: ImageProps) => {
                  props.src = response.data.url;
                });
              }
            }}
          >
            <Typography.Text>Drag to add image to me</Typography.Text>
          </Dragger>
        )
      )}
    </div>
  );
};

const ImageSettings: React.FC = () => {
  const {
    actions: { setProp },
    src,
    width,
    height,
    alt,
  } = useNode((node) => ({
    src: node.data.props.src,
    width: node.data.props.width,
    height: node.data.props.height,
    alt: node.data.props.alt,
  }));
  return (
    <Space direction="vertical">
      <Space>
        Source
        <Input
          value={src}
          onFocus={(e) => {
            e.target.select();
          }}
          onChange={(e) => {
            setProp((props: ImageProps) => {
              props.src = e.target.value;
            });
          }}
        />
        <Upload
          name="image"
          action={IMAGE_UPLOADER_API}
          onChange={(info: UploadChangeParam<UploadFile<IBBResponse>>) => {
            const {
              file: { status, response },
            } = info;
            if (status === 'done' && response?.data?.url) {
              setProp((props: ImageProps) => {
                props.src = response.data.url;
              });
            }
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} />
        </Upload>
      </Space>
      <Row align="middle">
        <Col span={6}>Width</Col>
        {width !== undefined && (
          <Col span={11}>
            <InputNumber
              min={0}
              defaultValue={width}
              onChange={(val) => {
                setProp((props: ImageProps) => {
                  props.width = val;
                });
              }}
            />
          </Col>
        )}
        <Col span={7}>
          <Checkbox
            checked={width === undefined}
            onChange={(e) => {
              setProp((props: ImageProps) => {
                props.width = e.target.checked ? undefined : 200;
              });
            }}
          >
            auto
          </Checkbox>
        </Col>
      </Row>
      <Row align="middle">
        <Col span={6}>Height</Col>
        {height !== undefined && (
          <Col span={11}>
            <InputNumber
              min={0}
              defaultValue={height}
              onChange={(val) => {
                setProp((props: ImageProps) => {
                  props.height = val;
                });
              }}
            />
          </Col>
        )}
        <Col span={7}>
          <Checkbox
            checked={height === undefined}
            onChange={(e) => {
              setProp((props: ImageProps) => {
                props.height = e.target.checked ? undefined : 200;
              });
            }}
          >
            auto
          </Checkbox>
        </Col>
      </Row>
      <Space>
        Alt
        <Input
          value={alt}
          onChange={(e) => {
            setProp((props: ImageProps) => {
              props.alt = e.target.value;
            });
          }}
        />
      </Space>
    </Space>
  );
};

Image.craft = {
  props: {
    src: '',
    alt: 'This is an image',
  },
  related: {
    settings: ImageSettings,
  },
};
