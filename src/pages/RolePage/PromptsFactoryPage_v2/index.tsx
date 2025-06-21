import { Tabs, TabsProps } from 'antd';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

export interface IPromptsFactoryPage {
  t: IGetT_frontend_output;
  userAccessToken: string;
}
export const PromptsFactoryPage_v2 = (props: IPromptsFactoryPage) => {
  const { t } = props;

  const items: TabsProps['items'] = [
    {
      label: 'a',
      key: 'a',
      disabled: false,
      children: 'hello',
    },
  ];

  return (
    <div className="container p-10 w-full">
      <h1>{`${t.get('Prompts Factory')} 🏭`}</h1>
      <div className="factory_container">
        <Tabs defaultActiveKey="1" tabPosition={'left'} style={{ height: 500 }} items={items} />
      </div>
    </div>
  );
};
