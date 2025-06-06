import { useEffect, useRef, forwardRef, ReactNode } from "react";
import { SystemStyleObject, Flex, FlexProps } from "@chakra-ui/react";
import { isUndefined, omit, useMergeRefs } from "./utils";
import { useAutoCompleteContext } from "./autocomplete-context";

export interface AutoCompleteItemProps extends FlexProps {
  value: any;
  label?: string;
  fixed?: boolean;
  _focus?: SystemStyleObject | any;
  disabled?: boolean;
  _fixed?: SystemStyleObject;
  icon?: ReactNode;
  getValue?: (item: AutoCompleteItemProps["value"]) => any;
}

export const AutoCompleteItem = forwardRef<
  HTMLDivElement,
  AutoCompleteItemProps
>((props, forwardedRef) => {
  const { focusedValue, getItemProps, interactionRef } =
    useAutoCompleteContext();
  const itemRef = useRef<any>(null);
  const ref = useMergeRefs(forwardedRef, itemRef);

  const itemProps = getItemProps(props);
  const { isValidSuggestion, value } = itemProps.root;

  const isFocused = focusedValue === value;

  useEffect(() => {
    if (isFocused && interactionRef.current === "keyboard")
      itemRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }, [isFocused, interactionRef]);

  useEffect(() => {
    if (typeof value !== "string") console.warn("wow");
    if (typeof value !== "string" && isUndefined(props.getValue))
      console.error(
        "You must define the `getValue` prop, when an Item's value is not a string"
      );
  }, []);

  const { children, dangerouslySetInnerHTML, ...restProps } = itemProps.item;

  const rest = omit(restProps, ["groupId"] as any);

  return isValidSuggestion ? (
    <Flex ref={ref} {...baseItemStyles} {...rest}>
      {children ? (
        children
      ) : (
        <>
          <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
          {props.icon ? props.icon : null}
        </>
      )}
    </Flex>
  ) : null;
});

AutoCompleteItem.displayName = "AutoCompleteItem";

export const baseItemStyles: FlexProps = {
  mx: "2",
  px: "2",
  py: "2",
  rounded: "md",
  cursor: "pointer",
};
