"use client";
import dynamic from "next/dynamic";
import { useIsMobile } from "../components/hooks/useIsMobile";


const ServiceDesktop = dynamic(() => import("./ServiceDesktop"), {
  ssr: false,
});

const ServiceMobile = dynamic(() => import("./ServiceMobile"), {
  ssr: false,
});
export default function ServiceClient() {
const isMobile = useIsMobile();
  return isMobile ? <ServiceMobile /> : <ServiceDesktop />;
};