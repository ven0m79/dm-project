'use client'

import { Sidebar } from 'flowbite-react';
import styles from "./Sub-catalog.module.css";
import React, { useCallback, useEffect } from "react";
import { MainLayout } from "@app/[locale]/components/templates";
//import { unstable_setRequestLocale } from "next-intl/server";
// import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@pages/api/woocommerce.setup';


const SubCatalog = ({ params: { locale } }: { params: { locale: string } }) => {
  const t = useTranslations('Footer');
  // unstable_setRequestLocale(locale);
  // const router = useRouter();
  // const data = router.query;


   const getData = useCallback(async () => {


     try {
       const data = await api.get('products');
     } catch (err) {
       console.log(err);

     }
   }, [])

   useEffect(() => {
     getData()
   }, [])


  return (
    <MainLayout>
      <div className={classNames("flex flex-1 flex-row justify-left self-center", styles.subCatalog)}>
        <div className={classNames("mt-4", styles.subMenu)}>
        <div className={classNames("mt-3", styles.subMenuDashHead)}>Каталог по типу призначення</div>
          <Sidebar aria-label="Catalog">
            <Sidebar.ItemGroup>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('or-equipment')} open>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(1);
                }}>{t('or-equipment')} Наркозно-дихальні апарати</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(2);
                }}>{t('or-equipment')} №2</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(3);
                }}>{t('or-equipment')} №3</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(4);
                }}>{t('or-equipment')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('icu-equipment')}>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(5);
                }}>{t('icu-equipment')} №1</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(6);
                }}>{t('icu-equipment')} №2</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(7);
                }}>{t('icu-equipment')} №3</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(8);
                }}>{t('icu-equipment')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('neonatal-equipment')}>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(9);
                }}>{t('neonatal-equipment')} №1</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(10);
                }}>{t('neonatal-equipment')} №2</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(11);
                }}>{t('neonatal-equipment')} №3</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(12);
                }}>{t('neonatal-equipment')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('candd-equipment')}>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(13);
                }}>{t('candd-equipment')} №1</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(14);
                }}>{t('candd-equipment')} №2</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(15);
                }}>{t('candd-equipment')} №3</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(16);
                }}>{t('candd-equipment')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('gas-systems')}>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(17);
                }}>{t('gas-systems')} №1</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(18);
                }}>{t('gas-systems')} №2</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(19);
                }}>{t('gas-systems')} №3</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(20);
                }}>{t('gas-systems')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('other-equipment')}>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(21);
                }}>{t('other-equipment')} №1</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(22);
                }}>{t('other-equipment')} №2</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(23);
                }}>{t('other-equipment')} №3</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(24);
                }}>{t('other-equipment')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('accessories')}>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(25);
                }}>{t('accessories')} №1</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(26);
                }}>{t('accessories')} №2</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(27);
                }}>{t('accessories')} №3</Sidebar.Item>
                <Sidebar.Item as="div" className={classNames('cursor-pointer', styles.subItem)} onClick={() => {
                  console.log(28);
                }}>{t('accessories')} №4</Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar>
          <div className={classNames("", styles.subMenuDash)}></div>
        </div>
        <div className='text-gray-400 mx-4'>




          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi alias qui sequi ipsa! Fugit, iste. Excepturi natus non ratione quae voluptas dignissimos enim labore, voluptates soluta esse, amet sunt obcaecati doloribus maiores harum tempore possimus maxime placeat cupiditate earum velit ullam in? Facere rem dicta modi! Quidem ipsum reprehenderit quibusdam et numquam doloremque! Qui laudantium atque adipisci iste omnis eos optio ex, maiores dolores itaque dolor facilis iusto quidem natus dolorum quod ullam eum quo tempore? Nesciunt facilis unde reiciendis dolorem neque eos aut praesentium? In cumque magni eveniet, qui porro illo error nisi debitis veritatis commodi, dolorem repudiandae ipsam omnis dicta quis quidem ipsa optio nulla ullam eos totam autem! Esse qui aut maiores magni voluptatibus ratione recusandae rerum temporibus, culpa quasi eligendi! Voluptates iste eveniet ea, magnam ab laudantium molestiae voluptatem maxime expedita ipsam nostrum dolores esse, nemo explicabo mollitia vitae suscipit vel blanditiis eligendi odit tenetur eum. Odio magni accusamus neque debitis ut excepturi, voluptas doloribus nostrum? Corporis voluptatum aut vero rerum dicta consectetur quam eaque nemo omnis nisi modi voluptas repellendus suscipit praesentium quisquam dolorum sint autem, sit aliquam neque. Quo, reiciendis. Cum, ducimus, nihil rerum atque dolor architecto inventore ipsum laborum consequatur corporis quas? Error distinctio vero fugiat unde et suscipit architecto iusto rem ullam commodi! Ratione, dolorem sequi! Minima dolores fugiat et voluptatem esse. Deserunt corporis aut mollitia repellendus voluptatibus excepturi amet fugiat dolore maxime quasi? Similique sunt eaque placeat nobis autem at fuga veniam eligendi itaque veritatis labore dolorem, impedit temporibus quos! Aliquam quas error voluptatem, quam minima tenetur in quis, possimus reiciendis placeat enim nisi unde quos non odio. Facilis dolores quaerat doloribus molestias provident, quo cupiditate autem aliquam voluptatem adipisci perspiciatis explicabo nisi recusandae mollitia repellat totam nihil deleniti dolorum earum! Quibusdam obcaecati porro aperiam, quaerat quae magni non laborum voluptates fugiat accusamus neque illum alias pariatur perspiciatis repellendus vitae ratione praesentium dolor quidem? Cum odio, amet distinctio, nulla labore dicta repellendus iusto vero explicabo, alias officia. Quam delectus praesentium, incidunt fuga ipsum facilis ducimus neque fugiat officia sint laboriosam consectetur, ipsam debitis aspernatur suscipit commodi rerum repellat maxime? Nobis dolorem nulla maxime alias natus esse illum ipsam quam, quas, nemo, libero temporibus deserunt unde fugit voluptas corporis totam dolor suscipit sed laudantium explicabo quibusdam aut? Doloribus architecto suscipit, mollitia non distinctio quis itaque iste, amet iure est fugiat pariatur in! Itaque eligendi tempora animi harum quos saepe earum magnam? Quas mollitia rem veritatis quia earum fugit enim laudantium dolores autem, nulla vitae omnis ad quibusdam nam aliquam odit adipisci quasi vel a sint! Totam quibusdam, pariatur cupiditate natus impedit aliquid odit vero labore qui similique laudantium dicta voluptatibus deleniti maiores laborum. Nobis incidunt velit iusto dignissimos ea tenetur eaque perspiciatis corrupti earum atque amet, ipsam non at ad doloribus laudantium quam ex distinctio dolor exercitationem. Placeat vel, aliquam ipsam ipsa sint eos obcaecati, quo dolores, sit illum expedita. Placeat omnis ducimus adipisci tempora tenetur sed totam soluta laudantium molestiae iusto cum magni dolor repudiandae blanditiis rem animi debitis facere saepe temporibus, officiis nulla dignissimos. Asperiores itaque incidunt, hic, enim officiis nisi earum explicabo ab animi minus suscipit, deserunt dignissimos voluptate porro perspiciatis consectetur laudantium vero officia dolorum minima aliquam in? Similique numquam hic earum culpa, ullam sint deleniti quos, provident laborum explicabo eveniet vero dolorum? Quasi sequi excepturi explicabo expedita accusantium harum consectetur mollitia, ut neque totam. Veniam sed eum, maxime magnam cupiditate inventore aut facere veritatis consequatur molestias repudiandae praesentium nihil est! Dolorem tempora tempore obcaecati blanditiis? Modi iure quae quos debitis deserunt delectus eius nulla odit culpa qui nihil et fugiat neque nam dolorum, laboriosam placeat ipsa nobis!
        </div>
        <div className={classNames("mt-4", styles.subMenu)}>
        <div className={classNames("mt-3", styles.subMenuDashHead)}>Каталог по типу обладнання</div>
          <Sidebar aria-label="Catalog">

            <Sidebar.ItemGroup>

              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('or-equipment')} open>
                <Sidebar.Item href="#">{t('or-equipment')} №1</Sidebar.Item>
                <Sidebar.Item href="#">{t('or-equipment')} №2</Sidebar.Item>
                <Sidebar.Item href="#">{t('or-equipment')} №3</Sidebar.Item>
                <Sidebar.Item href="#">{t('or-equipment')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('neonatal-equipment')}>
                <Sidebar.Item href="#">{t('neonatal-equipment')} №1</Sidebar.Item>
                <Sidebar.Item href="#">{t('neonatal-equipment')} №2</Sidebar.Item>
                <Sidebar.Item href="#">{t('neonatal-equipment')} №3</Sidebar.Item>
                <Sidebar.Item href="#">{t('neonatal-equipment')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('candd-equipment')}>
                <Sidebar.Item href="#">{t('candd-equipment')} №1</Sidebar.Item>
                <Sidebar.Item href="#">{t('candd-equipment')} №2</Sidebar.Item>
                <Sidebar.Item href="#">{t('candd-equipment')} №3</Sidebar.Item>
                <Sidebar.Item href="#">{t('candd-equipment')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('gas-systems')}>
                <Sidebar.Item href="#">{t('gas-systems')} №1</Sidebar.Item>
                <Sidebar.Item href="#">{t('gas-systems')} №2</Sidebar.Item>
                <Sidebar.Item href="#">{t('gas-systems')} №3</Sidebar.Item>
                <Sidebar.Item href="#">{t('gas-systems')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('other-equipment')}>
                <Sidebar.Item href="#">{t('other-equipment')} №1</Sidebar.Item>
                <Sidebar.Item href="#">{t('other-equipment')} №2</Sidebar.Item>
                <Sidebar.Item href="#">{t('other-equipment')} №3</Sidebar.Item>
                <Sidebar.Item href="#">{t('other-equipment')} №4</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse className={classNames('', styles.subCollapse)} label={t('accessories')}>
                <Sidebar.Item href="#">{t('accessories')} №1</Sidebar.Item>
                <Sidebar.Item href="#">{t('accessories')} №2</Sidebar.Item>
                <Sidebar.Item href="#">{t('accessories')} №3</Sidebar.Item>
                <Sidebar.Item href="#">{t('accessories')} №4</Sidebar.Item>
              </Sidebar.Collapse>

            </Sidebar.ItemGroup>
          </Sidebar>
          <div className={classNames("", styles.subMenuDash)}></div>
        </div>
      </div>

    </MainLayout>
  );
};

export default SubCatalog;