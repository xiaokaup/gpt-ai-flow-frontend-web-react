import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { ELocale } from '../../../gpt-ai-flow-common/enum-app/ELocale';
import { useDispatch, useSelector } from 'react-redux';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserDB } from '../../../gpt-ai-flow-common/hooks/useUserDB';
import { IUserDB, IUserDB_default } from '../../../gpt-ai-flow-common/interface-database/IUserDB';
import { updateSpecificUserDB } from '../../../store/actions/userActions';
import { IReduxRootState } from '../../../store/reducer';
import { ProModeWindow_v6_logout } from './logout';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { Link } from 'react-router-dom';
import {
  CreativityValueProvider,
  // useCreativityValueContext,
} from '../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { ProModeModelValueProvider } from '../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import { useState } from 'react';
import { ELLM_name } from '../../../gpt-ai-flow-common/enum-backend/ELLM';
import { saveLocalAction } from '../../../store/actions/localActions';
import { Button, Radio, RadioChangeEvent, Select, Splitter } from 'antd';
import { SLLM_v2_common } from '../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { getCreationModeOptions } from './components';
// import { ILLMOption_secrets } from '../../../gpt-ai-flow-common/interface-app/3_unit/ILLMModels';
import {
  EButton_operation,
  IPromode_v4_tabPane_context_button,
} from '../../../gpt-ai-flow-common/ProMode_v4/interface-IProMode_v4/IProMode_v4_buttons';
import { IAIChatMessage } from '../../../gpt-ai-flow-common/interface-app/3_unit/IAIChatMessage';

interface IProModeWindow_v6_warpper_xiaonghongshu {
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
  };
}
export const ProModeWindow_v6_warpper_xiaohongshu = (props: IProModeWindow_v6_warpper_xiaonghongshu) => {
  const dispatch = useDispatch();

  const { t, locale } = props.webCase;

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

  const { id: userId } = userDB;

  return (
    <div className="w-full">
      {userId && <ProModeWindow_v6_warpper_xiaohongshu_login t={t} userDB={userDB} />}
      {!userId && <ProModeWindow_v6_logout t={t} />}
    </div>
  );
};

interface ProModeWindow_v6_warpper_xiaohongshu_login {
  t: IGetT_frontend_output;
  userDB: IUserDB;
}
const ProModeWindow_v6_warpper_xiaohongshu_login = (props: ProModeWindow_v6_warpper_xiaohongshu_login) => {
  const dispatch = useDispatch();

  const { t, userDB } = props;
  const locale = t.currentLocale;

  const localFromStore: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const {
    apiKeys_v2: { llm: llmOption_secrets },
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

  const buttons = [
    {
      operation: EButton_operation.GENERATE,
    },
    {
      operation: EButton_operation.REGENERATE,
    },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLargeScreen = windowWidth > 1000;

  // ModelOptions
  const [creativityValue, setCreativityValue] = useState<number>(0.8);
  const [llmName, setLLMName] = useState<ELLM_name>(llmName_from_store);

  const [requestController, setRequestController] = useState<AbortController>(new AbortController());
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const [chatMessages, setChatMessages] = useState<IAIChatMessage[]>([
    // ...chatMessages_from_cache,
    // { ...IAIChatMessage_default, role: EAIFlowRole.USER, content: '你好' },
  ]);
  const [currentVersionNum, setCurrentVersionNum] = useState<number>(chatMessages.length);
  const hasChatMessages = chatMessages.length > 0;

  const onImproveMessage = (chatMessagesBeforeImprove: IAIChatMessage[]) => async () => {};

  const onRegenerateMessage = () => {};

  return (
    <ProModeModelValueProvider value={llmName}>
      <CreativityValueProvider value={creativityValue}>
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
          </div>

          <div className="row">
            <Splitter
              layout={isLargeScreen ? 'horizontal' : 'vertical'}
              className="row row_contextSelected"
              style={{ display: 'flex' }}
            >
              <Splitter.Panel
                className="column"
                defaultSize="35%"
                style={
                  isLargeScreen
                    ? {
                        paddingRight: '1.25rem',
                      }
                    : {
                        overflow: 'unset',
                        // paddingRight: 0,
                        paddingBottom: '1.25rem',
                      }
                }
                collapsible
              >
                <div className="block_title">
                  <h2>{t.get('xiaohongshu')}</h2>
                </div>

                <div className="row">inputs form</div>

                <div className="row buttons">
                  <div className="row operation space-x-4 space-y-4">
                    {buttons.map((item: IPromode_v4_tabPane_context_button) => {
                      const { operation, isHidden } = item;
                      if (!isHidden && operation === EButton_operation.GENERATE) {
                        return (
                          <Button
                            type="primary"
                            onClick={() => {
                              onImproveMessage(chatMessages)();
                            }}
                            disabled={isCalling || currentVersionNum < chatMessages.length}
                          >
                            {t.get('Generate')}
                          </Button>
                        );
                      }
                      if (!isHidden && item.operation === EButton_operation.REGENERATE) {
                        return (
                          <Button
                            type="primary"
                            onClick={() => {
                              onRegenerateMessage();
                            }}
                            disabled={isCalling || chatMessages.length === 0}
                          >
                            {t.get('Regenerate')}
                          </Button>
                        );
                      }
                    })}

                    <Button
                      onClick={() => {
                        requestController.abort();
                        setIsCalling(false);
                      }}
                    >
                      {t.get('Stop')}
                    </Button>
                  </div>
                </div>
              </Splitter.Panel>

              <Splitter.Panel
                className="column component_chatMessages_history_container"
                defaultSize="65%"
                style={
                  isLargeScreen
                    ? { position: 'relative', paddingLeft: '1.25rem' }
                    : {
                        position: 'relative',
                        overflow: 'unset',
                        // paddingLeft: 0,
                        paddingTop: '1.25rem',
                      }
                }
                collapsible
              >
                content
              </Splitter.Panel>
            </Splitter>
          </div>
        </div>
      </CreativityValueProvider>
    </ProModeModelValueProvider>
  );
};
