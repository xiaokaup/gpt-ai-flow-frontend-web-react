import HTSQueryModule from './components/HTSQeury/HTSQueryModule';
import { IGetT_frontend_output } from '../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import { Tabs, TabsProps } from 'antd';

export interface IDutyGeniePage_input {
  t: IGetT_frontend_output;
  userAccessToken: string;
}
export const DutyGeniePage = (props: IDutyGeniePage_input) => {
  const { t, userAccessToken } = props;

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: 'HTSQueryModule',
      label: 'HTS 关税查询',
      children: <HTSQueryModule t={t} userAccessToken={userAccessToken} />,
    },
  ];

  return (
    <div className="py-10">
      <Tabs defaultActiveKey="HTSQueryModule" items={items} onChange={onChange} />
    </div>
  );
};
