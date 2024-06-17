import '../../../styles/global.css';

import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Button, Tag, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import TBackendInviteLinkFile from '../../../gpt-ai-flow-common/tools/3_unit/TBackendInviteLink';
import { IInviteLinkDB } from '../../../gpt-ai-flow-common/interface-database/IInviteLinkDB';
import { ISequelize_whereCondition_searchResults } from '../../../gpt-ai-flow-common/interface-backend/ISequelize';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

interface ISettingsWindow_6_referralReward_input {
  t: IGetT_frontend_output;
  userId: string;
  accessToken: string;
}

const SettingsWindow_6_referralReward_login = (props: ISettingsWindow_6_referralReward_input) => {
  const { t, userId, accessToken } = props;

  const [inviteLinks, setInviteLinks] = useState<IInviteLinkDB[]>([]);

  const init = async () => {
    const resutls: ISequelize_whereCondition_searchResults<IInviteLinkDB> =
      await TBackendInviteLinkFile.getInviteLinksByUserId(
        userId,
        accessToken,
        t.currentLocale,
        CONSTANTS_GPT_AI_FLOW_COMMON,
      );

    setInviteLinks(resutls.rows);
  };

  useEffect(() => {
    init();
  }, []);

  const generateReferralLink = async () => {
    const results = await TBackendInviteLinkFile.generateInviteLink(
      userId,
      accessToken,
      t.currentLocale,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );

    if (results.error) {
      message.warning(results.error?.message);
    }

    init();
  };

  return (
    <div id="settingsWindowContainer-menu-6-referralReward" className="container" style={{ padding: '8px 10px' }}>
      <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="row" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '1.2rem' }}>
            {t.get('If you like our product, share the link with a friend')}
            <br />
            {t.get('Use GPT AI Flow, win a +3 day free trial bonus.')}
          </span>
        </div>

        <Button
          type="primary"
          onClick={() => {
            generateReferralLink();
          }}
        >
          {t.get('Get Referral Link')}
        </Button>
      </div>

      <div className="row">
        {inviteLinks.length === 0 && <div>{t.get('No referral links')}</div>}
        {inviteLinks.map((item) => {
          const { currentUse, maxUse, expiredAt, uniqueCode } = item;

          const openLink = `https://www.app.gptaiflow.com/signUp?uniqueCode=${uniqueCode}`;

          const currentDate = new Date();
          const isExpired = new Date(expiredAt) < currentDate; // expiredAt here is string, need to convert to date type

          return (
            <div key={uniqueCode}>
              <h3 style={{ fontSize: '1.2rem' }}>{t.get('Referral links')}:</h3>
              <div style={{ marginTop: '.8rem' }}>
                <a href={openLink} style={{ fontSize: '1rem' }}>
                  {openLink}
                </a>
                <span style={{ marginLeft: 8 }}>
                  ({currentUse}/{maxUse})
                </span>
                {isExpired && (
                  <span style={{ marginLeft: 8 }}>
                    <Tag color="red">{t.get('expired')}</Tag>
                  </span>
                )}
                <CopyToClipboard
                  text={openLink}
                  onCopy={() => {
                    message.success({
                      content: <span>{t.get('Copy successful')} !</span>,
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

export const SettingsWindow_6_referralReward = (props: ISettingsWindow_6_referralReward_input) => {
  const { t, userId, accessToken } = props;

  if (!userId || !accessToken) return <>{t.get('Please go to the setup interface to log in the user first')}</>;

  return <SettingsWindow_6_referralReward_login t={t} userId={userId} accessToken={accessToken} />;
};
