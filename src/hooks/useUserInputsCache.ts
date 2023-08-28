import { useEffect, useState } from 'react';

export const useUserInputsCache = () => {
  // const userInputsCacheFromStore: { [key: string]: string } = window.electron.store_userInputCache.getUserInputsCache();
  const userInputsCacheFromStore: { [key: string]: string } = {};
  const [userInputsCache, setUserInputsCache] = useState<{
    [key: string]: string;
  }>(userInputsCacheFromStore);

  useEffect(() => {
    // window.electron.store_userInputCache.setUserInputsCache(userInputsCache);
  }, [userInputsCache]);

  return {
    userInputsCache,
    setUserInputsCache,
  };
};
