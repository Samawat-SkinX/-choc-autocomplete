import {
  Center,
  chakra,
  PopoverAnchor,
  PopoverBodyProps,
  PopoverRoot,
  Spinner,
} from "@chakra-ui/react";
import { useAutoCompleteContext } from "./autocomplete-context";
import { forwardRef, PropsWithChildren } from "react";
import { AutoCompleteRefMethods } from "./types";
import { useMergeRefs } from "./utils";
import { EmptyState } from "./components/empty-state";
import { siblingInfo } from "./helpers/list";
import React from "react";
import { PopoverBody, PopoverContent } from "./components/ui/popover";

export interface AutoCompleteListProps extends PopoverBodyProps {
  loadingState?: React.ReactNode;
}

const AutoCompleteList = forwardRef<HTMLDivElement, AutoCompleteListProps>(
  (props, forwardedRef) => {
    const { children, loadingState, ...rest } = props;
    const { listRef, isLoading } = useAutoCompleteContext();
    const ref = useMergeRefs(forwardedRef, listRef);
    const [autoCompleteItems, nonAutoCompleteItems] = siblingInfo(children);

    return (
      <PopoverContent>
        <PopoverBody ref={ref} w="inherit" {...baseStyles} {...rest}>
          {isLoading && (
            <Center>{loadingState || <Spinner size="md" />}</Center>
          )}
          {!isLoading && (
            <>
              {autoCompleteItems}
              <EmptyState />
              {nonAutoCompleteItems}
            </>
          )}
        </PopoverBody>
      </PopoverContent>
    );
  }
);

const baseStyles: PopoverBodyProps = {
  // py: "4",
  //opacity: "0",
  px: "0px",
  bg: "inherit",
  rounded: "md",
  maxH: "350px",
  border: "none",
  shadow: "base",
  zIndex: "popover",
  overflowY: "auto",

  _light: {
    bg: "#ffffff",
  },

  _focus: {
    boxShadow: "none",
  },
};

export type AutoCompletePopoverProps = PropsWithChildren<{
  disabled?: boolean;
}>;

const AutoCompletePopoverRoot = forwardRef<
  AutoCompleteRefMethods,
  AutoCompletePopoverProps
>(({ children, disabled }, ref) => {
  const { isOpen, placement, autoCompleteProps } = useAutoCompleteContext();

  return (
    <PopoverRoot
      open={!disabled && isOpen}
      autoFocus={false}
      positioning={{
        placement,
        sameWidth: autoCompleteProps.matchWidth ?? true,
      }}
      present={!disabled && isOpen}
    >
      <chakra.div w="full" ref={ref}>
        {children}
      </chakra.div>
    </PopoverRoot>
  );
});

export const AutoCompletePopover = {
  Root: AutoCompletePopoverRoot,
  Anchor: PopoverAnchor,
  List: AutoCompleteList,
};

AutoCompleteList.displayName = "AutoCompleteList";
AutoCompletePopoverRoot.displayName = "AutoCompletePopoverRoot";
