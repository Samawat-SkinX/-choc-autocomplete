import {
  Center,
  Drawer,
  DrawerContentProps,
  DrawerRootProps,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useAutoCompleteContext } from "./autocomplete-context";
import { siblingInfo } from "./helpers/list";
import { EmptyState } from "./components/empty-state";

type AutoCompleteDrawerRootProps = PropsWithChildren<DrawerRootProps> & {
  disabled?: boolean;
};

const AutoCompleteDrawerRoot = ({
  children,
  open,
  disabled,
  ...rest
}: AutoCompleteDrawerRootProps) => {
  return (
    <Drawer.Root open={open && !disabled} {...rest}>
      {children}
    </Drawer.Root>
  );
};

type AutoCompleteDrawerContentProps = PropsWithChildren<DrawerContentProps>;

const AutoCompleteDrawerContent = ({
  children,
  ...drawerContentProps
}: AutoCompleteDrawerContentProps) => {
  return (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content {...drawerContentProps}>{children}</Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
};

type AutoCompleteDrawerListProps = PropsWithChildren<{
  loadingState?: React.ReactNode;
}>;

const AutoCompleteDrawerList = ({
  loadingState,
  children,
}: AutoCompleteDrawerListProps) => {
  const { isLoading, isOpen } = useAutoCompleteContext();
  const [autoCompleteItems, nonAutoCompleteItems] = siblingInfo(children);

  return (
    <Drawer.Body>
      {isLoading && <Center>{loadingState || <Spinner size="md" />}</Center>}
      {!isLoading && isOpen && (
        <>
          {autoCompleteItems}
          <EmptyState />
          {nonAutoCompleteItems}
        </>
      )}
    </Drawer.Body>
  );
};

export const AutoCompleteDrawer = {
  Root: AutoCompleteDrawerRoot,
  Content: AutoCompleteDrawerContent,
  List: AutoCompleteDrawerList,
};
