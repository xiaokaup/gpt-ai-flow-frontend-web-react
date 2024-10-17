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

  const inputsCacheFromStorage: to_deprecate_IInputsCache = useSelector((state: IReduxRootState) => {
    return state.inputsCache ?? IInputsCacheFile.IInputsCache_default;
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
    contextSelectValueWithPlaceholder,
    setAiCommandValue,
    setAICommandIsDirty,
    toggleAiCommandIsShowInputsForm,
  } = props;

  // console.log('contextSelectValueWithPlaceholder', contextSelectValueWithPlaceholder);

  const [form] = Form.useForm();
  const [placeholderKeys, setPlacehodlerKeys] = useState<string[]>([]);
  const [placeholderValues, setPlaceholderValues] = useState<string[]>([]);
  const [placeholderKeyValues, setPlaceholderKeyValues] = useState<{ [key: string]: string }>({});
  const [newInputsCache_for_component, setNewInputsCache_for_component] =
    useState<to_deprecate_IInputsCache>(inputsCache);

  const init = useCallback(() => {
    const placeholderRegex = /\[([^:\]]+)(?::([^\]]+))?\]/g;
    // const placeholderRegex = /\[ ([^:\]]+) (?: :([^:\]]+) )? \]/g // 分解后

    const matcheKeys: string[] = [];
    const matcheValues: string[] = [];
    const matcheKeyValues: { [key: string]: string } = {};

    let match = placeholderRegex.exec(contextSelectValueWithPlaceholder);
    while (match !== null) {
      const key = match[1];
      const value = match[2];

      // console.log('match', match);
      // console.log('key', key);
      // console.log('value', value);

      matcheKeys.push(key);
      if (value) matcheValues.push(value);
      matcheKeyValues[key] = value;

      match = placeholderRegex.exec(contextSelectValueWithPlaceholder);
    }

    setPlacehodlerKeys(matcheKeys);
    setPlaceholderValues(matcheValues);
    setPlaceholderKeyValues(matcheKeyValues);
  }, [contextSelectValueWithPlaceholder]);

  useEffect(() => {
    init();
  }, [init]);

  const handleInputChange = (placeholder: string, value: string) => {
    setAICommandIsDirty(true);
    setNewInputsCache_for_component((prevInputs) => ({
      ...prevInputs,
      [placeholder]: value,
    }));
  };

  const generateCommandValueNoPlaceHolder = (isToggleIsShowPutsForm: boolean) => () => {
    let result = contextSelectValueWithPlaceholder;

    // console.log('before result', result);

    placeholderValues.forEach((value) => {
      const regex = new RegExp(`:${value}`, 'g');
      result = result.replace(regex, '');
    });

    // console.log('middle result', result);

    placeholderKeys.forEach((placeholder) => {
      const newInputsCache = form.getFieldsValue();
      const value = newInputsCache[placeholder] || placeholder; // Set default value to placeholder if no value is typed by user
      if (value.trim()) {
        // console.log('before result', result);
        // console.log('placeholder', placeholder);
        // console.log('second value', value);
        const escapedPlaceholder = TStringFile.escapeRegExp(`[${placeholder}]`);
        const regex = new RegExp(escapedPlaceholder, 'g');
        result = result.replace(regex, value);
      }
    });

    // console.log('after result', result);

    setInputsCache(newInputsCache_for_component); // Set global inputs cache finally
    setAiCommandValue(result);
    setAICommandIsDirty(false);
    message.success(t.get('Fill in successfully'));
    if (isToggleIsShowPutsForm) toggleAiCommandIsShowInputsForm();
  };

  const resetPlaceholderValues_as_default = () => {
    const newInputsCache = { ...inputsCache };

    placeholderKeys.forEach((placeholder) => {
      newInputsCache[placeholder] = placeholderKeyValues[placeholder];
    });
    setNewInputsCache_for_component(newInputsCache);
    form.setFieldsValue(newInputsCache);

    // Update the command value
    generateCommandValueNoPlaceHolder(false)();
  };

  return (
    <div className="row" style={containerStyle}>
      <div className="row">
        <Form form={form} initialValues={inputsCache}>
          {placeholderKeys.map((placeholder, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <Form.Item
                label={`[${placeholder}]`}
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
        <div className="row">
          <Button type="primary" size="small" onClick={generateCommandValueNoPlaceHolder(true)}>
            {t.get('Define command details')}
          </Button>
        </div>
        {placeholderValues.length > 0 && (
          <div className="row">
            <Button size="small" onClick={resetPlaceholderValues_as_default}>
              使用默认值
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
