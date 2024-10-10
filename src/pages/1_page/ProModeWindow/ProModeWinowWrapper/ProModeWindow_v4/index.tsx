import '../../../../../styles/global.css';
import '../../../../../styles/drag.css';
import '../../../../../styles/layout.scss';
import './index.scss';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import _ from 'lodash';
import { Radio, RadioChangeEvent, Select, Tabs, message } from 'antd';

import { IReduxRootState } from '../../../../../store/reducer';
import { updateInputsCache } from '../../../../../store/actions/inputsCacheActions';
import { updateSpecificUserDB, userLogoutAction } from '../../../../../store/actions/userActions';

import {
  All_type_IProMode_v4_tabPane,
  IProMode_v4,
  IProMode_v4_tabPane,
} from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4';
import { ELocale } from '../../../../../gpt-ai-flow-common/enum-app/ELocale';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import TCryptoJSFile from '../../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { useUserData } from '../../../../../gpt-ai-flow-common/hooks/useUserData';
import { useInputsCache } from '../../../../../gpt-ai-flow-common/hooks/useInputsCache';
import { SLLM_v2_common } from '../../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { ELLM_name } from '../../../../../gpt-ai-flow-common/enum-backend/ELLM';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IAdjust_for_type_langchain,
  IBackground_for_type_langchain,
  IProMode_v4_tabPane_context,
} from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/03-langchain';
import { getProMode_v4_from_backend } from '../../../../../gpt-ai-flow-common/tools/3_unit/TBackendProMode_v4';
import {
  to_deprecate_IUserData as IUserData,
  to_deprecate_IUserData_default as IUserData_default,
} from '../../../../../gpt-ai-flow-common/interface-app/3_unit/to_deprecate_IUserData';
import { CreativityValueProvider } from '../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import IInputsCacheFile, {
  IInputsCache,
  IInputsCache_v2,
} from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { ProModeModelValueProvider } from '../../../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import {
  EProMode_v4_tabPane_context_mode,
  EProMode_v4_tabPane_uuid,
  EProMode_v4_tabPanes_role,
} from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/EProMode_v4_tabPane';
import { IPromode_v4_tabPane_context_type_commandChain } from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/01-chatChain/IProMode_v4_context_type_commandChain';
import { IProMode_v4_tabPane_tool } from '../../../../../gpt-ai-flow-common/interface-app/1_page/IProMode_v4/interface-type/05-tool/interface';

import { ProModeWindow_v4_tabPane_commandChain } from './ProModeWindow_v4_pageType/2024-05-03-ProModeWindow_v4_tabPane_00_commandChain';
import { ProModeWindow_v4_tabPane_type_image_crop_v1 } from './ProModeWindow_v4_pageType/2024-05-22-ProModeWindow_v4_tabPane_04_tool_image_crop';
import { ProModeWindow_v4_wrapper } from './ProModeWindow_v4_wrapper';
import { HorizontalScrollingBanner } from '../components/HorizontalScrollingBanner';
import { useInputsCache_v2 } from '../../../../../gpt-ai-flow-common/hooks/useInputsCache_v2';

interface IProModeWindow_input {
  t: IGetT_frontend_output;
  locale: ELocale;
}
const ProModeWindow_v4 = (props: IProModeWindow_input) => {
  const dispatch = useDispatch();

  const { t, locale } = props;

  // === Stripe subscription - start ===
  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {
      dispatch<any>(updateSpecificUserDB(newUserData_without_token));
    },
    locale: t.currentLocale,
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
  const { inputsCache_v2, setInputsCache_v2 } = useInputsCache_v2({
    inputsCache_v2FromStorage: inputsCacheFromStorage as unknown as IInputsCache_v2,
    onInputsCache_v2Change: (newItem: IInputsCache_v2) => {
      dispatch<any>(updateInputsCache(newItem));
    },
  });

  const { id: userId } = userData;

  return (
    <>
      {userId && (
        <ProModeWindow_v4_login
          t={t}
          locale={locale}
          userData={userData}
          inputsCache={inputsCache}
          setInputsCache={setInputsCache}
          inputsCache_v2={inputsCache_v2}
          setInputsCache_v2={setInputsCache_v2}
        />
      )}
      {!userId && <ProModeWindow_v4_logout t={t} />}
    </>
  );
};

export default ProModeWindow_v4;

const getCreationModeOptions = (t: IGetT_frontend_output) => {
  return [
    { label: t.get('Precise'), value: 0.6 },
    { label: t.get('Balanced'), value: 0.8 },
    { label: t.get('Creative'), value: 1 },
  ];
};

const getFilteredTabPanes_by_role = (
  roleModule: EProMode_v4_tabPanes_role,
  proMode_v4_tabPanes: IProMode_v4['tabPanes'],
) => {
  if (roleModule === EProMode_v4_tabPanes_role.ROLE_01_OFFICE_WORKER) {
    const module_uuids: EProMode_v4_tabPane_uuid[] = [
      EProMode_v4_tabPane_uuid.TAB_PANE_04_COMMUNICATION,
      EProMode_v4_tabPane_uuid.TAB_PANE_12_TRANSLATE_TOOLS,
    ];
    return proMode_v4_tabPanes.filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid));
  }

  if (roleModule === EProMode_v4_tabPanes_role.ROLE_02_CONTENT_WORKER) {
    const module_uuids: EProMode_v4_tabPane_uuid[] = [
      EProMode_v4_tabPane_uuid.TAB_PANE_02_TOPIC_FINDING_TOOL,
      EProMode_v4_tabPane_uuid.TAB_PANE_06_CONTENT_WRITING,
      EProMode_v4_tabPane_uuid.TAB_PANE_08_REWRITING_TOOLS,
      EProMode_v4_tabPane_uuid.TAB_PANE_03_TOOL_IMAGE_CROP,
    ];
    return proMode_v4_tabPanes.filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid));
  }

  if (roleModule === EProMode_v4_tabPanes_role.ROLE_03_SOCIAL_MEDIA) {
    const module_uuids: EProMode_v4_tabPane_uuid[] = [
      EProMode_v4_tabPane_uuid.TAB_PANE_01_SELF_MEDIA_RECOMMAND,
      EProMode_v4_tabPane_uuid.TAB_PANE_02_TOPIC_FINDING_TOOL,
      EProMode_v4_tabPane_uuid.TAB_PANE_03_TOOL_IMAGE_CROP,
      EProMode_v4_tabPane_uuid.TAB_PANE_05_WRITING_COMMENT,
      EProMode_v4_tabPane_uuid.TAB_PANE_07_WRITING_POST_AGENT,
      EProMode_v4_tabPane_uuid.TAB_PANE_08_REWRITING_TOOLS,
      EProMode_v4_tabPane_uuid.TAB_PANE_11_XIAO_HONG_SHU,
    ];
    return proMode_v4_tabPanes.filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid));
  }

  if (roleModule === EProMode_v4_tabPanes_role.ROLE_04_PRODUCT_MANAGER) {
    const module_uuids: EProMode_v4_tabPane_uuid[] = [
      EProMode_v4_tabPane_uuid.TAB_PANE_10_PRODUCT_MANAGER,
      EProMode_v4_tabPane_uuid.TAB_PANE_09_SEO_CHAIN,
    ];
    return proMode_v4_tabPanes.filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid));
  }

  return proMode_v4_tabPanes;
};

interface IProModeWindow_v4_login {
  t: IGetT_frontend_output;
  locale: ELocale;
  userData: IUserData;
  inputsCache: IInputsCache;
  setInputsCache: React.Dispatch<React.SetStateAction<IInputsCache>>;
  inputsCache_v2: IInputsCache_v2;
  setInputsCache_v2: React.Dispatch<React.SetStateAction<IInputsCache_v2>>;
}
const ProModeWindow_v4_login = (props: IProModeWindow_v4_login) => {
  const { t, locale, userData, inputsCache, setInputsCache, inputsCache_v2, setInputsCache_v2 } = props;

  const query = new URLSearchParams(useLocation().search);
  const roleModule = (
    Object.values(EProMode_v4_tabPanes_role).includes(query.get('role') as EProMode_v4_tabPanes_role)
      ? query.get('role')
      : ''
  ) as EProMode_v4_tabPanes_role;
  const tabPaneDefault_uuid_from_query = query.get('tabPane_uuid');

  const localDataFromStorage: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const {
    apiKeys: llmOption_secrets,
    proMode: { model_type: llmName_from_store },
  } = localDataFromStorage;

  const { Token: { accessToken: userAccessToken } = {} } = userData;

  if (!userAccessToken) {
    return (
      <div>
        <div>{t.get('Please register a user and log in first')}</div>
        <Link to="/app/logout">{t.get('Logout')}</Link>
      </div>
    );
  }

  // const { isModelEdition } = useStripePriceNicknames_for_allSubscriptions({
  //   accessToken: userAccessToken,
  //   locale,
  //   env: CONSTANTS_GPT_AI_FLOW_COMMON,
  // });

  // === ProMode Data - start ===
  const [proMode_v4_tabPanes, setProMode_v4_tabPanes] = useState<IProMode_v4['tabPanes']>([]);
  // console.log('proMode_v4_tabPanes', proMode_v4_tabPanes);
  // === ProMode Data - end ===

  // === ProMode tabPane settings - start ===
  const [activeTabPanelKey, setActiveTabPanelKey] = useState<string>();

  // ModelOptions
  const [creativityValue, setCreativityValue] = useState<number>(0.8);
  const [llmName, setLLMName] = useState<ELLM_name>(llmName_from_store);
  // === ProMode tabPane settings - end ===

  const init = useCallback(async () => {
    const result: IProMode_v4 = await getProMode_v4_from_backend(
      userAccessToken,
      TCryptoJSFile.decrypt_for_web(
        CONSTANTS_GPT_AI_FLOW_COMMON.BACKEND_AI_FLOW.AI_FLOW_COMMANDS_SYMMETRIC_ENCRYPTION_KEY as string,
      ),
      locale,
      CONSTANTS_GPT_AI_FLOW_COMMON,
    );
    const resultTabPanes = result.tabPanes;
    setProMode_v4_tabPanes(getFilteredTabPanes_by_role(roleModule, resultTabPanes));

    if (resultTabPanes.length === 0) {
      message.error(`${t.get('Error')}: ${t.get('Professional mode information not found')}`);
      message.error(t.get('Please try again later'));
      return;
    }

    if (tabPaneDefault_uuid_from_query) {
      const isTabPaneExist = resultTabPanes.some((tabPane) => tabPane.uuid === tabPaneDefault_uuid_from_query);
      if (isTabPaneExist) {
        setActiveTabPanelKey(tabPaneDefault_uuid_from_query);
      }
      if (!isTabPaneExist) {
        setActiveTabPanelKey(_.sample(resultTabPanes).uuid);
      }
    }

    if (!tabPaneDefault_uuid_from_query) {
      const defaultTabPanes_from_backend = resultTabPanes.filter((tabPane) => tabPane.isDefault);
      const selectedTabPane_uuid =
        defaultTabPanes_from_backend.length === 0
          ? _.sample(resultTabPanes).uuid
          : _.sample(defaultTabPanes_from_backend).uuid;
      setActiveTabPanelKey(selectedTabPane_uuid);
    }
  }, [locale, userAccessToken]);

  useEffect(() => {
    init();
  }, [init]);

  const onTabsChange = (key: string) => {
    setActiveTabPanelKey(key);
  };

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
              <a href="/app/proMode/features" className="text-slate-950 hover:text-slate-600">
                <h3 className="m-0">{t.get('ProMode')} v4.0</h3>
              </a>
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
                showSearch
                placeholder={t.get('Select Model')}
                optionFilterProp="children"
                onChange={(value: string) => {
                  console.log(`selected ${value}`);
                  setLLMName(value as ELLM_name);
                }}
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
                locale,
                env: CONSTANTS_GPT_AI_FLOW_COMMON,
              }}
            />
          </div>
        </div>

        <div className="row !mt-0 bottom_block_tabs">
          <ProModeModelValueProvider value={llmName}>
            <CreativityValueProvider value={creativityValue}>
              <Tabs
                size="small"
                hideAdd
                activeKey={activeTabPanelKey}
                type="card"
                // type="editable-card"
                onChange={onTabsChange}
                // onEdit={onEditTabPanel}
              >
                {proMode_v4_tabPanes.map((tabPane: All_type_IProMode_v4_tabPane | IProMode_v4_tabPane_tool) => {
                  const {
                    // versionDate,
                    versionNum,
                    type,
                  } = tabPane;
                  return (
                    <Tabs.TabPane tab={tabPane.name} key={tabPane.uuid} disabled={tabPane.isDisabled}>
                      {type === EProMode_v4_tabPane_context_mode.COMMAND_CHAIN_v3 && (
                        <ProModeWindow_v4_tabPane_commandChain
                          t={t}
                          tabPane={tabPane as IProMode_v4_tabPane<IPromode_v4_tabPane_context_type_commandChain>}
                          webCase={{ userData, localDataFromStorage }}
                        />
                      )}

                      {}

                      {versionNum == 2 && (
                        <ProModeWindow_v4_wrapper
                          t={t}
                          tabPane={
                            tabPane as IProMode_v4_tabPane<
                              IProMode_v4_tabPane_context<IBackground_for_type_langchain, IAdjust_for_type_langchain>
                            >
                          }
                          userAccessToken={userAccessToken}
                          llmOption_secrets={llmOption_secrets}
                          llmName={llmName}
                          inputsCache={inputsCache}
                          setInputsCache={setInputsCache}
                          inputsCache_v2={inputsCache_v2}
                          setInputsCache_v2={setInputsCache_v2}
                        />
                      )}

                      {type === EProMode_v4_tabPane_context_mode.TOOL_IMAGE_CROP && (
                        <ProModeWindow_v4_tabPane_type_image_crop_v1 t={t} />
                      )}
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </CreativityValueProvider>
          </ProModeModelValueProvider>
        </div>
      </div>
    </div>
  );
};

const ProModeWindow_v4_logout = (props: { t: IGetT_frontend_output }) => {
  const { t } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(userLogoutAction() as any);
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
