import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import { FormSchema } from "../Form/form-config";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export default function Header() {
  const form = useFormContext<z.infer<typeof FormSchema>>();

  return (
    <header className="bg-[#02275d] text-white fixed top-0 left-0 right-0 z-20">
      <div
        className="flex mx-auto container px-4 xs:px-0 md:px-20 py-3
         justify-between"
      >
        <h1 className="text-xl font-semibold uppercase">Presensi SKUY</h1>
        <Button
          onClick={() => form.reset()}
          size="icon"
          variant="outline"
          className="text-primary"
        >
          <RefreshCw />
        </Button>
      </div>
    </header>
  );
}
