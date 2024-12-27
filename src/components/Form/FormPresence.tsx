import { useFormContext } from "react-hook-form";
import { FormSchema } from "./form-config";
import { z } from "zod";
import { LatLng } from "leaflet";
import Container from "../Container";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import MapView from "../MapView";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { submitPresence } from "@/services/presence-service";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function FormPresence() {
  const form = useFormContext<z.infer<typeof FormSchema>>();
  const pictureRef = form.register("picture");

  const { mutate, isLoading } = useMutation({
    ...submitPresence(),
    onSuccess: (data) => {
      const { data: response } = data;

      if (response.status === "err") {
        toast.error(`😓 ${response.message}`);
      } else {
        toast.success(`😃 ${response.message}`);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(`😓 ${error.message}`);
    },
  });

  const handlePositionChange = ({ lat, lng }: LatLng) => {
    form.setValue("lat", lat.toString());
    form.setValue("long", lng.toString());
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (error) => console.log({ error }))}
    >
      <Container className="flex flex-col gap-4 py-6 pt-20">
        {/* Employee ID */}
        <div>
          <FormField
            control={form.control}
            name="employee_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Employee ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dropdown Select Type of Presence */}
        <FormField
          control={form.control}
          name="presence_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Presence</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of presence" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CI">Check IN</SelectItem>
                  <SelectItem value="CO">Check Out</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Select Image */}
        <div>
          <FormField
            control={form.control}
            name="picture"
            render={() => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Selfie Picture"
                    type="file"
                    accept="image/jpeg, image/png"
                    {...pictureRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Select MAP */}
        <div>
          <Label htmlFor="picture">Map</Label>
          <div className="bg-slate-300 overflow-hidden border rounded-lg">
            <MapView onPositionChange={handlePositionChange} />
          </div>
        </div>

        {/* LAT LONG */}
        <div className="flex justify-stretch gap-2">
          <div>
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Latitude"
                      readOnly
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="long"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Longitude"
                      readOnly
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Dropdown Select Type of Work */}
        <FormField
          control={form.control}
          name="work_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Work</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of work" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="WFO">Work From Office (WFO)</SelectItem>
                  <SelectItem value="WFC">Work From Client (WFC)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Information Presence */}
        <FormField
          control={form.control}
          name="information"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Information</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button disabled={isLoading} type="submit">
          CHECK {form.watch("presence_type") === "CI" ? "IN" : "OUT"}
        </Button>
      </Container>
    </form>
  );
}
