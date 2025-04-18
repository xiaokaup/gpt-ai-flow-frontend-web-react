import HTSQueryModule from './components/HTSQueryModule';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

export interface IDutyGeniePage_input {
  t: IGetT_frontend_output;
  userAccessToken: string;
}
export const DutyGeniePage = (props: IDutyGeniePage_input) => {
  const { t, userAccessToken } = props;

  return (
    <div>
      <HTSQueryModule t={t} userAccessToken={userAccessToken} />
    </div>
  );
};
