import React, { useImperativeHandle, forwardRef } from "react";

import { AutoCompleteProvider } from "./autocomplete-context";
import { useAutoComplete } from "./use-autocomplete";
import {
  AutoCompleteRefMethods,
  UseAutoCompleteProps,
  MaybeRenderProp,
} from "./types";

export type AutoCompleteChildProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};
export interface AutoCompleteProps extends UseAutoCompleteProps {
  children: MaybeRenderProp<AutoCompleteChildProps>;
  ref?: React.RefObject<AutoCompleteRefMethods>;
}

export const AutoComplete = forwardRef<
  AutoCompleteRefMethods,
  AutoCompleteProps
>((props, ref) => {
  const context = useAutoComplete(props);
  const { children, resetItems, removeItem } = context;

  useImperativeHandle(ref, () => ({
    resetItems,
    removeItem,
  }));

  return (
    <AutoCompleteProvider value={context}>{children}</AutoCompleteProvider>
  );
});

AutoComplete.displayName = "AutoComplete";
