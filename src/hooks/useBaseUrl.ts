import { useState, useEffect } from 'react';

interface IUseBaseUrl_input {
  locale: string;
}
export const useBaseUrl = (props: IUseBaseUrl_input) => {
  const { locale } = props;

  const [baseUrl, setBaseUrl] = useState<string>('');

  const init = () => {
    if (locale === 'en') {
      setBaseUrl('');
    }
    if (locale === 'zh') {
      setBaseUrl('/zh');
    }
  };

  useEffect(() => {
    init();
  }, []);

  return [baseUrl, setBaseUrl];
};
