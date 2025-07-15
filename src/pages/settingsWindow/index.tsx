import { useSelector } from 'react-redux';

import { Button } from 'antd';

import { IReduxRootState } from '../../store/reducer';

import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IStoreStorage_settings_local,
  IStoreStorage_settings_local_default,
} from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { ELocale } from '../../gpt-ai-flow-common/enum-app/ELocale';

import { SettingsWindow_7_about } from './SettingsWindow_7_about';
import { SettingsWindow_1_local } from './settingsWindow_1_local';
import { SettingsWindow_2_user_3_info } from './settingsWindow_2_user/SettingsWindow_2_user_3_info';
import { SettingsWindow_4_payment } from './settingsWindow_4_payment';
import { IUserDB } from '../../gpt-ai-flow-common/interface-database/IUserDB';
// import { SettingsWindow_6_referralReward } from './SettingsWindow_6_referralReward';

interface ISettingsWindow_input {
  t: IGetT_frontend_output;
  userDB: IUserDB;
  isAuthenticated: boolean;
}
export const SettingsWindow = (props: ISettingsWindow_input) => {
  const { t, userDB, isAuthenticated } = props;
  // console.log('userDB', userDB);
  // const { id: userId = 0, token: { accessToken } = { accessToken: '' } } = IUserDB;

  const localFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorage_settings_local_default;
  });
  const {
    locale,
    apiKeys_v2: { llm: llmOption_secrets },
  } = localFromStore;

  const { openAIApiKey, anthropicApiKey, deepSeekApiKey, siliconFlowApiKey } = llmOption_secrets;

  const containerStyle = {
    marginTop: 12,
    marginLeft: 12,
    padding: '2rem',
    background: '#fff',
    border: '1px solid #E8E8E8',
    borderRadius: '.4rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
  };

  return (
    <>
      <div style={containerStyle}>
        <h3 className="mt-0">{t.get('Desktop App')}</h3>
        <Button
          type="primary"
          onClick={() => {
            console.log('Connect Desktop app');
            const link = document.createElement('a');
            let desktopAppUrl = `gpt-ai-flow-app://id=${userDB.id}&accessToken=${userDB.Token?.accessToken}`;
            desktopAppUrl += `&openAIApiKey=${openAIApiKey}`;
            desktopAppUrl += `&anthropicApiKey=${anthropicApiKey}`;
            desktopAppUrl += `&deepSeekApiKey=${deepSeekApiKey}`;
            desktopAppUrl += `&siliconFlowApiKey=${siliconFlowApiKey}`;
            link.href = desktopAppUrl;
            document.body.appendChild(link);
            link.click();
          }}
        >
          {t.get('Connect Desktop App')}
        </Button>
        <Button
          className="ml-4"
          onClick={() => {
            let downloadUrl = 'https://www.gptaiflow.com/download';
            if (locale === ELocale.ZH) {
              downloadUrl = 'https://www.gptaiflow.com/zh/download';
            }
            window.open(downloadUrl, '_blank');
          }}
        >
          {t.get('Download')}
        </Button>
      </div>
      <div style={containerStyle}>
        <SettingsWindow_2_user_3_info t={t} userDB={userDB} isAuthenticated={isAuthenticated} />
      </div>
      <div style={containerStyle}>
        <SettingsWindow_1_local t={t} />
      </div>
      <div style={containerStyle}>
        <SettingsWindow_4_payment t={t} localeForSettingsWindow={locale} />
      </div>
      <div style={containerStyle}>
        <SettingsWindow_7_about t={t} />
      </div>
      {/* <div style={containerStyle}>
        <SettingsWindow_6_referralReward t={t} userId={userId.toString()} accessToken={accessToken} />
      </div> */}
    </>
  );
};
