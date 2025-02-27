import '../../../../styles/global.css';
import '../../../../styles/drag.css';
import '../../../../styles/layout.scss';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { Alert, Button, Select, Slider, Tabs, message } from 'antd';

import { IReduxRootState } from '../../../../store/reducer';
import { updateSpecificUserDB, userLogoutAction } from '../../../../store/actions/userActions';

import { to_deprecate_useProModeSetDataUI } from './to_deprecate_useProModeSetDataUI';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { CreativityValueProvider } from '../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { ProModeModelValueProvider } from '../../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import { EServiceCategoryDB_name } from '../../../../gpt-ai-flow-common/enum-database/to_deprecate_EServiceCategoryDB';

import IStoreStorageFile, {
  IStoreStorage_settings_local,
} from '../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';

import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { ITabPanel } from './proModeWindowType';
import { SLLM_v2_common } from '../../../../gpt-ai-flow-common/tools/2_class/SLLM_v2_common';
import { ELLM_name } from '../../../../gpt-ai-flow-common/enum-backend/ELLM';
import { IUserDB, IUserDB_default } from '../../../../gpt-ai-flow-common/interface-database/IUserDB';
import { useUserDB } from '../../../../gpt-ai-flow-common/hooks/useUserDB';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface ProModeWindow_v3_input {
  t: IGetT_frontend_output;
}
const ProModeWindow_v3 = (props: ProModeWindow_v3_input) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = props;

  const [creativityValue, setCreativityValue] = useState<number>(0.8);

  // === Stripe subscription - start ===
  const userDBFromStorage: IUserDB = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDB_default;
  });
  const localDataFromStorage: IStoreStorage_settings_local = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorage_settings_local_default;
  });
  const {
    proMode: { model_type },
  } = localDataFromStorage;

  const { userDB } = useUserDB({
    userDBFromStorage,
    onUserDBChange: (newUserDB_without_token: IUserDB) => {
      dispatch(updateSpecificUserDB(newUserDB_without_token) as any);
    },
    t,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const { id: userId } = userDB;

  if (!userId) {
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
  }

  const isFreeVersion = true;

  // === ProMode Data - start ===
  const { defaultTabPanels } = to_deprecate_useProModeSetDataUI({
    t,
    userDBFromStorage: userDB,
  });
  // === ProMode Data - end ===

  // === proMode selector - start ===
  const [selectedProdMode, setSelectedProdMode] = useState<EServiceCategoryDB_name>();

  const onProModeSelectorChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedProdMode(value as EServiceCategoryDB_name);
  };

  const onProModeSelectorSearch = (value: string) => {
    console.log('search:', value);
  };

  // Model select
  const [proModeModelType, setProModeModelType] = useState<ELLM_name>(model_type);
  // === proMode selector - end ===

  // === tab panels - start ===
  const [activeTabPanelKey, setActiveTabPanelKey] = useState<EServiceCategoryDB_name>();
  const [tabPanels, setTabPanels] = useState<ITabPanel[]>([]);
  const newTabPanelIndex = useRef(defaultTabPanels.length);

  useEffect(() => {
    if (defaultTabPanels.length > 0) {
      setActiveTabPanelKey(defaultTabPanels[0].key);
      setTabPanels(defaultTabPanels);
    }
  }, [defaultTabPanels?.length, defaultTabPanels[1]?.disabled]);

  const onTabsChange = (key: string) => {
    setActiveTabPanelKey(key as EServiceCategoryDB_name);
  };

  const addTabPanel = (paraSelectedProdMode: EServiceCategoryDB_name) => {
    const newTabPanel = defaultTabPanels.find((item) => item.value === paraSelectedProdMode);

    if (!newTabPanel) {
      message.error(t.get('The corresponding ProMode interface was not found'));
      return;
    }

    newTabPanelIndex.current += 1; // Increment the property value
    const newActiveTabPanelKey = `${newTabPanelIndex.current}`;
    const { label, value, children } = newTabPanel;

    setTabPanels([
      ...tabPanels,
      {
        key: newActiveTabPanelKey as EServiceCategoryDB_name,
        label: `${newActiveTabPanelKey}-${label}`,
        value,
        children,
        disabled: false,
      },
    ]);
    setActiveTabPanelKey(newActiveTabPanelKey as EServiceCategoryDB_name);
  };

  const removeTabPanel = (targetKey: TargetKey) => {
    const targetIndex = tabPanels.findIndex((pane) => pane.key === targetKey);
    const newPanes = tabPanels.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeTabPanelKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveTabPanelKey(key);
    }
    setTabPanels(newPanes);
  };

  const onEditTabPanel = (targetKey: TargetKey, action: 'add' | 'remove') => {
    console.log('action in onEdit', action);
    console.log('targetKey in onEdit', targetKey);

    if (action === 'add') {
      if (!selectedProdMode) {
        message.error(t.get('Please select the ProMode interface'));
        return;
      }

      addTabPanel(selectedProdMode);
    } else {
      removeTabPanel(targetKey);
    }
  };
  // === tab panels - end ===

  return (
    <div className="drag-region" style={{ width: '100%' }}>
      <div
        className="container proModeContainer"
        style={{ position: 'relative', overflow: 'auto', margin: '1rem auto' }}
      >
        <div
          className="row top_block hidden"
          // style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div className="row top_block_add_tab">
            <Select
              showSearch
              placeholder={t.get('Select the ProMode interface')}
              optionFilterProp="children"
              onChange={onProModeSelectorChange}
              onSearch={onProModeSelectorSearch}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={[
                {
                  value: '',
                  label: t.get('Please select'),
                },
                ...defaultTabPanels.map((item: { value: string; label: string }) => {
                  return {
                    value: item.value,
                    label: item.label,
                  };
                }),
              ]}
              style={{ width: 180 }}
            />

            <Button
              type="primary"
              style={{ marginLeft: 8 }}
              onClick={() => {
                if (!selectedProdMode) {
                  message.error(t.get('Please select the ProMode interface'));
                  return;
                }

                // if (!serviceCategories.includes(selectedProdMode)) {
                //   message.error(t.get("You don't have permission to use this panel"));
                //   return;
                // }

                addTabPanel(selectedProdMode);
              }}
            >
              {t.get('Add')}
            </Button>
          </div>
        </div>

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
          <div className="title">
            <a href="/app/proMode/features" className="text-slate-950 hover:text-slate-600">
              <h3 className="m-0">{t.get('ProMode')} v3.0</h3>
            </a>
          </div>

          <span style={{ color: '#5D6370', marginLeft: '1rem' }}>
            {t.get('Creation value')}: {creativityValue}
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
                setProModeModelType(value as ELLM_name);
              }}
              onSearch={(value: string) => {
                console.log('search:', value);
              }}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={SLLM_v2_common.getAllLLM_selectOptions_for_web(t)}
              style={{
                width: 180,
              }}
            />
          </div>
        </div>

        {!isFreeVersion && (
          <div className="row">
            <Alert
              message={
                <span>
                  {t.get(
                    'John is a busy working professional, but after subscribing to our products, he discovered a new secret to work-life balance.',
                  )}
                  <a href="https://www.app.gptaiflow.com/info" target="_blank">
                    <span style={{ color: '#1677FF' }}>{t.get('Click here')}</span>
                  </a>
                </span>
              }
              type="info"
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}

        <div className="row bottom_block_tabs">
          <ProModeModelValueProvider value={proModeModelType}>
            <CreativityValueProvider value={creativityValue}>
              <Tabs
                size="small"
                hideAdd
                onChange={onTabsChange}
                activeKey={activeTabPanelKey}
                // type="editable-card"
                type="card"
                onEdit={onEditTabPanel}
              >
                {tabPanels.map((pane) => {
                  return (
                    <Tabs.TabPane tab={pane.label} key={pane.key}>
                      {pane.children}
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

export default ProModeWindow_v3;
