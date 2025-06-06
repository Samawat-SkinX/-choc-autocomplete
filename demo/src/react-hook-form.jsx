import { Box, Button, Center, Field, Heading } from "@chakra-ui/react";
import * as React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteGroup,
} from "@choc-ui/chakra-autocomplete";
import { useForm } from "react-hook-form";

const options = [
  { label: "apple", value: "one" },
  { label: "appoint", value: "two" },
  { label: "zap", value: "three" },
  { label: "cap", value: "four" },
  { label: "japan", value: "five" },
];

function ReactHookFormExample() {
  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: { team: "one" },
  });

  const value = watch("team");

  const { onBlur, name } = register("team");
  const onSubmit = (data) => console.log("data from form", data);

  return (
    <Box border="1px" borderRadius="1em" p={2}>
      <Heading as="h6" align="center">
        React Hook Form
      </Heading>
      <Button onClick={() => setValue("team", "four")}>
        Change Value To four
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root>
          <Field.Label>Olympics Soccer Winner</Field.Label>
          <AutoComplete
            onChange={(val) => setValue("team", val)}
            openOnFocus
            rollNavigation
            listAllValuesOnFocus
            freeSolo
            value={value}
          >
            <AutoCompleteInput variant="subtle" name={name} onBlur={onBlur} />
            <AutoCompleteList>
              <AutoCompleteGroup>
                {options.map((option) => (
                  <AutoCompleteItem
                    key={`option-${option.value}`}
                    value={{
                      title: `${option.value}`,
                    }}
                    label={option.label}
                    textTransform="capitalize"
                  />
                ))}
              </AutoCompleteGroup>
            </AutoCompleteList>
          </AutoComplete>
          <Field.HelperText>Who do you support.</Field.HelperText>
        </Field.Root>
        <Center>
          <Button type="submit">Submit</Button>
        </Center>
      </form>
    </Box>
  );
}

export default ReactHookFormExample;
