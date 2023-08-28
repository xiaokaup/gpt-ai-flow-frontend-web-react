import { useSelector } from 'react-redux';
import { ILocalReducerState } from '../store/reducer/localReducer';
import { IReduxRootState } from '../store/reducer';
import { useState } from 'react';

interface ILocalInfo_ouput {}
export const useLocalInfo = (): ILocalInfo_ouput => {
  const localDataFromStore: ILocalReducerState = useSelector((state: IReduxRootState) => {
    return state.local ?? {};
  });

  const [localData, setLocalData] = useState<ILocalReducerState>(localDataFromStore);

  return {
    localData,
    setLocalData,
  };
};
