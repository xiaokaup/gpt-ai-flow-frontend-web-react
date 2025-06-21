import { Tabs, TabsProps } from 'antd';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

export interface IPromptsFactoryPage {
  t: IGetT_frontend_output;
  userAccessToken: string;
}
export const PromptsFactoryPage_v2 = (props: IPromptsFactoryPage) => {
  const { t } = props;

  return (
    <div className="container p-10 w-full">
      <h1>{`${t.get('Prompts Factory')} 🏭`}</h1>
      <div className="factory_container">container</div>
    </div>
  );
};
