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
};

export const categoriesENIdData = {
  "or-equipment": 61,
  "icu-equipment": 77,
  "neonatal-equipment": 81,
  "cleaning-and-desinfecting-equipment": 85,
  "gas-management-systems": 89,
  furniture: 93,
  "mri-equipment": 1124,
  accessories: 97,
};

export const getCategoriesIds = (locale: string) =>
  locale === "ua" ? categoriesUAIdData : categoriesENIdData;
