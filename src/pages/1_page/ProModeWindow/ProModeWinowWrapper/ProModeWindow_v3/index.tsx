import '../../../../../styles/global.css';
import '../../../../../styles/drag.css';
import '../../../../../styles/layout.scss';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { Alert, Button, Select, Slider, Tabs, message } from 'antd';

import { IReduxRootState } from '../../../../../store/reducer';
import { updateSpecificUserData, userLogoutAction } from '../../../../../store/actions/userActions';

import { useProModeSetDataUI } from './useProModeSetDataUI';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { CreativityValueProvider } from '../../../../../gpt-ai-flow-common/contexts/CreativityValueProviderContext';
import { ProModeModelValueProvider } from '../../../../../gpt-ai-flow-common/contexts/ProModeModelValueProviderContext';
import { useUserData } from '../../../../../gpt-ai-flow-common/hooks/useUserData';
import { EServiceCategoryDB_name } from '../../../../../gpt-ai-flow-common/enum-database/EServiceCategoryDB';
import { IUserData, IUserData_default } from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IUserData';
import ISubscriptionDB_v2File, {
  ISubscriptionDB_v2,
} from '../../../../../gpt-ai-flow-common/interface-database/ISubscriptionDB_v2';

import { EOpenAiModel_type } from '../../../../../gpt-ai-flow-common/enum-backend/EOpenAIModelType';
import IStoreStorageFile, {
  IStoreStorageLocalSettings,
} from '../../../../../gpt-ai-flow-common/interface-app/4_base/IStoreStorage';
import { ModelStaticService } from '../../../../../gpt-ai-flow-common/tools/2_class/SModels';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { ITabPanel } from './proModeWindowType';

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
  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserData_default;
  });
  const localDataFromStorage: IStoreStorageLocalSettings = useSelector((state: IReduxRootState) => {
    return state.local ?? IStoreStorageFile.IStoreStorageLocalSettings_default;
  });
  const {
    proMode: { model_type },
  } = localDataFromStorage;
  const subscription_v2FromStorage: ISubscriptionDB_v2 = useSelector((state: IReduxRootState) => {
    return state.subscription_v2 ?? ISubscriptionDB_v2File.ISubscriptionDB_v2_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {
      dispatch(updateSpecificUserData(newUserData_without_token) as any);
    },
    locale: t.currentLocale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });

  const { id: userId, serviceCategories = [], isBetaUser } = userData;

  if (!userId) {
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
        <Link to="/app/logout">{t.get('Logout')}</Link>
      </>
    );
  }

  const isFreeVersion = true;

  // === ProMode Data - start ===
  const { defaultTabPanels } = useProModeSetDataUI({
    t,
    userDataFromStorage: userData,
    serviceCategories,
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
  const [proModeModelType, setProModeModelType] = useState<EOpenAiModel_type>(model_type);
  const [subscription_v2Data] = useState<ISubscriptionDB_v2>(
    subscription_v2FromStorage ?? ISubscriptionDB_v2File.ISubscriptionDB_v2_default,
  );
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
          className="row top_block"
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

                if (!serviceCategories.includes(selectedProdMode)) {
                  message.error(t.get("You don't have permission to use this panel"));
                  return;
                }

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
              options={ModelStaticService.getModelTypeOptions(userData, subscription_v2Data)}
              style={{
                width: 180,
              }}
            />
          </div>
        </div>

        {!isFreeVersion && !isBetaUser && (
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
                type="editable-card"
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
