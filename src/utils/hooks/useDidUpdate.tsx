import React, { DependencyList, EffectCallback } from "react";

export const useDidUpdate = (
  cb: EffectCallback,
  dependencyList = [] as DependencyList
) => {
  const initialRef = React.useRef(true);

  React.useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }

    return cb();
  }, dependencyList);
};
