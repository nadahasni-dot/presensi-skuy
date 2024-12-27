import { LatLng } from "leaflet";
import { z } from "zod";

export const FormSchema = z.object({
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

export const defaultLatLng = new LatLng(-6.1689594, 106.837635);

export const defaultValues = {
  employee_id: "",
  presence_type: "",
  picture: "",
  lat: defaultLatLng.lat.toString(),
  long: defaultLatLng.lng.toString(),
  work_type: "",
  information: "",
};
