import { useDispatch, useSelector } from 'react-redux';
import { ELocale } from '../../../../../gpt-ai-flow-common/enum-app/ELocale';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { IReduxRootState } from '../../../../../store/reducer';
import { IUserDB, IUserDB_default } from '../../../../../gpt-ai-flow-common/interface-database/IUserDB';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { updateSpecificUserDB, userLogoutAction } from '../../../../../store/actions/userActions';
import { useUserDB } from '../../../../../gpt-ai-flow-common/hooks/useUserDB';
import { useInputsCache } from '../../../../../gpt-ai-flow-common/hooks/useInputsCache';
import IInputsCacheFile, { IInputsCache } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { updateInputsCache } from '../../../../../store/actions/inputsCacheActions';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { ITokenDB_default } from '../../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import { useCallback, useEffect, useState } from 'react';
import { ELLM_name } from '../../../../../gpt-ai-flow-common/enum-backend/ELLM';
import { message, Radio, RadioChangeEvent, Select } from 'antd';
import locale from 'antd/es/locale';
import _ from 'lodash';
import { IProMode_v4 } from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4';
import { getProMode_v4_from_backend } from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendProMode_v4';
import TCryptoJSFile from '../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { SLLM_v2_common } from '../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { HorizontalScrollingBanner } from '../components/HorizontalScrollingBanner';

interface IProModeWindow_v4_v2_input {
  t: IGetT_frontend_output;
}
export const ProModeWindow_v4_v2 = (props: IProModeWindow_v4_v2_input) => {
  const dispatch = useDispatch();

  const { t } = props;

  const userDBFromStorage: IUserDB = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDB_default;
  });

  const { userDB } = useUserDB({
    userDBFromStorage,
    onUserDBChange: (newUserDB: IUserDB) => {
      dispatch<any | IUserDB>(updateSpecificUserDB(newUserDB));
    },
    t,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const inputsCacheFromStorage: IInputsCache = useSelector((state: IReduxRootState) => {
    return state.inputsCache ?? IInputsCacheFile.IInputsCache_default;
  });
  const { inputsCache, setInputsCache } = useInputsCache({
    inputsCacheFromStorage,
    onInputsCacheChange: (newItem: IInputsCache) => {
      dispatch(updateInputsCache(newItem) as any);
    },
  });

  const { id: userId } = userDB;

  return (
    <>
      {userId && (
        <ProModeWindow_v4_v2_login t={t} userDB={userDB} inputsCache={inputsCache} setInputsCache={setInputsCache} />
      )}
      {!userId && <ProModeWindow_v4_v2_logout t={t} />}
    </>
  );
};

const getCreationModeOptions = (t: IGetT_frontend_output) => {
  return [
    { label: t.get('Precise'), value: 0.6 },
    { label: t.get('Balanced'), value: 0.8 },
    { label: t.get('Creative'), value: 1 },
  ];
};

interface IProModeWindow_v4_v2_login {
  t: IGetT_frontend_output;
  userDB: IUserDB;
  inputsCache: IInputsCache;
  setInputsCache: React.Dispatch<React.SetStateAction<IInputsCache>>;
}
const ProModeWindow_v4_v2_login = (props: IProModeWindow_v4_v2_login) => {
  const { t, userDB, inputsCache, setInputsCache } = props;

  const query = new URLSearchParams(useLocation().search);
  const tabPaneDefault_uuid_from_query = query.get('tabPane_uuid');

  const localDataFromStorage: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const {
    apiKeys: llmOption_secrets,
    proMode: { model_type: llmName_from_store },
  } = localDataFromStorage;

  const { Token: { accessToken: userAccessToken } = ITokenDB_default } = userDB;

  if (!userAccessToken) {
    return (
      <div>
        <div>{t.get('Please register a user and log in first')}</div>
        <Link to="/app/logout">{t.get('Logout')}</Link>
      </div>
    );
  }

  // === ProMode tabPane settings - start ===
  const [activeTabPanelKey, setActiveTabPanelKey] = useState<string>(
    tabPaneDefault_uuid_from_query ?? 'communicationChain',
  );
  const onTabsChange = (key: string) => {
    setActiveTabPanelKey(key);
  };

  // ModelOptions
  const [creativityValue, setCreativityValue] = useState<number>(0.8);
  const [llmName, setLLMName] = useState<ELLM_name>(llmName_from_store);
  // === ProMode tabPane settings - end ===

  return (
    <div className="drag-region" style={{ width: '100%' }}>
      <div
        className="container proModeContainer"
        style={{ position: 'relative', overflow: 'auto', margin: '1rem auto' }}
      >
        <div
          className="row top_block"
          // style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div
            className="block_creativity_value_slider"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignItems: 'center',

              position: 'sticky',
              top: 0,

              backgroundColor: '#fff',
              zIndex: 10,
              borderBottom: '1px solid #E8E8E8',
              paddingBottom: '.8rem',
            }}
          >
            <div className="title">
              <h3 className="m-0">{t.get('ProMode')} v4.0 (v2)</h3>
            </div>

            <div>
              <span style={{ color: '#5D6370', marginRight: '1rem' }}>{t.get('Creation mode')}:</span>

              <Radio.Group
                options={getCreationModeOptions(t)}
                onChange={({ target: { value } }: RadioChangeEvent) => {
                  console.log('radio checked', value);
                  setCreativityValue(value);
                }}
                value={creativityValue}
                optionType="button"
                buttonStyle="solid"
              />

              {/* <Slider
            min={0}
            max={1.6}
            step={0.1}
            onChange={(newValue: number) => {
              setCreativityValue(newValue);
            }}
            value={creativityValue}
            marks={{
              0: t.get('Precise'),
              1.6: t.get('Creative'),
            }}
            style={{
              position: 'relative',
              top: 4,

              width: 200,
              marginLeft: '2rem',
              marginRight: '2rem',
            }}
          /> */}
            </div>
            <div className="modelSwitch">
              <span style={{ color: '#5D6370', marginRight: '1rem' }}>{t.get('Model')}:</span>

              <Select
                value={llmName}
                placeholder={t.get('Select Model')}
                optionFilterProp="children"
                onChange={(value: string) => {
                  console.log(`selected ${value}`);
                  setLLMName(value as ELLM_name);
                }}
                showSearch
                onSearch={(value: string) => {
                  console.log('search:', value);
                }}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={SLLM_v2_common.getAllLLM_selectOptions(t)}
                style={{
                  width: 180,
                }}
              />
            </div>
          </div>

          <div className="horizontalScrollingBanner">
            <HorizontalScrollingBanner
              webCase={{
                t,
                locale: t.currentLocale,
                env: CONSTANTS_GPT_AI_FLOW_COMMON,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProModeWindow_v4_v2_logout = (props: { t: IGetT_frontend_output }) => {
  const { t } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch<any | void>(userLogoutAction());
  setTimeout(() => {
    navigate('/app/login');
    window.location.reload();
  }, 1000);

  return (
    <>
      {t.get(
        'Please go to the setup interface to log in the user first, and make sure that the package is in normal status',
      )}{' '}
      <Link to="/app/logout">{t.get('Logout')}</Link>
    </>
  );
};
