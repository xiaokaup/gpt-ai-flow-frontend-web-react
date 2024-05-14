import { IInputsCache } from 'gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import {
  IAdjust_for_type_langchain,
  IBackground_for_type_langchain,
  IFormItem,
} from '../../../../gpt-ai-flow-common/interface-app/solution_ProMode_v4/type/03-custome-langchain/IProMode_v4_context_type_langchain';

export function updateBackground_for_proModeWindow_v4<T extends Partial<IBackground_for_type_langchain>>(
  background: IBackground_for_type_langchain,
  backgroundFormItems: IFormItem<T>[],
  updates_inputCache: IInputsCache,
): IBackground_for_type_langchain {
  const newBackground = { ...background };

  const backgroundKeyNames = backgroundFormItems.map((item) => item.name);

  for (const key in updates_inputCache) {
    if (key in backgroundKeyNames) {
      newBackground[key as keyof IBackground_for_type_langchain] = updates_inputCache[key];
    }
  }
  return newBackground;
}

export function updateAdjust_for_proModeWindow_v4<T extends Partial<IAdjust_for_type_langchain>>(
  adjust: IAdjust_for_type_langchain,
  adjustFormItems: IFormItem<T>[],
  updates_inputCache: IInputsCache,
): IAdjust_for_type_langchain {
  const newAdjust = { ...adjust };

  // console.log('newAdjust', newAdjust);

  const adjustKeyNames: string[] = adjustFormItems.map((item) => item.name) as string[];

  for (const key in adjustKeyNames) {
    const keyName = adjustKeyNames[key];
    newAdjust[keyName as keyof IAdjust_for_type_langchain] = updates_inputCache[keyName];
  }

  // console.log('newAdjust', newAdjust);
  return newAdjust;
}
