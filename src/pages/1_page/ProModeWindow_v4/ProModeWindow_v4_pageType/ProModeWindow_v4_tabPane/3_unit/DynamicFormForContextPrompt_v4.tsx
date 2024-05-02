import '../../../../../../styles/global.css';
import '../../../../../../styles/layout.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { IReduxRootState } from '../../../../../../store/reducer';
import { updateInputsCache } from '../../../../../../store/actions/inputsCacheActions';

import TStringFile from '../../../../../../gpt-ai-flow-common/tools/TString';
import { useInputsCache } from '../../../../../../gpt-ai-flow-common/hooks/useInputsCache';
import { IGetT_frontend_output } from '../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';
import IInputsCacheFile, { IInputsCache } from '../../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';

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

  const inputsCacheFromStorage: IInputsCache = useSelector((state: IReduxRootState) => {
    return state.inputsCache ?? IInputsCacheFile.IInputsCache_default;
  });
  const { inputsCache, setInputsCache } = useInputsCache({
    inputsCacheFromStorage,
    onInputsCacheChange: (newItem: IInputsCache) => {
      dispatch(updateInputsCache(newItem) as any);
    },
  });

  const { t, containerStyle, contextSelectedValue, setGlobalContext, setShowContextInputs, setIsContextInputsDirty } =
    props;

  const [placeholders, setPlaceholders] = useState<string[]>([]);

  const init = (paraContextSelectedValue: string): string[] => {
    const placeholderRegex = /\[([^\]]+)\]/g;
    const matches = paraContextSelectedValue.match(placeholderRegex) ?? [];

    // console.log('matches', matches);

    return matches;
  };

  useEffect(() => {
    const initialPlaceholders = init(contextSelectedValue);
    setPlaceholders(initialPlaceholders);
  }, [contextSelectedValue]);

  const handleInputChange = (placeholder: string, value: string) => {
    setIsContextInputsDirty(true);
    setInputsCache((prevInputs) => ({
      ...prevInputs,
      [placeholder]: value,
    }));
  };

  const generateContextNoPlaceHolder = () => {
    let result = contextSelectedValue;

    placeholders.forEach((placeholder) => {
      const value = inputsCache[placeholder] || placeholder; // Set default value to placeholder if no value is typed by user
      if (value.trim()) {
        // console.log('before result', result);
        // console.log('placeholder', placeholder);
        // console.log('value', value);
        const escapedPlaceholder = TStringFile.escapeRegExp(placeholder);
        const regex = new RegExp(escapedPlaceholder, 'g');
        result = result.replace(regex, value);
        // console.log('after result', result);
      }
    });

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
          {placeholders.map((placeholder, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <Form.Item
                label={placeholder}
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
