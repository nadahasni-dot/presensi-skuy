import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, defaultValues } from "./components/Form/form-config";
import FormPresence from "./components/Form/FormPresence";
import { Form } from "./components/ui/form";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import SecureCheck from "./components/SecureCheck";
import React from "react";

const queryClient = new QueryClient();

function App() {
  const [isAllowed, setIsAllowed] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  const handleCheck = (allowed: boolean) => {
    setIsAllowed(allowed);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {!isAllowed ? (
        <SecureCheck onCheck={handleCheck} />
      ) : (
        <Form {...form}>
          <Header />
          <FormPresence />
        </Form>
      )}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
