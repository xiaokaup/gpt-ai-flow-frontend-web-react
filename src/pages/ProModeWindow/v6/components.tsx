import { IGetT_frontend_output } from "../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory";

export const getCreationModeOptions = (t: IGetT_frontend_output) => {
  return [
    { label: t.get('Precise'), value: 0.6 },
    { label: t.get('Balanced'), value: 0.8 },
    { label: t.get('Creative'), value: 1 },
  ];
};
