export class AddEditDeviceForm {
  id: number;
  name: string;
  category: string;
  description: string;
  inventoryId?: number;
  isAvailable: 'true' | 'false';

  constructor(
    {
      id,
      name,
      category,
      description,
      isAvailable,
    }: Partial<AddEditDeviceForm> = {}
  ) {
    this.id = id || 0;
    this.name = name || '';
    this.category = category || '';
    this.description = description || '';
    this.isAvailable = isAvailable || 'false';
  }
}
