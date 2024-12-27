import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, defaultValues } from "./components/Form/form-config";
import FormPresence from "./components/Form/FormPresence";
import { Form } from "./components/ui/form";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";

const queryClient = new QueryClient();

function App() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Form {...form}>
        <Header />
        <FormPresence />
      </Form>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
