// === Source api - start ===
export interface IHTSCodeItem_from_source {
  htsCode: string;
  description: string;
  chatper: string;
  unit: string;
  generalRate: string;
  specialRateText: string;
  specialRate: {
    agreement: string;
    aggreementDescription: string;
  }[];
  otherRate: string;
  section301Tariff: string;
  section301TariffDetail: {
    HTS_id: string;
    description: string;
    action_description: string;
    note: string;
  };
  chapter9899: {
    htsno: string;
    indent: string;
    description: string;
    superior: string | null;
    units: string[];
    general: string;
    special: string;
    other: string;
    footnotes: {
      columns: string[];
      marker: string;
      value: string;
      type: string;
    }[];
    quotaQuantity: string;
    additionalDuties: string;
    addiitionalDuties: string;
  }[];
}
// === Source api - end ===

// ==== App data - start ===
export interface IHTSCodeItem {
  htsCode: string;
  description: string;
  chapter: string;
  effectiveDate: string;
  generalRate: string;
  mfnRate: string;
  section301Tariff: string;
  notFound: boolean;
}
// ==== App data - end ===
