import { useEffect, useRef, useState } from "react";


export const useGetElementValue = (name: "height" | "position") => {
  const [elemValue, setValue] = useState<number>(0);
  const elem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const val = elem.current
      ? name === 'height'
        ? elem.current?.offsetHeight
        : elem.current?.offsetLeft
      : 0;

    setValue(val);
  }, []);

  return { elemValue, elem };
};
