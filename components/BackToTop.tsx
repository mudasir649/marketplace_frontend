import { useState, useEffect } from "react";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`back-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <KeyboardDoubleArrowUpIcon fontSize="medium" />
      <style jsx>{`
        .back-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #fcb3b3; /* Default color */
          color: #E52320;
          border: 2px solid #E52320 !important;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
          transition: background-color 0.3s, opacity 0.3s;
        }
        .back-to-top:hover {
          background-color: #E52320; /* Hover color */
          color : white
        }
        .back-to-top.visible {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
    </button>
  );
};

export default BackToTop;
