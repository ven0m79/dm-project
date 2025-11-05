'use client';

import { useEffect, useState } from "react";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import MobileFooter from "./MobileFooter";
import DesktopFooter from "./DesktopFooter";


export default function MobileFooterWrapper({ t }: { t: (key: string) => string }) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return isMobile ? <MobileFooter t={t} /> : <DesktopFooter t={t} />;
}
