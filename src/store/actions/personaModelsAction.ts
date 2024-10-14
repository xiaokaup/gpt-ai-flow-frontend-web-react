import { Dispatch } from 'redux';
import { IPersonaModel } from '../../gpt-ai-flow-common/interface-app/2_component/IPersonaModel/IPersonaModel_index';

export const ADD_PERSONA_MODEL = 'ADD_PERSONA_MODEL';
export const addPersonaModelAction = (newPersonaModel: IPersonaModel) => {
  return {
    type: ADD_PERSONA_MODEL,
    payload: newPersonaModel,
  };
};

export const EDIT_PERSONA_MODEL = 'EDIT_PERSONA_MODEL';
export const editPersonaModelAction = (updatedPersonaModel: IPersonaModel) => {
  return {
    type: EDIT_PERSONA_MODEL,
    payload: updatedPersonaModel,
  };
};

export const DELETE_PERSONA_MODEL = 'DELETE_PERSONA_MODEL';
export const deletePersonaModelAction = (deletedPersonaModelId: string) => {
  return {
    type: DELETE_PERSONA_MODEL,
    payload: deletedPersonaModelId,
  };
};

export const QUERY_PERSONA_MODELS = 'QUERY_PERSONA_MODELS';
export const queryPersonaModelsAction = (query: string) => (dispatch: Dispatch, getState: any) => {
  const { personaModels } = getState();
  const { user } = personaModels;
  return user.filter((personaModel: IPersonaModel) => {
    return (
      personaModel.uuid.toLowerCase().includes(query.toLowerCase()) ||
      personaModel.occupation.toLowerCase().includes(query.toLowerCase()) ||
      personaModel.coreValues.toLowerCase().includes(query.toLowerCase()) ||
      personaModel.uniqueSkill.toLowerCase().includes(query.toLowerCase()) ||
      personaModel.personalityTrait.toLowerCase().includes(query.toLowerCase()) ||
      personaModel.appearance.toLowerCase().includes(query.toLowerCase()) ||
      personaModel.additionalInfo.toLowerCase().includes(query.toLowerCase())
    );
  });
};
