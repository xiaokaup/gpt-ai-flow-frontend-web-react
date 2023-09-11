import ELocaleFile from '../../gpt-ai-flow-common/enum-app/ELocale';
import { UserPageLocale_zh } from './1_page/UserPageLocale';
import { MenuLocale_zh } from './2_component/MenuLocale';

export default {
  [ELocaleFile.ELocale.ZH]: {
    ...UserPageLocale_zh,

    ...MenuLocale_zh,
  },
};
