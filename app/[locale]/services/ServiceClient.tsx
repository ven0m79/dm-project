"use client";
import { useIsMobile } from "../components/hooks/useIsMobile";
import ServiceDesktop from "./ServiceDesktop";
import ServiceMobile from "./ServiceMobile";
export default function ServiceClient() {
  const isMobile = useIsMobile();
  return isMobile ? <ServiceMobile /> : <ServiceDesktop />;
};
