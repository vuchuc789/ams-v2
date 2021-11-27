import { ADPIA_DEEPLINK_URL } from '@constants';
import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { Typography, Col, Input, Row, Space, Checkbox, Tooltip } from 'antd';
import { RootState } from 'interfaces';
import React from 'react';
import { useSelector } from 'react-redux';

interface LinkProps {
  href: string;
  title: string;
  isAffiliateLink: boolean;
  affiliateHref: string;
}

export const Link: UserComponent<Partial<LinkProps>> = ({
  href = '',
  title = 'Click me',
  isAffiliateLink = false,
  affiliateHref = '',
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const {
    query: { getOptions },
  } = useEditor();

  const { enabled } = getOptions();

  return (
    <Typography.Link
      ref={(ele: HTMLAnchorElement) => {
        connect(drag(ele));
      }}
      href={isAffiliateLink ? affiliateHref : href}
      onClick={(e) => {
        if (enabled) {
          e.preventDefault();
        }
      }}
      target="_blank"
    >
      {title}
    </Typography.Link>
  );
};

const LinkSettings: React.FC = () => {
  const {
    actions: { setProp },
    href,
    title,
    isAffiliateLink,
  } = useNode((node) => ({
    href: node.data.props.href,
    title: node.data.props.title,
    isAffiliateLink: node.data.props.isAffiliateLink,
  }));

  const { adpiaId } = useSelector((state: RootState) => state.userInfo);

  return (
    <Space direction="vertical">
      <Row>
        <Col span={10}>Title:</Col>
        <Col span={14}>
          <Input
            defaultValue={title}
            onChange={(event) => {
              setProp((props: LinkProps) => {
                props.title = event.target.value;
              });
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>Href:</Col>
        <Col span={14}>
          <Input
            defaultValue={href}
            onChange={(event) => {
              setProp((props: LinkProps) => {
                props.href = event.target.value;

                if (!!adpiaId) {
                  props.affiliateHref = `${ADPIA_DEEPLINK_URL}/?a=${adpiaId}&url=${encodeURIComponent(
                    event.target.value,
                  )}`;
                } else {
                  props.affiliateHref = event.target.value;
                }
              });
            }}
            onFocus={(e) => {
              e.target.select();
            }}
          />
        </Col>
      </Row>
      <Row align="middle">
        <Col span={10}>Affiliate:</Col>
        <Col span={14}>
          <Tooltip
            title={
              !!adpiaId
                ? 'Make this link becoming affiliate one'
                : 'Your adpia id is not set'
            }
          >
            <Checkbox
              defaultChecked={isAffiliateLink}
              onChange={(e) => {
                setProp((props: LinkProps) => {
                  props.isAffiliateLink = e.target.checked;
                });
              }}
              disabled={!adpiaId}
            />
          </Tooltip>
        </Col>
      </Row>
    </Space>
  );
};

Link.craft = {
  props: {
    href: '',
    title: 'Click me',
    isAffiliateLink: false,
    affiliateHref: '',
  },
  related: {
    settings: LinkSettings,
  },
};
