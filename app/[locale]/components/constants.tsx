export const LEFT_BAR_PARENT_ID = 50;
export const LEFT_BAR_PARENT_ID_EN = 52;

export const RIGHT_BAR_PARENT_ID = 55;
export const RIGHT_BAR_PARENT_ID_EN = 57;

export const categoriesUAIdData = {
  "or-equipment": 19,
  "icu-equipment": 75,
  "neonatal-equipment": 79,
  "cleaning-and-desinfecting-equipment": 83,
  "gas-management-systems": 87,
  furniture: 91,
  "mri-equipment": 1122,
  accessories: 95,
  "ventilators-icu2": 648,
  aspiration2: 1163,
  vaporisers2: 1151,
  accessories2: 140,
  "gas-analyzers-2": 1137,
  "wall-supply-and-ceiling-supply-units2": 247,
  "washing-and-disinfecting-machines2": 114,
  "patient-monitors2": 69,
  "anesthesia-and-respiratory-devices-2": 59,
  "neonatal-equipment-2": 290,
  "supply-equipment-for-medical-gases2": 265,
  "bedside-cabinet2": 984,
  "recovery-chair2": 1002,
  "operating-and-examination-lamps-en2": 674,
  "medical-sterilizers-autoclaves-2": 1042,
  "examination-tables2": 941,
  "operating-tables2": 277,
  "hospital-beds2": 962,
  "surgical-monitors2": 1087,

  "aspiration": 1157,
  "for-infinity": 813,
}

export const categoriesENIdData = {
  "or-equipment": 61,
  "icu-equipment": 77,
  "neonatal-equipment": 81,
  "cleaning-and-desinfecting-equipment": 85,
  "gas-management-systems": 89,
  furniture: 93,
  "mri-equipment": 1124,
  accessories: 97,
  "ventilators-icu2-en": 650,
  "aspiration2-en": 1161,
  "vaporisers2-en": 1149,
  "accessories2-en": 142,
  "gas-analyzers2-en": 1135,
  "wall-supply-and-ceiling-supply-units2-en": 249,
  "washing-and-disinfecting-machines2-en": 116,
  "patient-monitors3-en": 71,
  "anesthesia-and-respiratory-devices-2-en": 67,
  "neonatal-equipment2-en": 294,
  "supply-equipment-for-medical-gases2": 267,
  "bedside-cabinet2": 986,
  "recovery-chair2": 1000,
  "operating-and-examination-lamps2": 676,
  "medical-sterilizers-autoclaves2-en": 1044,
  "examination-tables2-en": 943,
  "operating-tables2-en": 279,
  "hospital-beds2-en": 964,
  "surgical-monitors2-en": 1089,

  "aspiration-en": 1159,
  "for-infinity-en": 815,
};

export const getCategoriesIds = (locale: string) =>
  locale === "ua" ? categoriesUAIdData : categoriesENIdData;
