import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { IGetT_frontend_output } from '../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

export const MetadataHiddenForm = (props: { t: IGetT_frontend_output }) => {
  const { t } = props;
  return (
    <>
      {/* === metadata - start */}
      {/* persona */}
      <Form.Item className="hidden" label={t.get('Occupation')} name={['metadata', 'occupation']}>
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Core values')}
        name={['metadata', 'coreValues']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Unique skills')}
        name={['metadata', 'uniqueSkill']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Personality traits')}
        name={['metadata', 'personalityTrait']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Appearance')}
        name={['metadata', 'appearance']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Additional information')}
        name={['metadata', 'additionalInfo']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>

      {/* targetAudience */}
      <Form.Item
        className="hidden"
        label={t.get('Demographics')}
        name={['metadata', 'demographics']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Lifestyle')}
        name={['metadata', 'lifestyle']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Core values')}
        name={['metadata', 'coreValues']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Challenges')}
        name={['metadata', 'challenges']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Needs')}
        name={['metadata', 'needs']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Consumer Behavior')}
        name={['metadata', 'consumerBehavior']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Scenarios')}
        name={['metadata', 'scenarios']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Emotions')}
        name={['metadata', 'emotions']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Social Influence')}
        name={['metadata', 'socialInfluence']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Trends')}
        name={['metadata', 'trends']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Additional information')}
        name={['metadata', 'additionalInfo']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>

      {/* background */}
      <Form.Item
        className="hidden"
        label={t.get('Subject')}
        name={['metadata', 'subject']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Date')}
        name={['metadata', 'when']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Address')}
        name={['metadata', 'where']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Event')}
        name={['metadata', 'what']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Background')}
        name={['metadata', 'context']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      <Form.Item
        className="hidden"
        label={t.get('Additional information')}
        name={['metadata', 'additionalInfo']}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <TextArea autoSize />
      </Form.Item>
      {/* === metadata - end */}
    </>
  );
};
