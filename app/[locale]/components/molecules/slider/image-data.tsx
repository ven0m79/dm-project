export type ArticleSingleType = {
  title: string;
  description: string;
  link: string;
  img1: string;
  img2: string;
};

export const articles: {
  [id: string]: ArticleSingleType;
} = {
  slide1: {
    title: "Обладнання для операційних",
    description: "Наркозно-дихальні апарати, монітори пацієнта, операційні столи, операційні світильники, консолі та інше",
    link: "/catalog/sub-catalog?category=operations",
    img1: "/slider-photo/oper1(back).png",
    img2: "/slider-photo/oper1.png",
  },
  slide2: {
    title: "Обладнання для відділень інтенсивної терапії",
    description:
      "Апарати ШВЛ, монітори пацієнта, консолі, панелі, аспіратори, ліжка, візки та інше",
    link: "/catalog/sub-catalog?category=intensive-therapy",
    img1: "/slider-photo/intencive-terapy(back).png",
    img2: "/slider-photo/intencive-terapy.png",
  },
  slide3: {
    title: "Неонатальне обладнання",
    description:
      "Інкубатори, відкриті реанімаційні місця, лампи фототерапії, білірубінометри та інше",
    link: "/catalog/sub-catalog?category=neonathal",
    img1: "/slider-photo/neonat1(back).png",
    img2: "/slider-photo/neonat1.png",
  },
  slide4: {
    title: "Стерилізаційне та дезінфекційне обладнання",
    description: "Стерилізатори, мийні машини та інше",
    link: "/catalog/sub-catalog?category=sterilization",
    img1: "/slider-photo/sterilization(back).png",
    img2: "/slider-photo/sterilization.png",
  },
  slide5: {
    title: "Медичне газопостачання",
    description: "Компресорні станції, вакуумні станції, кисневі станції, блоки контролю, газові розетки та інше",
    link: "/catalog/sub-catalog?category=gaz",
    img1: "/slider-photo/med-gaz(back).png",
    img2: "/slider-photo/med-gaz.png",
  },
  slide6: {
    title: "Медичні меблі",
    description: "Операційні столи, ліжка, візки, крісла, стільці та інше",
    link: "/catalog/sub-catalog?category=furniture",
    img1: "/slider-photo/furniture-med(back).png",
    img2: "/slider-photo/furniture-med.png",
  },
  slide7: {
    title: "Витратні матеріали та аксесуари",
    description: "Дихальні контури, фільтри, сорбент, маски, канюлі, аксесуари для моніторів, флоуметри, зволожувачі та багато іншого",
    link: "/catalog/sub-catalog?category=accessories",
    img1: "/slider-photo/consumables(back).png",
    img2: "/slider-photo/consumables.png",
  },
};

export const articlesEng: {
  [id: string]: ArticleSingleType;
} = {
  slide1: {
    title: "Equipment for OR",
    description: "Anesthesia machines, patient monitors, operating tables, operating lights, ceiling supply units and more",
    link: "/catalog/sub-catalog?category=operations",
    img1: "/slider-photo/oper1(back).png",
    img2: "/slider-photo/oper1.png",
  },
  slide2: {
    title: "Equipment for ICU",
    description: "Ventilators, patient monitors, ceiling supply units, wall supply units, aspirators, beds, trolleys and more",
    link: "/catalog/sub-catalog?category=intensive-therapy",
    img1: "/slider-photo/intencive-terapy(back).png",
    img2: "/slider-photo/intencive-terapy.png",
  },
  slide3: {
    title: "Neonatal equipment",
    description: "Incubators, open care warmers, phototherapy lamps, bilirubinometers and more",
    link: "/catalog/sub-catalog?category=neonathal",
    img1: "/slider-photo/neonat1(back).png",
    img2: "/slider-photo/neonat1.png",
  },
  slide4: {
    title: "Sterilization and disinfection equipment",
    description: "Sterilizers, washing machines and more",
    link: "/catalog/sub-catalog?category=sterilization",
    img1: "/slider-photo/sterilization(back).png",
    img2: "/slider-photo/sterilization.png",
  },
  slide5: {
    title: "Medical gas supply",
    description: "Compressor stations, vacuum stations, oxygen stations, gas control units, terminal units and more",
    link: "/catalog/sub-catalog?category=gaz",
    img1: "/slider-photo/med-gaz(back).png",
    img2: "/slider-photo/med-gaz.png",
  },
  slide6: {
    title: "Medical furniture",
    description: "Operating tables, beds, trolleys, armchairs, chairs and more",
    link: "/catalog/sub-catalog?category=furniture",
    img1: "/slider-photo/furniture-med(back).png",
    img2: "/slider-photo/furniture-med.png",
  },
  slide7: {
    title: "Consumables and accessories",
    description: "Breathing circuits, filters, sorbent, masks, cannulas, monitor accessories, flowmeters, humidifiers and much more",
    link: "/catalog/sub-catalog?category=accessories",
    img1: "/slider-photo/consumables(back).png",
    img2: "/slider-photo/consumables.png",
  },
};

