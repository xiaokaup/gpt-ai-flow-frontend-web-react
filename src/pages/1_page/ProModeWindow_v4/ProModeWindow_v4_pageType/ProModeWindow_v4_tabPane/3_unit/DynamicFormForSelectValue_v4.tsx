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

interface DynamicFormForSelectValue_v4_input {
  t: IGetT_frontend_output;
  containerStyle: any;
  contextSelectValueWithPlaceholder: string;
  setAiCommandValue: (value: string) => void;
  setAICommandIsDirty: (value: boolean) => void;
  toggleAiCommandIsShowInputsForm: () => void;
}

export function DynamicFormForSelectValue_v4(props: DynamicFormForSelectValue_v4_input) {
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

  const {
    t,
    containerStyle,
    contextSelectValueWithPlaceholder,
    setAiCommandValue,
    setAICommandIsDirty,
    toggleAiCommandIsShowInputsForm,
  } = props;

  // console.log('contextSelectValueWithPlaceholder', contextSelectValueWithPlaceholder);

  const [placeholders, setPlacehodlers] = useState<string[]>([]);

  useEffect(() => {
    const placeholderRegex = /\[([^\]]+)\]/g;
    const matches: string[] = contextSelectValueWithPlaceholder.match(placeholderRegex) ?? [];

    // console.log('matches', matches);

    const initialPlaceholders: string[] = matches;

    setPlacehodlers(initialPlaceholders);
  }, [contextSelectValueWithPlaceholder]);

  const handleInputChange = (placeholder: string, value: string) => {
    setAICommandIsDirty(true);
    setInputsCache((prevInputs) => ({
      ...prevInputs,
      [placeholder]: value,
    }));
  };

  const generateCommandValueNoPlaceHolder = () => {
    let result = contextSelectValueWithPlaceholder;

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

    setAiCommandValue(result);
    setAICommandIsDirty(false);
    message.success(t.get('Fill in successfully'));
    toggleAiCommandIsShowInputsForm();
  };

  return (
    <div className="row" style={containerStyle}>
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
                style={{
                  marginRight: '.4rem',
                  marginTop: '.4rem',
                }}
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
        <Button type="primary" size="small" onClick={generateCommandValueNoPlaceHolder}>
          {t.get('Define command details')}
        </Button>
      </div>
    </div>
  );
}
