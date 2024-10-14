/* eslint-disable no-case-declarations */
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
    case 'ADD_PERSONA_MODEL':
      const newPersonaModel = { ...payload };
      return { user: [...state.user, newPersonaModel] };
    case 'EDIT_PERSONA_MODEL':
      const updatedPersonaModel = { ...payload };
      return {
        user: state.user.map((personaModel: IPersonaModel) =>
          personaModel.uuid === payload.uuid ? { ...personaModel, ...updatedPersonaModel } : personaModel,
        ),
      };
    case 'DELETE_PERSONA_MODEL':
      const deletedPersonaModelId = payload;
      return { user: state.user.filter((personaModel: IPersonaModel) => personaModel.uuid !== deletedPersonaModelId) };
    default:
      return state;
  }
};
