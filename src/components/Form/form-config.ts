import { DEFAULT_LAT_LNG } from "@/config/config";
import { z } from "zod";

export const FormSchema = z.object({
  apk_version: z.string().min(5, {
    message: "APK version must be at least 5 characters.",
  }),
  employee_id: z.string().min(2, {
    message: "Employee ID must be at least 2 characters.",
  }),
  presence_type: z.enum(["CI", "CO"]).or(z.string()),
  picture: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "Picture is required.")
    .refine(
      (file) => file?.[0].size <= 500 * 1024,
      "File size must be less than or equal to 500 KB."
    )
    .refine(
      (file) =>
        file?.[0].type === "image/jpeg" || file?.[0].type === "image/png",
      "Only allow JPEG or PNG file."
    )
    .or(z.string()),
  lat: z.string().min(2).max(100),
  long: z.string().min(2).max(100),
  work_type: z.enum(["WFC", "WFO"]).or(z.string()),
  information: z.string().min(3).max(100),
});

export const defaultValues = {
  apk_version: "",
  employee_id: "",
  presence_type: "",
  picture: "",
  lat: DEFAULT_LAT_LNG.lat.toString(),
  long: DEFAULT_LAT_LNG.lng.toString(),
  work_type: "",
  information: "",
};
