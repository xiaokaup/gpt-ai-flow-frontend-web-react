import { EServiceCategoryDB_name } from '../../../gpt-ai-flow-common/enum-database/EServiceCategoryDB';

export interface ITabPanel {
  key: EServiceCategoryDB_name;
  label: string;
  value: EServiceCategoryDB_name;
  children: React.ReactNode;
  disabled: boolean;
}
