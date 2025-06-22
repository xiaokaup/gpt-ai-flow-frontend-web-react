import { Tabs, TabsProps } from 'antd';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

export interface ICommercePage {
  t: IGetT_frontend_output;
  userAccessToken: string;
}
export const CommercePage = (props: ICommercePage) => {
  const { t } = props;

  const items: TabsProps['items'] = [
    {
      key: 'product-title',
      label: '产品标题',
      children: 'hello',
      // disabled: false,
    },
    {
      key: 'product-description',
      label: '产品描述',
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
