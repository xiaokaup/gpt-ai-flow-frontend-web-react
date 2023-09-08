import ELocaleFile from '../../gpt-ai-flow-common/enum-app/ELocale';
import { UserPageLocale_en } from './1_page/UserPageLocale';
import { MenuLocale_en } from './2_component/MenuLocale';

export default {
  [ELocaleFile.ELocale.EN]: {
    ...UserPageLocale_en,

    ...MenuLocale_en,
  },
};
