import { useEffect } from "react";

const useOutsideClick = () => {
  // const handleClickOutside = (event: MouseEvent) => {
  //   if (ref.current && !ref.current.contains(event.target)) {

  //   }
  // };

  useEffect(() => {
    document.addEventListener("mousedown", () => { console.log("click") });
    return () => {
      document.removeEventListener("mousedown", () => {});
    };
  }, []);
};

export default useOutsideClick;
