import '../../../styles/global.css';

import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Button, Tag, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TBackendInviteLinkFile from '../../../gpt-ai-flow-common/tools/3_unit/TBackendInviteLink';
import { IInviteLinkDB } from '../../../gpt-ai-flow-common/interface-database/IInviteLinkDB';
import { ISequelize_whereCondition_searchResults } from '../../../gpt-ai-flow-common/interface-backend/ISequelize';

interface ISettingsWindow_6_referralReward_input {
  userId: string;
  accessToken: string;
}
export const SettingsWindow_6_referralReward = (props: ISettingsWindow_6_referralReward_input) => {
  const { userId, accessToken } = props;

  if (!userId || !accessToken) return <>请先到设置界面登录用户</>;

  const [inviteLinks, setInviteLinks] = useState<IInviteLinkDB[]>([]);

  const init = async () => {
    const resutls: ISequelize_whereCondition_searchResults<IInviteLinkDB> =
      await TBackendInviteLinkFile.getInviteLinksByUserId(userId, accessToken, CONSTANTS_GPT_AI_FLOW_COMMON);

    setInviteLinks(resutls.rows);
  };

  useEffect(() => {
    init();
  }, []);

  const generateReferralLink = async () => {
    await TBackendInviteLinkFile.generateInviteLink(userId, accessToken, CONSTANTS_GPT_AI_FLOW_COMMON);
    init();
  };

  return (
    <div id="settingsWindowContainer-menu-6-referralReward" className="container" style={{ padding: '8px 10px' }}>
      <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="row" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '1.2rem' }}>
            如果你喜欢我们的产品，分享链接给朋友
            <br />
            使用 GPT AI Flow, 赢得 +3天 免费试用 奖励。
          </span>
        </div>

        <Button
          type="primary"
          onClick={() => {
            generateReferralLink();
          }}
        >
          获取推荐链接
        </Button>
      </div>

      <div className="row">
        {inviteLinks.length === 0 && <div>暂无推荐链接</div>}
        {inviteLinks.map((item) => {
          const { currentUse, maxUse, expiredAt, uniqueCode } = item;

          const openLink = `https://www.app.gptaiflow.com/signUp?uniqueCode=${uniqueCode}`;

          const currentDate = new Date();
          const isExpired = new Date(expiredAt) < currentDate; // expiredAt here is string, need to convert to date type

          return (
            <div key={uniqueCode}>
              <h3 style={{ fontSize: '1.2rem' }}>推荐链接:</h3>
              <div style={{ marginTop: '.8rem' }}>
                <a href={openLink} style={{ fontSize: '1rem' }}>
                  {openLink}
                </a>
                <span style={{ marginLeft: 8 }}>
                  ({currentUse}/{maxUse})
                </span>
                {isExpired && (
                  <span style={{ marginLeft: 8 }}>
                    <Tag color="red">已失效</Tag>
                  </span>
                )}
                <CopyToClipboard
                  text={openLink}
                  onCopy={() => {
                    message.success({
                      content: <span>复制成功 !</span>,
                      key: 'copy',
                      duration: 3,
                    });
                  }}
                >
                  <CopyOutlined style={{ fontSize: 16, marginLeft: '0.4rem' }} />
                </CopyToClipboard>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
