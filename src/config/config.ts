import { LatLng } from "leaflet";

export const DEFAULT_LAT_LNG = new LatLng(-6.1689594, 106.837635);
export const LIST_APK_VERSIONS: string =
  import.meta.env.VITE_LIST_APK_VERSIONS || "";
export const SECURE_CODE: string = import.meta.env.VITE_SECURE_CODE || "";
