export interface Device {
  id?: number;
  inventoryId?: number;
  name: string;
  description: string;
  category: string;
  status: "AVAILABLE" | "UNAVAILABLE";
}
