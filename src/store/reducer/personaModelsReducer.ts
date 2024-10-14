import { IPersonaModel } from '../../gpt-ai-flow-common/interface-app/2_component/IPersonaModel/IPersonaModel_index';
import { IAction } from '../store';

export interface IPersonaModelsReducerState {
  user: IPersonaModel[];
}

const initialState: IPersonaModelsReducerState = {
  user: [],
};

export const personaModelsReducer = (state: IPersonaModelsReducerState = initialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
