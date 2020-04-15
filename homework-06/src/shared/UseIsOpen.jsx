import React from "react";

export function useIsOpen() {
  const [open, setOpen] = React.useState(false);

  const clickHandler = React.useCallback(() => {
    console.log("old open = " + open);
    const opposite = !open;
    setOpen(opposite);
  }, [open]);

  return { open, clickHandler };
}
