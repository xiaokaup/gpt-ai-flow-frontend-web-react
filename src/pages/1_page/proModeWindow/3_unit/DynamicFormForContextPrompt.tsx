import '../../../../styles/global.css';
import '../../../../styles/layout.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { IReduxRootState } from '../../../../store/reducer';
import { updateInputsCache } from '../../../../store/actions/inputsCacheActions';

import { useInputsCache } from '../../../../gpt-ai-flow-common/hooks/useInputsCache';
import IInputsCacheFile, { IInputsCache } from '../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';

interface DynamicFormForContextPrompt_input {
  containerStyle: any;
  contextPromptWithPlaceholder: string;
  setHandledContextPrompt: (value: string) => void;
  setShowContextInputs: (value: boolean) => void;
  setIsContextInputsDirty: (value: boolean) => void;
}

export function DynamicFormForContextPrompt(props: DynamicFormForContextPrompt_input) {
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
    containerStyle,
    contextPromptWithPlaceholder,
    setHandledContextPrompt,
    setShowContextInputs,
    setIsContextInputsDirty,
  } = props;

  const [placeholders, setPlaceholders] = useState<string[]>([]);

  const init = (paraContextPromptWithPlaceholder: string) => {
    const placeholderRegex = /\{([^}]+)\}/g;
    const matches = paraContextPromptWithPlaceholder.match(placeholderRegex);

    if (!matches) {
      // No placeholders found, return null
      return null;
    }

    const initialPlaceholders = matches ? [...new Set(matches.map((match) => match.slice(1, -1)))] : [];

    return initialPlaceholders ?? [];
  };

  useEffect(() => {
    const initialPlaceholders = init(contextPromptWithPlaceholder);
    setPlaceholders(initialPlaceholders ?? []);
  }, [contextPromptWithPlaceholder]);

  const handleInputChange = (placeholder: string, value: string) => {
    setIsContextInputsDirty(true);
    setInputsCache((prevInputs) => ({
      ...prevInputs,
      [placeholder]: value,
    }));
  };

  const generateContextNoPlaceHolder = () => {
    let result = contextPromptWithPlaceholder;

    // const isAllRequired = false;
    // if (isAllRequired) {
    //   const allFilled = placeholders.every((placeholder) => {
    //     const inputElement = document.getElementById(
    //       placeholder
    //     ) as HTMLInputElement | null;

    //     if (inputElement) {
    //       const value = inputElement.value;
    //       result = result.replace(new RegExp(`{${placeholder}}`, 'g'), value);
    //       return value.trim() !== ''; // Check if the value is not empty or whitespace
    //     }
    //     return false;
    //   });

    //   if (!allFilled) {
    //     // Display an error message or handle the situation as needed
    //     message.error('请填写所有输入框');
    //     return;
    //   }
    // }

    placeholders.forEach((placeholder) => {
      const value = inputsCache[placeholder] || '';
      if (value.trim()) {
        result = result.replace(new RegExp(`{${placeholder}}`, 'g'), value);
      }
    });

    setHandledContextPrompt(result);
    setIsContextInputsDirty(false);
    message.success('填写成功');
  };

  return (
    <div className="row" style={containerStyle}>
      <div>填写需要的部分(可选)，点击最右边的 📝 显示/隐藏 背景细节表单</div>
      <div className="row">
        <Form initialValues={inputsCache}>
          {placeholders.map((placeholder, index) => (
            <div key={index}>
              <Form.Item
                label={placeholder}
                name={placeholder}
                rules={[]}
                //   rules={[{ required: true }]}
                style={{ marginRight: '1rem', marginTop: '1rem' }}
              >
                <TextArea
                  autoSize={{ minRows: 1, maxRows: 12 }}
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
          确定场景阶段细节
        </Button>
        <Button
          size="small"
          style={{ marginLeft: '.4rem' }}
          onClick={() => {
            setShowContextInputs(false);
          }}
        >
          关闭
        </Button>
      </div>
    </div>
  );
}
