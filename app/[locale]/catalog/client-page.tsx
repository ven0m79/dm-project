import React from "react";
import styles from "./Catalog.module.css";
import { Link } from "../../../i18n/navigation";
import Image from "next/image";
import classNames from "classnames";
import { getTranslations } from "next-intl/server";
import imgCons from "./icons-photo/consumables.webp";
import imgMri from "./icons-photo/mri.webp";
import imgFurniture from "./icons-photo/furniture-med.webp";
import imgIntensive from "./icons-photo/intencive-terapy.webp";
import imgMedgaz from "./icons-photo/med-gaz.webp";
import imgNeonat from "./icons-photo/neonat.webp";
import imgOper from "./icons-photo/oper.webp";
import imgSteriliz from "./icons-photo/sterilization.webp";

type Props = {
  locale: string;
};

export const ClientPage = async ({ locale }: Props) => {
  const t = await getTranslations({ locale, namespace: "Catalog1" });

  const makeHref = (category: string) => {
    const suffix = locale === "en" ? "-en" : "";
    return `/catalog/sub-catalog?category=${category}${suffix}`;
  };

  return (
    <div className={classNames("grid grid-cols-1 sm:grid-cols-2 gap-5 m-5", styles.catalogContainer)}>
      {[
        { href: makeHref("or-equipment"),                       label: t("or-equipment"),    img: imgOper,      priority: true  },
        { href: makeHref("icu-equipment"),                      label: t("icu-equipment"),   img: imgIntensive                  },
        { href: makeHref("neonatal-equipment"),                 label: t("neonatal-equipment"), img: imgNeonat                  },
        { href: makeHref("cleaning-and-desinfecting-equipment"),label: t("candd-equipment"), img: imgSteriliz                   },
        { href: makeHref("gas-management-systems"),             label: t("gas-systems"),     img: imgMedgaz                     },
        { href: makeHref("furniture"),                          label: t("other-equipment"), img: imgFurniture                  },
        { href: makeHref("mri-equipment"),                      label: t("mrt"),             img: imgMri                        },
        { href: makeHref("accessories"),                        label: t("accessories"),     img: imgCons                       },
      ].map(({ href, label, img, priority }) => (
        <Link key={href} href={href} className="w-full">
          <div className={classNames("flex flex-row items-center justify-between rounded-xl", styles["block-decisions"])}>
            <span className={styles.span}>{label}</span>
            <Image className={styles.img} src={img} width={130} height={130} priority={priority} alt={label} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ClientPage;
