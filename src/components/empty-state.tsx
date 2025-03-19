import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { useAutoCompleteContext } from "../autocomplete-context";

export const EmptyState = (props: BoxProps) => {
  const { getEmptyStateProps, defaultEmptyStateProps } =
    useAutoCompleteContext();

  const { emptyState, noSuggestions } = getEmptyStateProps(
    <Flex {...emptyStyles} {...defaultEmptyStateProps}>
      No options found!
    </Flex>
  );

  return noSuggestions ? <Box {...props}>{emptyState}</Box> : null;
};

const emptyStyles: FlexProps = {
  fontSize: "sm",
  align: "center",
  justify: "center",
  fontWeight: "bold",
  fontStyle: "italic",
};
