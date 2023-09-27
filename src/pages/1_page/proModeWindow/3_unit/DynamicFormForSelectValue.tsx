import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useInputsCache } from '../../../../gpt-ai-flow-common/hooks/useInputsCache';

interface DynamicFormForSelectValue_input {
  containerStyle: any;
  contextSelectValueWithPlaceholder: string;
  setHandledSelectValue: (value: string) => void;
  setAICommandsIsDirty: (value: boolean) => void;
  toggleAiCommandsIsShowInputsForm: () => void;
}

export function DynamicFormForSelectValue(props: DynamicFormForSelectValue_input) {
  const inputsCacheFromStorage: { [key: string]: string } = {};
  const { inputsCache, setInputsCache } = useInputsCache({
    inputsCacheFromStorage,
    onInputsCacheChange: (newIntem: { [key: string]: string }) => {},
  });

  const {
    containerStyle,
    contextSelectValueWithPlaceholder: contextPromptWithPlaceholder,
    setHandledSelectValue: setHandledContextPrompt,
    setAICommandsIsDirty,
    toggleAiCommandsIsShowInputsForm,
  } = props;

  const placeholderRegex = /\{([^}]+)\}/g;
  const matches = contextPromptWithPlaceholder.match(placeholderRegex);

  // if (!matches) {
  //   // No placeholders found, return null
  //   return null;
  // }

  const initialPlaceholders = matches ? [...new Set(matches.map((match) => match.slice(1, -1)))] : [];

  const [placeholders] = useState<string[]>(initialPlaceholders);

  const handleInputChange = (placeholder: string, value: string) => {
    setAICommandsIsDirty(true);
    setInputsCache((prevInputs: any) => ({
      ...prevInputs,
      [placeholder]: value,
    }));
  };

  const generateCommandValueNoPlaceHolder = () => {
    let result = contextPromptWithPlaceholder;

    placeholders.forEach((placeholder) => {
      const value = inputsCache[placeholder] || '';
      if (value.trim()) {
        result = result.replace(new RegExp(`{${placeholder}}`, 'g'), value);
      }
    });

    setHandledContextPrompt(result);
    setAICommandsIsDirty(false);
    toggleAiCommandsIsShowInputsForm();
  };

  return (
    <div className="row" style={containerStyle}>
      <div className="row">
        <Form layout="inline" initialValues={inputsCache}>
          {placeholders.map((placeholder, index) => (
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
                <Input
                  type="text"
                  value={inputsCache[placeholder]}
                  onChange={(e) => handleInputChange(placeholder, e.target.value)}
                />
              </Form.Item>
            </div>
          ))}
        </Form>
      </div>

      <div className="row">
        <Button type="primary" onClick={generateCommandValueNoPlaceHolder}>
          确定指令细节
        </Button>
      </div>
    </div>
  );
}
