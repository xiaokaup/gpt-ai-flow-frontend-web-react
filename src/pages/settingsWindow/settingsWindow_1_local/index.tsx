import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Tabs, TabsProps } from 'antd';

import { IReduxRootState } from '../../../store/reducer';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserData } from '../../../gpt-ai-flow-common/hooks/useUserData';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { SettingsWindow_1_local_basic } from './SettingsWindow_1_local_1_basic';
import {
  to_deprecate_IUserData as IUserData,
  to_deprecate_IUserData_default as IUserData_default,
} from '../../../gpt-ai-flow-common/interface-app/3_unit/to_deprecate_IUserData';

enum ESettingsWindow_1_local_tabKey {
  BASIC = 'basic',
  SHORTCUT = 'shortcut',
}

interface ISettingsWindow_1_local_input {
  t: IGetT_frontend_output;
  isModelEdition: boolean;
}
export const SettingsWindow_1_local = (props: ISettingsWindow_1_local_input) => {
  const { t, isModelEdition } = props;

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: () => {},
    locale: t.currentLocale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const { id: userId } = userData;

  if (!userId) {
    return (
      <div id="settingsWindowContainer-1-local" className="container" style={{ padding: '.4rem' }}>
        {t.get('Please register a user and log in first')}
      </div>
    );
  }

  const [selectedTabKey, setSelectedTabKey] = useState<ESettingsWindow_1_local_tabKey>(
    ESettingsWindow_1_local_tabKey.BASIC,
  );

  const tabItems: TabsProps['items'] = [
    {
      key: ESettingsWindow_1_local_tabKey.BASIC,
      label: t.get('Basic'),
      children: <SettingsWindow_1_local_basic t={t} isModelEdition={isModelEdition} />,
    },
  ];

  return (
    <div id="SettingsWIndow_1_local" className="row">
      <Tabs
        defaultActiveKey={selectedTabKey}
        items={tabItems}
        onChange={(key: string) => {
          console.log(`${key} tab`);
          setSelectedTabKey(key as ESettingsWindow_1_local_tabKey);
        }}
      />
    </div>
  );
};
