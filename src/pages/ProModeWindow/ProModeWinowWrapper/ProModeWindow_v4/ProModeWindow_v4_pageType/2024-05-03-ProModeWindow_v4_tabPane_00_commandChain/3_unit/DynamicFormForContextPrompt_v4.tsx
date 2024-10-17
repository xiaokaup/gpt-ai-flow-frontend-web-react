import '../../../../../../../styles/global.css';
import '../../../../../../../styles/layout.scss';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { IReduxRootState } from '../../../../../../../store/reducer';
import { updateInputsCache } from '../../../../../../../store/actions/inputsCacheActions';

import TStringFile from '../../../../../../../gpt-ai-flow-common/tools/TString';
import { to_deprecate_useInputsCache } from '../../../../../../../gpt-ai-flow-common/hooks/useInputsCache';
import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import IInputsCacheFile, {
  to_deprecate_IInputsCache,
} from '../../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';

interface DynamicFormForContextPrompt_input {
  t: IGetT_frontend_output;
  containerStyle: any;
  contextSelectedValue: string;
  setGlobalContext: (value: string) => void;
  setShowContextInputs: (value: boolean) => void;
  setIsContextInputsDirty: (value: boolean) => void;
}

export function DynamicFormForContextPrompt_v4(props: DynamicFormForContextPrompt_input) {
  const dispatch = useDispatch();

  const inputsCacheFromStorage: to_deprecate_IInputsCache = useSelector((state: IReduxRootState) => {
    return state.inputsCache ?? IInputsCacheFile.IInputsCache_default;
  });
  const { inputsCache, setInputsCache } = to_deprecate_useInputsCache({
    inputsCacheFromStorage,
    onInputsCacheChange: (newItem: to_deprecate_IInputsCache) => {
      dispatch(updateInputsCache(newItem) as any);
    },
  });

  const { t, containerStyle, contextSelectedValue, setGlobalContext, setShowContextInputs, setIsContextInputsDirty } =
    props;

  const [placeholderKeys, setPlacehodlerKeys] = useState<string[]>([]);
  const [placeholderValues, setPlaceholderValues] = useState<string[]>([]);
  // const [placeholderKeyValues, setPlaceholderKeyValues] = useState<{ [key: string]: string }>({});

  const init = useCallback(() => {
    const placeholderRegex = /\[([^:\]]+)(?::([^\]]+))?\]/g;
    // const placeholderRegex = /\[ ([^:\]]+) (?: :([^:\]]+) )? \]/g // 分解后

    const matcheKeys: string[] = [];
    const matcheValues: string[] = [];
    // const matcheKeyValues: { [key: string]: string } = {};

    let match = placeholderRegex.exec(contextSelectedValue);
    while (match !== null) {
      const key = match[1];
      const value = match[2];

      // console.log('match', match);
      // console.log('key', key);
      // console.log('value', value);

      matcheKeys.push(key);
      if (value) matcheValues.push(value);
      // matcheKeyValues[key] = value;

      setInputsCache((prevInputs) => {
        if (typeof inputsCache[key] !== 'string' && !inputsCache[key] && value) {
          return {
            ...prevInputs,
            [key]: value,
          };
        }
        return prevInputs;
      });

      match = placeholderRegex.exec(contextSelectedValue);
    }

    setPlacehodlerKeys(matcheKeys);
    setPlaceholderValues(matcheValues);
    // setPlaceholderKeyValues(matcheKeyValues);
  }, [contextSelectedValue, inputsCache, setInputsCache]);

  useEffect(() => {
    init();
  }, [init]);

  const handleInputChange = (placeholder: string, value: string) => {
    setIsContextInputsDirty(true);
    setInputsCache((prevInputs) => ({
      ...prevInputs,
      [placeholder]: value,
    }));
  };

  const generateContextNoPlaceHolder = () => {
    let result = contextSelectedValue;

    // console.log('before result', result);

    placeholderValues.forEach((value) => {
      const regex = new RegExp(`:${value}`, 'g');
      result = result.replace(regex, '');
    });

    // console.log('middle result', result);

    placeholderKeys.forEach((placeholder) => {
      const value = inputsCache[placeholder] || placeholder; // Set default value to placeholder if no value is typed by user
      if (value.trim()) {
        // console.log('placeholder', placeholder);
        // console.log('value', value);
        const escapedPlaceholder = TStringFile.escapeRegExp(`[${placeholder}]`);
        const regex = new RegExp(escapedPlaceholder, 'g');
        result = result.replace(regex, value);
      }
    });

    // console.log('after result', result);

    setGlobalContext(result);
    setIsContextInputsDirty(false);
    message.success(t.get('Fill in successfully'));
    setShowContextInputs(false);
  };

  return (
    <div className="row" style={containerStyle}>
      <div>
        {t.get('Fill in the desired sections (optional) and click 📝 Show/Hide Context Details Form on the right side')}
      </div>
      <div className="row">
        <Form initialValues={inputsCache}>
          {placeholderKeys.map((placeholder, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <Form.Item
                label={`[${placeholder}]`}
                name={placeholder}
                rules={[]}
                //   rules={[{ required: true }]}
                style={{ marginRight: '1rem', marginTop: '1rem' }}
              >
                <TextArea
                  autoSize
                  value={inputsCache[placeholder]}
                  onChange={(e) => handleInputChange(placeholder, e.target.value)}
                />
              </Form.Item>
            </div>
          ))}
        </Form>
      </div>

      <div className="row">
        <Button type="primary" size="small" onClick={generateContextNoPlaceHolder}>
          {t.get('Define context details')}
        </Button>
      </div>
    </div>
  );
}
