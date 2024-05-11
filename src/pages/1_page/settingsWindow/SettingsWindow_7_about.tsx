import '../../../styles/global.css';

import React from 'react';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

interface SettingsWindow_7_about_input {
  t: IGetT_frontend_output;
}
export const SettingsWindow_7_about = (props: SettingsWindow_7_about_input) => {
  const { t } = props;
  return (
    <div id="SettingsWindow_6_about" className="container">
      <div id="settingsWindowContainer" className="container" style={{ padding: '8px 10px' }}>
        <div className="row">
          {t.get('Official website')}: <a href="https://www.gptaiflow.com">www.gptaiflow.com</a>
          <br />
          {t.get('Frequently Asked Questions')}:{' '}
          <a href="https://www.gptaiflow.com/docs/proudct/gpt-ai-flow-guide-and-faq">
            www.gptaiflow.com/docs/proudct/gpt-ai-flow-guide-and-faq
          </a>
        </div>
        <div className="row">
          {t.getHTML(
            `If you have any feedback (bugs or suggestions), please send it to <a href="mailto:{email}">{email}</a> or let us know via the <a target="_blank" href="{link}">{userQuestionnaire}</a>`,
            {
              email: 'hello@gptaiflow.com',
              userQuestionnaire: t.get('user questionnaire'),
            }
          )}
        </div>

        <hr />
        <div className="row">
          <span>{t.get('Release version')}: v0.1.60</span>
        </div>
      </div>
    </div>
  );
};
