export type ArticleSingleType = {
  title: string;
  description: string;
  link: string;
  img1: string;
  img2: string;
  more: string;
};

export const articlesUa: {
  [id: string]: ArticleSingleType;
} = {
  slide1: {
    title: "Обладнання для операційних",
    description: "Наркозно-дихальні апарати, монітори пацієнта, операційні столи, операційні світильники, консолі та інше",
    link: "/catalog/sub-catalog?category=or-equipment",
    img1: "/slider-photo/oper1(back).png",
    img2: "/slider-photo/oper1.png",
    more: "Перейти в розділ",
  },
  slide2: {
    title: "Обладнання для відділень інтенсивної терапії",
    description:
      "Апарати ШВЛ, монітори пацієнта, консолі, панелі, аспіратори, ліжка, візки та інше",
    link: "/catalog/sub-catalog?category=icu-equipment",
    img1: "/slider-photo/intencive-terapy(back).png",
    img2: "/slider-photo/intencive-terapy.png",
    more: "Перейти в розділ",
  },
  
  slide3: {
    title: "Неонатальне обладнання",
    description:
      "Інкубатори, відкриті реанімаційні місця, лампи фототерапії, білірубінометри та інше",
    link: "/catalog/sub-catalog?category=neonatal-equipment",
    img1: "/slider-photo/neonat1(back).png",
    img2: "/slider-photo/neonat1.png",
    more: "Перейти в розділ",
  },
  slide4: {
    title: "Стерилізаційне та дезінфекційне обладнання",
    description: "Стерилізатори, мийні машини та інше",
    link: "/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment",
    img1: "/slider-photo/sterilization(back).png",
    img2: "/slider-photo/sterilization.png",
    more: "Перейти в розділ",
  },
  slide5: {
    title: "Медичне газопостачання",
    description: "Компресорні станції, вакуумні станції, кисневі станції, блоки контролю, газові розетки та інше",
    link: "/catalog/sub-catalog?category=gas-management-systems",
    img1: "/slider-photo/med-gaz(back).png",
    img2: "/slider-photo/med-gaz.png",
    more: "Перейти в розділ",
  },
  slide6: {
    title: "Медичні меблі",
    description: "Операційні столи, ліжка, візки, крісла, стільці та інше",
    link: "/catalog/sub-catalog?category=furniture",
    img1: "/slider-photo/furniture-med(back).png",
    img2: "/slider-photo/furniture-med.png",
    more: "Перейти в розділ",
  },
  slide7: {
    title: "Обладнання для кабінетів МРТ",
    description: "Наркозно-дихальний апарат для роботи при МРТ, монітори пацієнта для роботи при МРТ",
    link: "/catalog/sub-catalog?category=mri-equipment",
    img1: "/slider-photo/mri(back).png",
    img2: "/slider-photo/mri.png",
    more: "Перейти в розділ",
  },
    slide8: {
    title: "Витратні матеріали та аксесуари",
    description: "Дихальні контури, фільтри, сорбент, маски, канюлі, аксесуари для моніторів, флоуметри, зволожувачі та багато іншого",
    link: "/catalog/sub-catalog?category=accessories",
    img1: "/slider-photo/consumables(back).png",
    img2: "/slider-photo/consumables.png",
    more: "Перейти в розділ",
  },
};

export const articlesEng: {
  [id: string]: ArticleSingleType;
} = {
  slide1: {
    title: "Equipment for OR",
    description: "Anesthesia machines, patient monitors, operating tables, operating lights, ceiling supply units and more",
    link: "/catalog/sub-catalog?category=or-equipment",
    img1: "/slider-photo/oper1(back).png",
    img2: "/slider-photo/oper1.png",
    more: "Read more",
  },
  slide2: {
    title: "Equipment for ICU",
    description: "Ventilators, patient monitors, ceiling supply units, wall supply units, aspirators, beds, trolleys and more",
    link: "/catalog/sub-catalog?category=icu-equipment",
    img1: "/slider-photo/intencive-terapy(back).png",
    img2: "/slider-photo/intencive-terapy.png",
    more: "Read more",
  },
  slide3: {
    title: "Neonatal equipment",
    description: "Incubators, open care warmers, phototherapy lamps, bilirubinometers and more",
    link: "/catalog/sub-catalog?category=neonatal-equipment",
    img1: "/slider-photo/neonat1(back).png",
    img2: "/slider-photo/neonat1.png",
    more: "Read more",
  },
  slide4: {
    title: "Sterilization and disinfection equipment",
    description: "Sterilizers, washing machines and more",
    link: "/catalog/sub-catalog?category=cleaning-and-desinfecting-equipment",
    img1: "/slider-photo/sterilization(back).png",
    img2: "/slider-photo/sterilization.png",
    more: "Read more",
  },
  slide5: {
    title: "Medical gas supply",
    description: "Compressor stations, vacuum stations, oxygen stations, gas control units, terminal units and more",
    link: "/catalog/sub-catalog?category=gas-management-systems",
    img1: "/slider-photo/med-gaz(back).png",
    img2: "/slider-photo/med-gaz.png",
    more: "Read more",
  },
  slide6: {
    title: "Medical furniture",
    description: "Operating tables, beds, trolleys, armchairs, chairs and more",
    link: "/catalog/sub-catalog?category=furniture",
    img1: "/slider-photo/furniture-med(back).png",
    img2: "/slider-photo/furniture-med.png",
    more: "Read more",
  },
    slide7: {
    title: "MRI equipment",
    description: "MRI-compatible anesthesia machine, MRI-compatible patient monitors",
    link: "/catalog/sub-catalog?category=mri-equipment",
    img1: "/slider-photo/mri(back).png",
    img2: "/slider-photo/mri.png",
    more: "Read more",
  },
  slide8: {
    title: "Consumables and accessories",
    description: "Breathing circuits, filters, sorbent, masks, cannulas, monitor accessories, flowmeters, humidifiers and much more",
    link: "/catalog/sub-catalog?category=accessories",
    img1: "/slider-photo/consumables(back).png",
    img2: "/slider-photo/consumables.png",
    more: "Read more",
  },
};

