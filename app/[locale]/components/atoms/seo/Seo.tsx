import React, { FC } from "react";
import { NextSeo } from "next-seo";

type Props = {
  title: string;
  description: string;
};

const Seo: FC<Props> = ({ title, description }) => {
  return <NextSeo title={title} description={description} />;
};

export default Seo;
