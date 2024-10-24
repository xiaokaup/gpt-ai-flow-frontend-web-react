import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Card, Input, message, Tag, Tooltip } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

import { IConstantGptAiFlowHandler } from '../../gpt-ai-flow-common/config/constantGptAiFlow';
import { ELocale } from '../../gpt-ai-flow-common/enum-app/ELocale';
import { EPrompt_v3_category } from '../../gpt-ai-flow-common/enum-app/EPrompt_v3';
import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import {
  IPrompt_v3,
  IPrompt_v3_category,
  IPrompts_v3_default,
} from '../../gpt-ai-flow-common/interface-app/3_unit/IPrompt_v3';

import { Modal_createPrompt_v3 } from './components/Modal_createPrompt_v3';
import { Modal_editPrompt_v3 } from './components/Modal_editPrompt_v3';
import { LinkService } from '../../gpt-ai-flow-common/tools/3_unit/SLink';
import { Drawer_createPersona } from './components/Drawer_create/Drawer_createPersona';
import { useForm } from 'antd/es/form/Form';
import { Drawer_editPersona } from './components/Drawer_edit/Drawer_editPersona';
import {
  IPrompt_v3_type_persona,
  IPrompt_v3_IPersonaModel_default,
} from '../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_persona';
import { ILLMOptions, ILLMOptions_v2_default } from '../../gpt-ai-flow-common/interface-backend/ILLMOptions';
import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { useSelector } from 'react-redux';
import { SLLM_v2_common } from '../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { IReduxRootState } from '../../store/reducer';
import { Drawer_createTargetAudience } from './components/Drawer_create/Drawer_createTargetAudience';
import { Drawer_editTargetAudience } from './components/Drawer_edit/Drawer_editTargetAudience';
import {
  IPrompt_v3_type_targetAudience,
  IPrompt_v3_type_targetAudience_default,
} from '../../gpt-ai-flow-common/interface-app/2_component/IPrompt_v3/IPrompt_v3_type_targetAudience';

const { Search } = Input;

interface IPromptsWindow_input {
  t: IGetT_frontend_output;
  prompts_v3_user: (IPrompt_v3 | IPrompt_v3_type_persona)[];
  setPrompts_v3_user: Dispatch<SetStateAction<(IPrompt_v3 | IPrompt_v3_type_persona)[]>>;
  webCase: {
    t: IGetT_frontend_output;
    locale: ELocale;
    accessToken: string;
    env: IConstantGptAiFlowHandler;
  };
}
export const PromptsWindow = (props: IPromptsWindow_input) => {
  const { t, prompts_v3_user, setPrompts_v3_user, webCase } = props;

  const localDataFromStorage: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const {
    apiKeys: llmOption_secrets,
    proMode: { model_type: llmName_from_store },
  } = localDataFromStorage;

  const llmOptions: ILLMOptions = {
    ...ILLMOptions_v2_default,
    llmName: llmName_from_store,
    llmSecret: SLLM_v2_common.getApiKey_by_llmName(llmName_from_store, llmOption_secrets),
  };

  const [locale] = useState<ELocale>(t.currentLocale);

  // const { prompts_v3_default } = usePrompts_v3_default({
  //   accessToken,
  //   locale,
  //   env,
  // });

  const [searchInput, setSearchInput] = useState<string>('');
  const [isShowModal_create_prompt_v3, setIsShowModal_create_prompt_v3] = useState<boolean>(false);

  const [createPrompt_v3_form] = useForm();
  const [editPrompt_v3_from] = useForm();

  const [isShowModal_edit_prompts_v3, setIsShowModal_edit_prompts_v3] = useState<boolean>(false);
  const [prompts_v3_toEdit, setPrompts_v3_toEdit] = useState<
    IPrompt_v3 | IPrompt_v3_type_persona | IPrompt_v3_type_targetAudience | null
  >({
    ...IPrompts_v3_default,
    ...IPrompt_v3_IPersonaModel_default,
    ...IPrompt_v3_type_targetAudience_default,
    metadata: {
      ...IPrompt_v3_IPersonaModel_default.metadata,
      ...IPrompt_v3_type_targetAudience_default.metadata,
    },
  });

  const [isShowDrawer_create_persona, setIsShowDrawer_create_persona] = useState(false);
  const [isShowDrawer_edit_persona, setIsShowDrawer_edit_persona] = useState(false);
  const [isShowDrawer_create_targetAudience, setIsShowDrawer_create_targetAudience] = useState(false);
  const [isShowDrawer_edit_targetAudience, setIsShowDrawer_edit_targetAudience] = useState(false);
  const [isShowDrawer_create_background, setIsShowDrawer_create_background] = useState(false);
  const [isShowDrawer_edit_background, setIsShowDrawer_edit_background] = useState(false);

  // useEffect(() => {
  //   // @DEPREACTED
  //   const hasInitUserPrompts: boolean = window.electron.store.get(STORE_PROMPTS_V3_HAS_INIT_USER_PATH);

  //   if (hasInitUserPrompts) {
  //     return;
  //   }

  //   setPrompts_v3_user(prompts_v3_default[locale]);
  //   window.electron.store.set(STORE_PROMPTS_V3_HAS_INIT_USER_PATH, true);
  // }, [locale, prompts_v3_default, prompts_v3_user.length, setPrompts_v3_user]);

  return (
    <div className="container PromptsWindow">
      <div>
        <h1>{`${t.get('My prompts')} 🎩`}</h1>
      </div>
      <div className="operations_block">
        <Search
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          style={{ width: 200 }}
        />

        <Button
          type="primary"
          className="ml-4"
          onClick={() => {
            setIsShowModal_create_prompt_v3(true);
          }}
        >
          {`${t.get('Add')} ${t.get('prompt')}`}
        </Button>

        <Tooltip title={t.get('Currently, this feature is only supported in the desktop software.')}>
          <Button
            onClick={() => {
              window.open(LinkService.getDownloadLink(locale), '_blank');
              // setIsShowImportAndExportModal(true);
            }}
            style={{ marginLeft: 8 }}
          >
            {t.get('Import/Export')}
          </Button>
        </Tooltip>
      </div>
      <div
        className="prompts_v3"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {prompts_v3_user
          .filter((item: IPrompt_v3) => {
            if (!searchInput) {
              return true;
            }
            const searchInput_lowerCase = searchInput.toLowerCase();

            const { name, value, category, tags } = item;
            const searchContent_lowercase = `${name} ${value} ${category?.join(' ')} ${tags?.join(' ')}`.toLowerCase();

            if (
              searchInput_lowerCase.length === t.get(EPrompt_v3_category.CONTEXT).length &&
              searchInput_lowerCase.includes(t.get(EPrompt_v3_category.CONTEXT))
            ) {
              return category?.includes(EPrompt_v3_category.CONTEXT);
            }
            if (
              searchInput_lowerCase.length === t.get(EPrompt_v3_category.INSTRUCTION).length &&
              searchInput_lowerCase.includes(t.get(EPrompt_v3_category.INSTRUCTION))
            ) {
              return category?.includes(EPrompt_v3_category.INSTRUCTION);
            }
            if (
              searchInput_lowerCase.length === t.get(EPrompt_v3_category.OUTPUT_INDICATOR).length &&
              searchInput_lowerCase.includes(t.get(EPrompt_v3_category.OUTPUT_INDICATOR))
            ) {
              return category?.includes(EPrompt_v3_category.OUTPUT_INDICATOR);
            }

            return searchContent_lowercase.includes(searchInput_lowerCase);
          })
          .map((thisPrompt_v3: IPrompt_v3) => {
            const { name, value, category, tags } = thisPrompt_v3;

            return (
              <div key={name + value} style={{ flex: '0 0 30%', padding: 10 }}>
                <Card
                  title={name}
                  styles={{ body: { padding: 8 } }}
                  // actions={getActions(item, {
                  //   t,
                  //   onEditClick: () => {
                  //     setPrompts_v3_toEdit(item);
                  //     setIsShowModal_edit_prompts_v3(true);
                  //   },
                  //   hasPrompt_v3: true,
                  //   prompts_v3_user,
                  //   setPrompts_v3_user,
                  //   isShowTour: false,
                  //   refs_tour: [],
                  // })}
                  actions={[
                    <EditOutlined
                      onClick={() => {
                        setPrompts_v3_toEdit(thisPrompt_v3);
                        setIsShowModal_edit_prompts_v3(true);
                      }}
                    />,
                    <CloseOutlined
                      onClick={() => {
                        const newPrompts_v3_user = prompts_v3_user.filter(
                          (prompt) => prompt.name !== thisPrompt_v3.name,
                        );
                        setPrompts_v3_user(newPrompts_v3_user);
                        message.success(t.get('The prompt has been removed from My prompts'));
                      }}
                    />,
                  ]}
                >
                  <div style={{ height: 150, overflow: 'auto' }}>
                    <p>{value}</p>
                  </div>

                  {category?.map((oneCategory: IPrompt_v3_category) => {
                    return (
                      <Tag key={oneCategory} color="#108ee9">
                        {t.get(oneCategory)}
                      </Tag>
                    );
                  })}
                  {tags?.map((oneTag: string) => {
                    return <Tag key={oneTag}>{oneTag}</Tag>;
                  })}
                </Card>
              </div>
            );
          })}
      </div>
      <div className="modals">
        <Modal_createPrompt_v3
          t={t}
          isShow={isShowModal_create_prompt_v3}
          setIsShow={(isShow: boolean, drawerName: EPrompt_v3_category) => {
            if (!isShow) {
              setIsShowModal_create_prompt_v3(false);
              setIsShowDrawer_create_persona(false);
              setIsShowDrawer_create_targetAudience(false);
              return;
            }

            setIsShowModal_create_prompt_v3(true);
            if (drawerName === EPrompt_v3_category.CONTEXT_PERSONA) setIsShowDrawer_create_persona(true);
            if (drawerName === EPrompt_v3_category.CONTEXT_TARGET_AUDIENCE) setIsShowDrawer_create_targetAudience(true);
          }}
          createPrompt_v3_form={createPrompt_v3_form}
          prompts_v3_user={prompts_v3_user}
          setPrompts_v3_user={setPrompts_v3_user}
        />

        <Modal_editPrompt_v3
          t={t}
          isShow={isShowModal_edit_prompts_v3}
          setIsShow={(isShow: boolean, drawerName: EPrompt_v3_category) => {
            if (!isShow) {
              setIsShowModal_edit_prompts_v3(false);
              setIsShowDrawer_edit_persona(false);
              setIsShowDrawer_edit_targetAudience(false);
              return;
            }
            setIsShowModal_edit_prompts_v3(true);
            if (drawerName === EPrompt_v3_category.CONTEXT_PERSONA) setIsShowDrawer_edit_persona(true);
            if (drawerName === EPrompt_v3_category.CONTEXT_TARGET_AUDIENCE) setIsShowDrawer_edit_targetAudience(true);
          }}
          editPrompt_v3_from={editPrompt_v3_from}
          thisPrompt_v3={prompts_v3_toEdit}
          prompts_v3_user={prompts_v3_user}
          setPrompts_v3_user={setPrompts_v3_user}
        />

        {/* === Drawers - start === */}
        <Drawer_createPersona
          t={t}
          createPrompt_v3_form={createPrompt_v3_form}
          isShow={isShowDrawer_create_persona}
          setIsShow={setIsShowDrawer_create_persona}
          llmOptions={llmOptions}
          webCase={webCase}
        />
        <Drawer_createTargetAudience
          t={t}
          createPrompt_v3_form={createPrompt_v3_form}
          isShow={isShowDrawer_create_targetAudience}
          setIsShow={setIsShowDrawer_create_targetAudience}
          llmOptions={llmOptions}
          webCase={webCase}
        />

        <Drawer_editPersona
          t={t}
          editPrompt_v3_from={editPrompt_v3_from}
          // Prompts_v3
          thisPrompt_v3={prompts_v3_toEdit as IPrompt_v3_type_persona}
          isShow={isShowDrawer_edit_persona}
          setIsShow={setIsShowDrawer_edit_persona}
          llmOptions={llmOptions}
          webCase={webCase}
        />
        <Drawer_editTargetAudience
          t={t}
          editPrompt_v3_from={editPrompt_v3_from}
          // Prompts_v3
          thisPrompt_v3={prompts_v3_toEdit as IPrompt_v3_type_targetAudience}
          isShow={isShowDrawer_edit_targetAudience}
          setIsShow={setIsShowDrawer_edit_targetAudience}
          llmOptions={llmOptions}
          webCase={webCase}
        />
        {/* === Drawers - end === */}
      </div>
    </div>
  );
};
