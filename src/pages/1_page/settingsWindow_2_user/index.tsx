import "../../../../styles/global.css";
import "../../../../styles/layout.scss";

import React, { useEffect, useState } from "react";
// import { STORE_USER } from "../../../../tools/4_base/TConstant";
import { SettingsWindow_2_user_1_signup } from "./SettingsWindow_2_user_1_signup";
import { SettingsWindow_2_user_2_login } from "./SettingsWindow_2_user_2_login";
import { SettingsWindow_2_user_3_info } from "./SettingsWindow_2_user_3_info";
import { SettingsWindow_2_user_4_changePassword } from "./SettingsWindow_2_user_4_changePassword";
import { SettingsWindow_2_user_5_forgetPassword } from "./SettingsWindow_2_user_5_forgetPassword";

export enum EUserPageCase {
  LOGIN = "login",
  SIGNUP = "signup",
  INFO = "info",
  CHANGE_PASSWORD = "change_password",
  FORGET_PASSWORD = "forget_password",
}

export const SettingsWindow_2_user = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  // !!window.electron.store.get(STORE_USER).email

  const [pageCase, setPageCase] = useState<EUserPageCase>(
    isAuthenticated ? EUserPageCase.INFO : EUserPageCase.LOGIN
  );

  useEffect(() => {
    // setIsAuthenticated(!!window.electron.store.get(STORE_USER).email);
  }, [pageCase]);

  return (
    <div>
      <div id="settingsWindow_2_user" className="row">
        {!isAuthenticated && pageCase === EUserPageCase.SIGNUP && (
          <SettingsWindow_2_user_1_signup setPageCase={setPageCase} />
        )}
        {!isAuthenticated && pageCase === EUserPageCase.LOGIN && (
          <SettingsWindow_2_user_2_login setPageCase={setPageCase} />
        )}
        {isAuthenticated && pageCase === EUserPageCase.INFO && (
          <SettingsWindow_2_user_3_info
            setPageCase={setPageCase}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
        {isAuthenticated && pageCase === EUserPageCase.CHANGE_PASSWORD && (
          <SettingsWindow_2_user_4_changePassword setPageCase={setPageCase} />
        )}
        {!isAuthenticated && pageCase === EUserPageCase.FORGET_PASSWORD && (
          <SettingsWindow_2_user_5_forgetPassword setPageCase={setPageCase} />
        )}
      </div>
    </div>
  );
};
