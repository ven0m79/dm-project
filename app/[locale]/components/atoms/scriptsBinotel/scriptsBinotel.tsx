"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function ClientScriptLoader() {
  const pathname = usePathname();
  const isSpecialPage = pathname === "/services"; // шлях сторінки, де інший скрипт

  return (
    <>
      {!isSpecialPage && (
        <Script
          id="binotel-widget-default"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, w, s) {
                var widgetHash = '41zcyas3q551sr3dvq5x';
                var gcw = d.createElement(s); 
                gcw.type = 'text/javascript'; 
                gcw.async = true;
                gcw.src = '//widgets.binotel.com/getcall/widgets/' + widgetHash + '.js';
                var sn = d.getElementsByTagName(s)[0]; 
                sn.parentNode.insertBefore(gcw, sn);
              })(document, window, 'script');
            `,
          }}
        />
      )}

      {isSpecialPage && (
        <Script
          id="binotel-widget-special"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, w, s) {
                var widgetHash = 'iwuxcf4pbms1bjtplqjy';
                var gcw = d.createElement(s); 
                gcw.type = 'text/javascript'; 
                gcw.async = true;
                gcw.src = '//widgets.binotel.com/getcall/widgets/' + widgetHash + '.js';
                var sn = d.getElementsByTagName(s)[0]; 
                sn.parentNode.insertBefore(gcw, sn);
              })(document, window, 'script');
            `,
          }}
        />
      )}
    </>
  );
}
