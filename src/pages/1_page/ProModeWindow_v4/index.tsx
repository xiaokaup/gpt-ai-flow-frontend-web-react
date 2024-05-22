import '../../../styles/global.css';
import '../../../styles/drag.css';
import '../../../styles/layout.scss';
import './index.scss';

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import _ from 'lodash';
import { Select, Slider, Tabs } from 'antd';

import { IReduxRootState } from '../../../store/reducer';
import { updateSpecificUserData, userLogoutAction } from '../../../store/actions/userActions';

import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { CreativityValueProvider } from '../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { ProModeModelValueProvider } from '../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import { useUserData } from '../../../gpt-ai-flow-common/hooks/useUserData';
import IUserDataFile, { IUserData } from '../../../gpt-ai-flow-common/interface-app/IUserData';

import { EOpenAiModel_type } from '../../../gpt-ai-flow-common/enum-backend/EOpenAIModelType';
import IStoreStorageFile, {
  IStoreStorageLocalSettings,
} from '../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { ModelStaticService } from '../../../gpt-ai-flow-common/tools/2_class/SModels';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';

import {
  IBackground_for_type_langchain,
  IPromode_v4_tabPane_context_for_type_custom_langchain,
} from '../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/03-custome-langchain/IProMode_v4_context_type_langchain';
import {
  All_type_IProMode_v4_tabPane,
  EProMode_v4_tabPane_type,
  IProMode_v4,
  IProMode_v4_tabPane,
} from '../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/IProMode_v4';
import { getProMode_v4_from_backend } from '../../../gpt-ai-flow-common/tools/3_unit/TBackendProMode_v4';
import TCryptoJSFile from '../../../gpt-ai-flow-common/tools/TCrypto-js';
import { IAdjust_for_IMessage } from '../../../gpt-ai-flow-common/interface-app/3_unit/IMessage';
import { IPromode_v4_tabPane_context_type_commandChain } from '../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/01-chatChain/IProMode_v4_context_type_commandChain';
import IInputsCacheFile, { IInputsCache } from '../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { useInputsCache } from '../../../gpt-ai-flow-common/hooks/useInputsCache';
import { updateInputsCache } from '../../../store/actions/inputsCacheActions';

import { ProModeWindow_v4_tabPane_type_langchain } from './ProModeWindow_v4_pageType/2024-05-03-ProModeWindow_v4_tabPane_type_commandChain';
import { ProModeWIndow_v4_tabPane_type_writingPostChain } from './ProModeWindow_v4_pageType/2024-05-08-ProModeWIndow_v4_tabPane_type_writingPostChain';
import { ProModeWindow_v4_tabPane_type_custome_langchain_iterate_and_optimize } from './ProModeWindow_v4_pageType/2024-05-12-ProModeWindow_v4_tabPane_type_custome_langchain_iterate_and_optimize';
import { ProModeWindow_v4_tabPane_type_custome_langchain_once_multiple_results } from './ProModeWindow_v4_pageType/2024-05-13-ProModeWindow_v4_tabPane_type_custome_langchain_once_multiple_results';
import { ProModeWindow_v4_tabPane_type_image_crop_v1 } from './ProModeWindow_v4_pageType/2024-05-22-ProModeWindow_v4_tabPane_type_image_crop_v1';

interface IProModeWindow_v4_login {
  t: IGetT_frontend_output;
  locale: ELocale;
  userData: IUserData;
  inputsCache: IInputsCache;
  setInputsCache: React.Dispatch<React.SetStateAction<IInputsCache>>;
}
const ProModeWindow_v4_login = (props: IProModeWindow_v4_login) => {
  const { t, locale, userData, inputsCache, setInputsCache } = props;

  const localDataFromStorage: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorageLocalSettings_default;
  });
  const {
    openAIApiKey: modelSecret,
    proMode: { model_type },
  } = localDataFromStorage;

  const {
    token: { accessToken: userAccessToken },
  } = userData;

  // === ProMode Data - start ===
  const [proMode_v4_tabPanes, setProMode_v4_tabPanes] = useState<IProMode_v4_tabPane<All_type_IProMode_v4_tabPane>[]>(
    [],
  );
  // === ProMode Data - end ===

  // === ProMode tabPane settings - start ===
  const [activeTabPanelKey, setActiveTabPanelKey] = useState<string>();

  // ModelOptions
  const [creativityValue, setCreativityValue] = useState<number>(0.8);
  const [proModeModelType, setProModeModelType] = useState<EOpenAiModel_type>(model_type);
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
    setProMode_v4_tabPanes(result.tabPanes);
    if (result.tabPanes.length > 0) {
      const defaultTabPanes = result.tabPanes.filter((tabPane) => tabPane.isDefault);
      if (defaultTabPanes.length > 0) {
        const defaultTabPane = _.sample(defaultTabPanes) as IProMode_v4_tabPane<All_type_IProMode_v4_tabPane>;
        setActiveTabPanelKey(defaultTabPane.uuid);
      } else {
        setActiveTabPanelKey(result.tabPanes[0].uuid);
      }
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
        />

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
            marginBottom: '.4rem',
          }}
        >
          <span style={{ color: '#5D6370', marginLeft: '1rem' }}>
            {t.get('Creative value')}: {creativityValue}
          </span>

          <Slider
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
          />

          <div className="gptModelSwitch">
            <Select
              value={proModeModelType}
              showSearch
              placeholder={t.get('Select Model')}
              optionFilterProp="children"
              onChange={(value: string) => {
                console.log(`selected ${value}`);
                setProModeModelType(value as EOpenAiModel_type);
              }}
              onSearch={(value: string) => {
                console.log('search:', value);
              }}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={ModelStaticService.getAllModelOptions()}
              style={{
                width: 180,
              }}
            />
          </div>
        </div>

        <div className="row bottom_block_tabs">
          <ProModeModelValueProvider value={proModeModelType}>
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
                <Tabs.TabPane
                  tab={locale === ELocale.EN ? 'Image Creation (Web Version)' : '图片制作(网页版)'}
                  key="image-crop-tool-v1"
                  disabled={false}
                >
                  <ProModeWindow_v4_tabPane_type_image_crop_v1 t={t} />
                </Tabs.TabPane>

                {proMode_v4_tabPanes.map((tabPane: IProMode_v4_tabPane<All_type_IProMode_v4_tabPane>) => {
                  return (
                    <Tabs.TabPane tab={tabPane.name} key={tabPane.uuid} disabled={tabPane.isDisabled}>
                      {tabPane.type === EProMode_v4_tabPane_type.COMMAND_CHAIN && (
                        <ProModeWindow_v4_tabPane_type_langchain
                          t={t}
                          tabPane={tabPane as IProMode_v4_tabPane<IPromode_v4_tabPane_context_type_commandChain>}
                          webCase={{ userData, localDataFromStorage }}
                        />
                      )}
                      {tabPane.type === EProMode_v4_tabPane_type.WRITING_POST_CHAIN && (
                        <ProModeWIndow_v4_tabPane_type_writingPostChain
                          t={t}
                          tabPane={tabPane as IProMode_v4_tabPane<{}>}
                          userAccessToken={userAccessToken}
                          modelSecret={modelSecret}
                          proModeModelType={proModeModelType}
                          envObj={{
                            env: CONSTANTS_GPT_AI_FLOW_COMMON,
                            getEncryptobjForFrontend: TCryptoJSFile.encrypt_v2(
                              CONSTANTS_GPT_AI_FLOW_COMMON.FRONTEND_STORE_SYMMETRIC_ENCRYPTION_KEY as string,
                            ),
                          }}
                        />
                      )}
                      {tabPane.type === EProMode_v4_tabPane_type.CUSTOME_LANGCHAIN && (
                        <ProModeWindow_v4_tabPane_type_custome_langchain_iterate_and_optimize
                          t={t}
                          tabPane={
                            tabPane as IProMode_v4_tabPane<
                              IPromode_v4_tabPane_context_for_type_custom_langchain<
                                IBackground_for_type_langchain,
                                IAdjust_for_IMessage
                              >
                            >
                          }
                          userAccessToken={userAccessToken}
                          modelSecret={modelSecret}
                          proModeModelType={proModeModelType}
                          inputsCache={inputsCache}
                          setInputsCache={setInputsCache}
                        />
                      )}
                      {tabPane.type === EProMode_v4_tabPane_type.LANGCHAIN_CUSTOME_ITERATE_AND_OPTIMIZE && (
                        <ProModeWindow_v4_tabPane_type_custome_langchain_iterate_and_optimize
                          t={t}
                          tabPane={
                            tabPane as IProMode_v4_tabPane<
                              IPromode_v4_tabPane_context_for_type_custom_langchain<
                                IBackground_for_type_langchain,
                                IAdjust_for_IMessage
                              >
                            >
                          }
                          userAccessToken={userAccessToken}
                          modelSecret={modelSecret}
                          proModeModelType={proModeModelType}
                          inputsCache={inputsCache}
                          setInputsCache={setInputsCache}
                        />
                      )}
                      {tabPane.type === EProMode_v4_tabPane_type.LANGCHAIN_CUSTOME_ONCE_MULTIPLE_RESUTLS && (
                        <ProModeWindow_v4_tabPane_type_custome_langchain_once_multiple_results
                          t={t}
                          tabPane={
                            tabPane as IProMode_v4_tabPane<
                              IPromode_v4_tabPane_context_for_type_custom_langchain<
                                IBackground_for_type_langchain,
                                IAdjust_for_IMessage
                              >
                            >
                          }
                          userAccessToken={userAccessToken}
                          modelSecret={modelSecret}
                          proModeModelType={proModeModelType}
                          inputsCache={inputsCache}
                          setInputsCache={setInputsCache}
                        />
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
    navigate('/login');
    window.location.reload();
  }, 1000);

  return (
    <>
      {t.get(
        'Please go to the setup interface to log in the user first, and make sure that the package is in normal status',
      )}{' '}
      <Link to="/logout">{t.get('Logout')}</Link>
    </>
  );
};

interface IProModeWindow_input {
  t: IGetT_frontend_output;
  locale: ELocale;
}
const ProModeWindow_v4 = (props: IProModeWindow_input) => {
  const dispatch = useDispatch();

  const { t, locale } = props;

  // === Stripe subscription - start ===
  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {
      dispatch<any>(updateSpecificUserData(newUserData_without_token));
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
        />
      )}
      {!userId && <ProModeWindow_v4_logout t={t} />}
    </>
  );
};

export default ProModeWindow_v4;
