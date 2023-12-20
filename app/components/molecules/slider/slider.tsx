import Image from 'next/image'
import imgSrc from '@molecules/slider/image-data'
import articles from "./image-data";
import React from 'react';
import "./style.css";

import classNames from "classnames";

function Slider() {
  return (
    <div className="example-container">
        {Object.keys(articles).map((el) => (
            <>
            <Image     
            src={imgSrc[el].img1}
            alt='Test1'
            width={1400}
            height={700}
            ></Image>
            <Image     
            src={imgSrc[el].img2}
            alt='Test2'
            width={448}
            height={448}
            ></Image>
                <li key={el}>
                    <p>{articles[el].link}</p>
                    <p>{articles[el].title}</p>
                    <p>{articles[el].description}</p>
                </li>
            </>
        ))}
    </div>
  );
}

export default Slider;