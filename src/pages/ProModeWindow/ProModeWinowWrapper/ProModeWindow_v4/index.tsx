import '../../../../styles/global.css';
import '../../../../styles/drag.css';
import '../../../../styles/layout.scss';
import './index.scss';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import _ from 'lodash';
import { Button, Radio, RadioChangeEvent, Select, Tabs, message } from 'antd';

import { IReduxRootState } from '../../../../store/reducer';
import { updateInputsCache } from '../../../../store/actions/inputsCacheActions';
import { updateSpecificUserDB, userLogoutAction } from '../../../../store/actions/userActions';

import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import TCryptoJSFile from '../../../../gpt-ai-flow-common/tools/TCrypto-web';
import { to_deprecate_useInputsCache } from '../../../../gpt-ai-flow-common/hooks/to_deprecate_useInputsCache';
import { SLLM_v2_common } from '../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { ELLM_name } from '../../../../gpt-ai-flow-common/enum-backend/ELLM';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { getProMode_v4_from_backend } from '../../../../gpt-ai-flow-common/tools/3_unit/TBackendProMode_v4';
import { CreativityValueProvider } from '../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import IInputsCacheFile, {
  to_deprecate_IInputsCache,
  IInputsCache_v2,
  IInputsCache_v3,
  IInputsCache_v3_default,
} from '../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { ProModeModelValueProvider } from '../../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import { ProModeWindow_v4_tabPane_commandChain } from './ProModeWindow_v4_pageType/2024-05-03-ProModeWindow_v4_tabPane_00_commandChain';
import { ProModeWindow_v4_tabPane_type_image_crop_v1 } from './ProModeWindow_v4_pageType/2024-05-22-ProModeWindow_v4_tabPane_04_tool_image_crop';
import { ProModeWindow_v4_wrapper } from './ProModeWindow_wrapper_v4';
import { HorizontalScrollingBanner } from '../components/HorizontalScrollingBanner';
import { useInputsCache_v2 } from '../../../../gpt-ai-flow-common/hooks/useInputsCache_v2';
import {
  IProMode_v4,
  All_type_IProMode_v4_tabPane,
  IProMode_v4_tabPane,
} from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4';
import {
  EProMode_v4_role,
  EProMode_v4_module_uuid,
  EProMode_v4_role_labels,
  EProMode_v4_module_mode,
} from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/EProMode_v4_module';
import { IPromode_v4_tabPane_context_type_commandChain } from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/01-chatChain/IProMode_v4_context_type_commandChain';
import {
  IProMode_v4_tabPane_context,
  IBackground_for_type_langchain,
  IAdjust_for_type_langchain,
} from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain';
import { IProMode_v4_tabPane_tool } from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/05-tool/interface';
import { Prompt_v3_persona_Provider } from '../../../../gpt-ai-flow-common/contexts/Prompt_v3_persona_ProviderContext';
import { IPrompt_v3_type_persona } from '../../../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';
import { Drawer_prompt_v3_persona } from './Drawer_prompt_v3_persona';
import { LastFocusedElementProvider } from '../../../../gpt-ai-flow-common/contexts/LastFocusedElementContext';
import { saveLocalAction } from '../../../../store/actions/localActions';
import { ProModeWindow_v4_tabPane_05_CardGenerate } from './ProModeWindow_v4_pageType/2024-11-09-ProModeWindow_v4_tabPane_05_CardGenerate';
import {
  ESocialPlatform_moduleName,
  ESocialPlatform_platformName,
} from '../../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/interface-type/03-langchain/01-iterate-and-optimize/00-prototype-2024-12-02-socialPlatform/ESocialPlatofrm';
import { useInputsCache_v3 } from '../../../../gpt-ai-flow-common/hooks/useInputsCache_v3';
import { ProModeWindow_wrapper_v4_subVersion_2 } from './ProModeWindow_wrapper_v4_subVersion_2';
import { IUserDB, IUserDB_default } from '../../../../gpt-ai-flow-common/interface-database/IUserDB';
import { useUserDB } from '../../../../gpt-ai-flow-common/hooks/useUserDB';

interface IProModeWindow_input {
  t: IGetT_frontend_output;
  locale: ELocale;
}
const ProModeWindow_v4 = (props: IProModeWindow_input) => {
  const dispatch = useDispatch();

  const { t, locale } = props;

  // === Stripe subscription - start ===
  const userDBFromStorage: IUserDB = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDB_default;
  });

  const { userDB } = useUserDB({
    userDBFromStorage,
    onUserDBChange: (newUserDB_without_token: IUserDB) => {
      dispatch<any>(updateSpecificUserDB(newUserDB_without_token));
    },
    t,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const inputsCacheFromStorage: to_deprecate_IInputsCache | IInputsCache_v2 = useSelector((state: IReduxRootState) => {
    return state.inputsCache ?? IInputsCacheFile.IInputsCache_default;
  });
  const { inputsCache, setInputsCache } = to_deprecate_useInputsCache({
    inputsCacheFromStorage: inputsCacheFromStorage as unknown as to_deprecate_IInputsCache,
    onInputsCacheChange: (newItem: to_deprecate_IInputsCache) => {
      dispatch(updateInputsCache(newItem) as any);
    },
  });
  const { inputsCache_v2, setInputsCache_v2 } = useInputsCache_v2({
    inputsCache_v2FromStorage: inputsCacheFromStorage as unknown as IInputsCache_v2,
    onInputsCache_v2Change: (newItem: IInputsCache_v2) => {
      dispatch<any>(updateInputsCache(newItem));
    },
  });
  const { inputsCache_v3, setInputsCache_v3 } = useInputsCache_v3({
    inputsCache_v3FromStorage: (inputsCacheFromStorage as unknown as IInputsCache_v3) || IInputsCache_v3_default,
    onInputsCache_v3Change: (newItem: IInputsCache_v3) => {
      dispatch<any>(updateInputsCache(newItem));
    },
  });

  const { id: userId } = userDB;

  return (
    <>
      {userId && (
        <ProModeWindow_v4_login
          t={t}
          locale={locale}
          userDB={userDB}
          inputsCache={inputsCache}
          setInputsCache={setInputsCache}
          inputsCache_v2={inputsCache_v2}
          setInputsCache_v2={setInputsCache_v2}
          inputsCache_v3={inputsCache_v3}
          setInputsCache_v3={setInputsCache_v3}
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

const getFilteredTabPanes_by_role = (roleModule: EProMode_v4_role, proMode_v4_tabPanes: IProMode_v4['tabPanes']) => {
  if (roleModule === EProMode_v4_role.ROLE_01_WORKPLACE) {
    const module_uuids: Array<EProMode_v4_module_uuid | string> = [
      EProMode_v4_module_uuid.MODULE_04_COMMUNICATION,
      EProMode_v4_module_uuid.MODULE_12_TRANSLATE_TOOLS,
      EProMode_v4_module_uuid.MODULE_14_SUMMARY,
      EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT,
    ];
    return proMode_v4_tabPanes
      .filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid))
      .sort((a, b) => module_uuids.indexOf(a.uuid) - module_uuids.indexOf(b.uuid));
  }

  if (roleModule === EProMode_v4_role.TO_DEPRECATED_ROLE_02_CONTENT_WORKER) {
    const module_uuids: Array<EProMode_v4_module_uuid | string> = [
      EProMode_v4_module_uuid.MODULE_02_TOPIC_FINDING_FOR_XIAOHONGSHU_PLATFORM,
      EProMode_v4_module_uuid.MODULE_06_CONTENT_WRITING,
      EProMode_v4_module_uuid.MODULE_08_REWRITING_TOOLS,
      EProMode_v4_module_uuid.MODULE_03_TOOL_IMAGE_CROP,
      EProMode_v4_module_uuid.MODULE_13_OUTLINE_TOOL,
    ];
    return proMode_v4_tabPanes
      .filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid))
      .sort((a, b) => module_uuids.indexOf(a.uuid) - module_uuids.indexOf(b.uuid));
  }

  if (roleModule === EProMode_v4_role.ROLE_05_XIAOHONGSHU_PLATFORM) {
    const module_uuids: Array<EProMode_v4_module_uuid | string> = [
      // EProMode_v4_module_uuid.MODULE_01_SELF_MEDIA_RECOMMAND,
      EProMode_v4_module_uuid.MODULE_02_TOPIC_FINDING_FOR_XIAOHONGSHU_PLATFORM,
      EProMode_v4_module_uuid.MODULE_16_MATERIAL_FINDER_FOR_XIAOHONGSHU_PLATFORM,
      EProMode_v4_module_uuid.MODULE_17_STORY_TELL_FOR_XIAOHONGSHU_PLATFORM,
      EProMode_v4_module_uuid.MODULE_07_WRITING_POST_AGENT_FOR_XIAOHONGSHU_PLATFORM,
      EProMode_v4_module_uuid.MODULE_19_EXTRACT_FOR_XIAOHONGSHU_PLATFORM,
      EProMode_v4_module_uuid.MODULE_18_TOOL_CARD_GENERATE,
      EProMode_v4_module_uuid.MODULE_03_TOOL_IMAGE_CROP,
      EProMode_v4_module_uuid.MODULE_14_SUMMARY,
      EProMode_v4_module_uuid.MODULE_08_REWRITING_TOOLS,
      EProMode_v4_module_uuid.MODULE_05_WRITING_COMMENT,
      EProMode_v4_module_uuid.MODULE_11_XIAOHONGSHU,
    ];
    return proMode_v4_tabPanes
      .filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid))
      .sort((a, b) => module_uuids.indexOf(a.uuid) - module_uuids.indexOf(b.uuid));
  }

  if (roleModule === EProMode_v4_role.ROLE_04_PRODUCT_MANAGER) {
    const module_uuids: Array<EProMode_v4_module_uuid | string> = [
      EProMode_v4_module_uuid.MODULE_10_PRODUCT_MANAGER,
      EProMode_v4_module_uuid.MODULE_09_SEO_CHAIN,
      EProMode_v4_module_uuid.MODULE_15_MEETING_REPORT,
    ];
    return proMode_v4_tabPanes
      .filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid))
      .sort((a, b) => module_uuids.indexOf(a.uuid) - module_uuids.indexOf(b.uuid));
  }

  if (roleModule === EProMode_v4_role.ROLE_06_LINKEDIN_PLATFORM) {
    const module_uuids: Array<EProMode_v4_module_uuid | string> = [
      EProMode_v4_module_uuid.MODULE_20_TOPIC_FINDING_FOR_LINKEDIN_PLATFORM,
      EProMode_v4_module_uuid.MODULE_21_MATERIAL_FINDER_FOR_LINKEDIN_PLATFORM,
      EProMode_v4_module_uuid.MODULE_22_STORY_TELL_FOR_LINKEDIN_PLATFORM,
      EProMode_v4_module_uuid.MODULE_23_WRITING_POST_AGENT_FOR_LINKEDIN_PLATFORM,
      EProMode_v4_module_uuid.MODULE_18_TOOL_CARD_GENERATE,
      EProMode_v4_module_uuid.MODULE_03_TOOL_IMAGE_CROP,
      EProMode_v4_module_uuid.MODULE_14_SUMMARY,
    ];
    return proMode_v4_tabPanes
      .filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid))
      .sort((a, b) => module_uuids.indexOf(a.uuid) - module_uuids.indexOf(b.uuid));
  }

  if (roleModule === EProMode_v4_role.ROLE_07_FACEBOOK_PLATFORM) {
    const module_uuids: Array<EProMode_v4_module_uuid | string> = [
      `${ESocialPlatform_platformName.FACEBOOK}-${ESocialPlatform_moduleName.MODULE_01_TOPIC_FINDING_TOOL_CHAIN}`,
      `${ESocialPlatform_platformName.FACEBOOK}-${ESocialPlatform_moduleName.MODULE_02_MATERIAL_FINDER_ASSISTANT_CHAIN}`,
      `${ESocialPlatform_platformName.FACEBOOK}-${ESocialPlatform_moduleName.MODULE_03_STORY_TELL_CHAIN}`,
      `${ESocialPlatform_platformName.FACEBOOK}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
      EProMode_v4_module_uuid.MODULE_18_TOOL_CARD_GENERATE,
      EProMode_v4_module_uuid.MODULE_03_TOOL_IMAGE_CROP,
      EProMode_v4_module_uuid.MODULE_14_SUMMARY,
    ];
    return proMode_v4_tabPanes
      .filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid))
      .sort((a, b) => module_uuids.indexOf(a.uuid) - module_uuids.indexOf(b.uuid));
  }

  if (roleModule === EProMode_v4_role.ROLE_08_X_PLATFORM_PRE_TWITTER) {
    const module_uuids: Array<EProMode_v4_module_uuid | string> = [
      `${ESocialPlatform_platformName.TWITTER}-${ESocialPlatform_moduleName.MODULE_01_TOPIC_FINDING_TOOL_CHAIN}`,
      `${ESocialPlatform_platformName.TWITTER}-${ESocialPlatform_moduleName.MODULE_02_MATERIAL_FINDER_ASSISTANT_CHAIN}`,
      `${ESocialPlatform_platformName.TWITTER}-${ESocialPlatform_moduleName.MODULE_03_STORY_TELL_CHAIN}`,
      `${ESocialPlatform_platformName.TWITTER}-${ESocialPlatform_moduleName.MODULE_04_WRITING_POST_CHAIN}`,
      EProMode_v4_module_uuid.MODULE_18_TOOL_CARD_GENERATE,
      EProMode_v4_module_uuid.MODULE_03_TOOL_IMAGE_CROP,
      EProMode_v4_module_uuid.MODULE_14_SUMMARY,
    ];
    return proMode_v4_tabPanes
      .filter((tabPane: All_type_IProMode_v4_tabPane) => module_uuids.includes(tabPane.uuid))
      .sort((a, b) => module_uuids.indexOf(a.uuid) - module_uuids.indexOf(b.uuid));
  }

  return proMode_v4_tabPanes;
};

interface IProModeWindow_v4_login {
  t: IGetT_frontend_output;
  locale: ELocale;
  userDB: IUserDB;
  inputsCache: to_deprecate_IInputsCache;
  setInputsCache: React.Dispatch<React.SetStateAction<to_deprecate_IInputsCache>>;
  inputsCache_v2: IInputsCache_v2;
  setInputsCache_v2: React.Dispatch<React.SetStateAction<IInputsCache_v2>>;
  inputsCache_v3: IInputsCache_v3;
  setInputsCache_v3: React.Dispatch<React.SetStateAction<IInputsCache_v3>>;
}
const ProModeWindow_v4_login = (props: IProModeWindow_v4_login) => {
  const {
    t,
    locale,
    userDB,
    inputsCache,
    setInputsCache,
    inputsCache_v2,
    setInputsCache_v2,
    inputsCache_v3,
    setInputsCache_v3,
  } = props;

  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  const roleModule = (
    Object.values(EProMode_v4_role).includes(query.get('role') as EProMode_v4_role) ? query.get('role') : ''
  ) as EProMode_v4_role;
  const tabPaneDefault_uuid_from_query = query.get('tabPane_uuid');

  const localFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const {
    apiKeys: llmOption_secrets,
    proMode: { model_type: llmName_from_store },
  } = localFromStore;

  const { Token: { accessToken: userAccessToken } = {} } = userDB;

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

  // === Drawer - start ===
  const [prompt_v3_persona, setPrompt_v3_persona] = useState<IPrompt_v3_type_persona>();
  const [isShow_personaDrawer, setIsShow_personaDrawer] = useState<boolean>(false);
  // === Drawer - end ===

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
    console.log('set tab key: ', key);
    setActiveTabPanelKey(key);
  };

  return (
    <div className="drag-region" style={{ width: '100%' }}>
      <LastFocusedElementProvider t={t}>
        <div
          className="container proModeContainer"
          style={{ position: 'relative', overflow: 'auto', margin: '1rem auto' }}
        >
          <div
            className="row top_block"
            // style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div
              className="block_creativity_value_slider gap-2"
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
              <div className="title flex items-center">
                <a href="/app/proMode/features" className="text-slate-950 hover:text-slate-600">
                  <h3 className="m-0">
                    {t.get(EProMode_v4_role_labels[roleModule] ? EProMode_v4_role_labels[roleModule] : 'ProMode')} v4.0
                  </h3>
                </a>
                <Button
                  type="link"
                  className="ml-4"
                  onClick={() => {
                    setIsShow_personaDrawer(true);
                  }}
                >
                  {`${t.get('Open {text}', { text: t.get('Persona panel') })}`}
                </Button>
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
                    dispatch<IStoreStorage_settings_local | any>(
                      saveLocalAction({
                        ...localFromStore,
                        proMode: {
                          ...localFromStore.proMode,
                          model_type: value as ELLM_name,
                        },
                      }),
                    );
                  }}
                  onSearch={(value: string) => {
                    console.log('search:', value);
                  }}
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={SLLM_v2_common.getAllLLM_selectOptions_for_web(t)}
                  style={{
                    width: 450,
                  }}
                />
              </div>
            </div>

            <div className="horizontalScrollingBanner hidden">
              <HorizontalScrollingBanner
                webCase={{
                  t,
                  locale,
                  env: CONSTANTS_GPT_AI_FLOW_COMMON,
                }}
              />
            </div>
          </div>

          <div className="row bottom_block_tabs">
            <Prompt_v3_persona_Provider value={prompt_v3_persona}>
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
                          {type === EProMode_v4_module_mode.COMMAND_CHAIN_v3 && (
                            // proMode_v3
                            <ProModeWindow_v4_tabPane_commandChain
                              t={t}
                              tabPane={tabPane as IProMode_v4_tabPane<IPromode_v4_tabPane_context_type_commandChain>}
                              webCase={{ userDB: userDB, localDataFromStorage: localFromStore }}
                            />
                          )}

                          {versionNum == 2 && (
                            // proMode_v4
                            <ProModeWindow_v4_wrapper
                              t={t}
                              tabPane={
                                tabPane as IProMode_v4_tabPane<
                                  IProMode_v4_tabPane_context<
                                    IBackground_for_type_langchain,
                                    IAdjust_for_type_langchain
                                  >
                                >
                              }
                              userAccessToken={userAccessToken}
                              llmOption_secrets={llmOption_secrets}
                              llmName={llmName}
                              inputsCache={inputsCache}
                              setInputsCache={setInputsCache}
                              inputsCache_v2={inputsCache_v2}
                              setInputsCache_v2={setInputsCache_v2}
                              inputsCache_v3={inputsCache_v3}
                              setInputsCache_v3={setInputsCache_v3}
                            />
                          )}
                          {versionNum == 3 && (
                            // proMode_v4
                            <ProModeWindow_wrapper_v4_subVersion_2
                              t={t}
                              tabPane={
                                tabPane as IProMode_v4_tabPane<
                                  IProMode_v4_tabPane_context<
                                    IBackground_for_type_langchain,
                                    IAdjust_for_type_langchain
                                  >
                                >
                              }
                              userAccessToken={userAccessToken}
                              llmOption_secrets={llmOption_secrets}
                              llmName={llmName}
                              inputsCache={inputsCache}
                              setInputsCache={setInputsCache}
                              inputsCache_v2={inputsCache_v2}
                              setInputsCache_v2={setInputsCache_v2}
                              inputsCache_v3={inputsCache_v3}
                              setInputsCache_v3={setInputsCache_v3}
                            />
                          )}

                          {type === EProMode_v4_module_mode.TOOL_IMAGE_CROP && (
                            <ProModeWindow_v4_tabPane_type_image_crop_v1 t={t} />
                          )}

                          {type === EProMode_v4_module_mode.TOOL_CARD_GENERATE && (
                            <ProModeWindow_v4_tabPane_05_CardGenerate t={t} />
                          )}
                        </Tabs.TabPane>
                      );
                    })}
                  </Tabs>
                </CreativityValueProvider>
              </ProModeModelValueProvider>
            </Prompt_v3_persona_Provider>
          </div>

          <div className="drawers">
            <Drawer_prompt_v3_persona
              t={t}
              isShow={isShow_personaDrawer}
              setIsShow={setIsShow_personaDrawer}
              setPrompt_v3_persona={setPrompt_v3_persona}
            />
          </div>
        </div>
      </LastFocusedElementProvider>
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
