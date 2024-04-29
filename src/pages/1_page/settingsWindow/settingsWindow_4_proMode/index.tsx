import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IReduxRootState } from 'store/reducer';

import { ELocale } from '../../../../gpt-ai-flow-common/enum-app/ELocale';

import ITokenDBFile from '../../../../gpt-ai-flow-common/interface-database/ITokenDB';
import IUserDataFile, { IUserData } from '../../../../gpt-ai-flow-common/interface-app/IUserData';
import CONSTANTS_GPT_AI_FLOW_COMMON from '../../../../gpt-ai-flow-common/config/constantGptAiFlow';
import { useUserData } from '../../../../gpt-ai-flow-common/hooks/useUserData';
import { IGetT_frontend_output } from '../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { EProductItemDB_name } from '../../../../gpt-ai-flow-common/enum-database/EProductItemDB';
import { IProductItemDB_with_expiredAt } from '../../../../gpt-ai-flow-common/interface-database/IProductItemDB';
import { getProductItem_by_userId_from_backend } from '../../../../gpt-ai-flow-common/tools/3_unit/TBackendProductItem';
import TStripeConstantFile_v2File from '../../../../gpt-ai-flow-common/tools/TStripeConstant_v2';
import { FreeVersionAnnounce } from './FreeVersionAnnounce';
import { SettingsWindow_4_proMode_locale } from './SettingsWindow_4_proMode_locale';

interface ISettingsWindow_4_proMode_login_input {
  t: IGetT_frontend_output;
  localeForSettingsWindow: ELocale;
  userData: IUserData;
  dispatch: any;
}
const SettingsWindow_4_proMode_login = (props: ISettingsWindow_4_proMode_login_input) => {
  const { t, localeForSettingsWindow: locale, userData, dispatch } = props;

  const { token: { accessToken: userAccessToken } = ITokenDBFile.ITokenDB_default } = userData;

  const [productItem, setProductItem] = useState<IProductItemDB_with_expiredAt>();
  const [stripePrices, setStripePrices] = useState<Record<EProductItemDB_name, string>>();

  const init = async (paraLocale: ELocale) => {
    const itemFound: IProductItemDB_with_expiredAt = await getProductItem_by_userId_from_backend(
      userAccessToken,
      paraLocale,
      CONSTANTS_GPT_AI_FLOW_COMMON
    );
    setProductItem(itemFound);

    const pricesFound = await TStripeConstantFile_v2File.getStripePrices(
      CONSTANTS_GPT_AI_FLOW_COMMON.APP_ENV === 'Prod'
    );
    setStripePrices(pricesFound[paraLocale]);
  };

  useEffect(() => {
    init(locale);
  }, []);

  return (
    <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
      {productItem?.name === EProductItemDB_name.STARTAI_FREE && <FreeVersionAnnounce locale={t.currentLocale} />}

      <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />

      {productItem && stripePrices && (
        <SettingsWindow_4_proMode_locale
          t={t}
          locale={locale}
          userData={userData}
          productItem={productItem}
          stripePrices={stripePrices}
        />
      )}
    </div>
  );
};

const SettingsWindow_4_proMode_logout = (props: { t: IGetT_frontend_output }) => {
  const { t } = props;
  return (
    <div id="settingsWindowContainer" className="container" style={{ padding: '.4rem' }}>
      {t.get('Please register a user and log in first')}
    </div>
  );
};

interface ISettingsWindow_4_proMode {
  t: IGetT_frontend_output;
  localeForSettingsWindow: ELocale;
}
export const SettingsWindow_4_proMode = (props: ISettingsWindow_4_proMode) => {
  const dispatch = useDispatch();

  const { t, localeForSettingsWindow } = props;

  const userDataFromStorage: IUserData = useSelector((state: IReduxRootState) => {
    return state.user ?? IUserDataFile.IUserData_default;
  });

  const { userData } = useUserData({
    userDataFromStorage,
    onUserDataChange: (newUserData_without_token: IUserData) => {},
    locale: t.currentLocale,
    env: CONSTANTS_GPT_AI_FLOW_COMMON,
  });
  const { id: userId } = userData;

  return (
    <>
      {userId && (
        <SettingsWindow_4_proMode_login
          t={t}
          localeForSettingsWindow={localeForSettingsWindow}
          userData={userData}
          dispatch={dispatch}
        />
      )}
      {!userId && <SettingsWindow_4_proMode_logout t={t} />}
    </>
  );
};
