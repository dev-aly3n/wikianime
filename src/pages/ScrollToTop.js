import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const pathname = location.pathname;
  const [pervPath, setPervPath] = useState(pathname);

  useEffect(() => {
    if (pathname.includes("character") || pervPath.includes("character")) {
    } else {
      document.getElementById("root").scrollTo(0, 0);
      document.getElementById("navigation").style.top = "0";
    }
    setPervPath(pathname);
    // eslint-disable-next-line
  }, [pathname]);

  return null;
}
