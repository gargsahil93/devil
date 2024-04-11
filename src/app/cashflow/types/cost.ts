export enum CostHeadFields {
  ID = 'id',
  LABEL = 'label',
  GST = 'gst',
  VALUE = 'value',
  PAYMENT_SCHEDULE = 'paymentSchedule',
  TDS_APPLICABLE = 'tdsApplicable',
}

export type CostHeadType = {
  [CostHeadFields.ID]: string;
  [CostHeadFields.LABEL]: string;
  [CostHeadFields.GST]: number;
  [CostHeadFields.VALUE]?: number;
  [CostHeadFields.PAYMENT_SCHEDULE]: PaymentScheduleType;
  [CostHeadFields.TDS_APPLICABLE]: boolean;
};

export enum PaymentScheduleType {
  ONE_TIME = 1,
  INSTALLMENTS = 2,
  CUSTOM = 3,
}
