export type ArticleSingleType = {
  title: string;
  description: string;
  link: string;
  img1: string;
  img2: string;
};

const articles: {
  [id: string]: ArticleSingleType;
} = {
  slide1: {
    title: "Неонатологія",
    description:
      "Інкубатори для новонароджених транспортні інкубатори для новонароджених та витратні матеріали до інкубаторів та багато іншого",
    link: "/",
    img1: "/slider-photo/neonat.png",
    img2: "/slider-photo/neonat2.png",
  },
  slide2: {
    title: "Обладнання для операційних",
    description: "Коагулятори операційні столи хірургічні інструменти",
    link: "/",
    img1: "/slider-photo/oper.png",
    img2: "/slider-photo/oper2.png",
  },
  slide3: {
    title: "Медичні меблі",
    description: "Тут якась фраза про наші супер медичні меблі",
    link: "/",
    img1: "/slider-photo/stol.png",
    img2: "/slider-photo/stol2.png",
  },
};
export default articles;
