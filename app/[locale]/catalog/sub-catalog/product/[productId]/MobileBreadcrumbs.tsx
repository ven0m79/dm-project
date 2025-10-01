"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface Breadcrumb {
  id: string | number;
  name: string;
  url: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
  isIOS: boolean;
  router: any;
  detailsName?: string;
}

export default function MobileBreadcrumbs({ breadcrumbs, isIOS, router, detailsName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-row">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-8 h-8 flex items-center justify-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="text-[#0061AA]"
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </motion.svg>
      </button>

      <div className="flex self-center justify-center text-[#002766] max-w-[85vw]">
        {detailsName}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-10 w-[90vw] max-w-sm bg-white/50 text-[#0061AA] backdrop-blur-sm shadow-lg z-49 cursor-grab active:cursor-grabbing overflow-y-auto"
          >
            <ol className="flex flex-col gap-2 text-sm ml-3">
              {breadcrumbs.map((el, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={el.id} className="flex flex-col">
                    {isLast ? (
                      <span className=""></span>
                    ) : isIOS ? (
                      <span
                        onClick={() => router.push(el.url)}
                        className="hover:underline cursor-pointer text-blue-600 active:text-blue-800"
                      >
                        {el.name}
                      </span>
                    ) : (
                      <Link href={el.url} className="hover:underline">
                        {el.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
