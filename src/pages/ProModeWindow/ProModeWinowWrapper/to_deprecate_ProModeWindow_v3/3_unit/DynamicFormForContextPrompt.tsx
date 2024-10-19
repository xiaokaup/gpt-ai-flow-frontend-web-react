import '../../../../../styles/global.css';
import '../../../../../styles/layout.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { IReduxRootState } from '../../../../../store/reducer';
import { updateInputsCache } from '../../../../../store/actions/inputsCacheActions';

import { to_deprecate_useInputsCache } from '../../../../../gpt-ai-flow-common/hooks/to_deprecate_useInputsCache';
import IInputsCacheFile, {
  to_deprecate_IInputsCache,
} from '../../../../../gpt-ai-flow-common/interface-app/3_unit/IInputsCache';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

interface DynamicFormForContextPrompt_input {
  t: IGetT_frontend_output;
  containerStyle: any;
  contextPromptWithPlaceholder: string;
  setContextHandled: (value: string) => void;
  setShowContextInputs: (value: boolean) => void;
  setIsContextInputsDirty: (value: boolean) => void;
}

export function DynamicFormForContextPrompt(props: DynamicFormForContextPrompt_input) {
  const dispatch = useDispatch();

  const inputsCacheFromStorage: to_deprecate_IInputsCache = useSelector((state: IReduxRootState) => {
    return (state.inputsCache as to_deprecate_IInputsCache) ?? IInputsCacheFile.IInputsCache_default;
  });
  const { inputsCache, setInputsCache } = to_deprecate_useInputsCache({
    inputsCacheFromStorage,
    onInputsCacheChange: (newItem: to_deprecate_IInputsCache) => {
      dispatch(updateInputsCache(newItem) as any);
    },
  });

  const {
    t,
    containerStyle,
    contextPromptWithPlaceholder,
    setContextHandled,
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

    setContextHandled(result);
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
