import { useEffect, useState } from 'react';
import { Device } from '../../models/Device';
import { DeviceService } from '../../services/ResourceService';
import { InventoryAddOne } from './InventoryAddOne';
import { InventoryCardGrid } from './InventoryCardGrid';
import { InventorySearchingForm } from './InventorySearchingForm';
import { InventoryTitle } from './InventoryTitle';
import { showSuccessAlert } from '../../helpers/showGenericAlerts';

const Inventory = () => {
  const deviceService = DeviceService();

  const [devices, setDevices] = useState<Device[]>([]);
  const [page, setPage] = useState<number>(0);
  const [areThereMore, setAreThereMore] = useState<boolean>(true);

  // const getDevices = async () => {
  //   const newPage = page + 1;
  //   const response = await deviceService.getAllDevices(newPage);
  //   setDevices(
  //     prevDevices => JSON.stringify(prevDevices) !== JSON.stringify(response.content)
  //       ? [...prevDevices, ...response.content]
  //       : prevDevices
  //   );
  //   setPage(newPage);
  //   if (response.totalPages - 1 === newPage) {
  //     setAreThereMore(false);
  //   }
  // }

  // const handleMoreDevices = async () => {
  //   await getDevices();
  // }
 console.log(page, areThereMore)
  const handleDeleteDevice = async (
    id: number
  ) => {
    await deviceService.deleteDeviceById(id);
    showSuccessAlert();
    setPage(0);
    setAreThereMore(true);
    setDevices([]);
  }


  useEffect(() => {
    if (devices.length === 0) {
      const initialize = async () => {
        const response = await deviceService.getAllDevices(0);
        console.log(response)
        setDevices(
          prevDevices => String(prevDevices) === String(response.content)
            ? prevDevices
            : response
        );
        if (response.totalPages - 1 === 0) {
          setAreThereMore(false);
        }
      }
      initialize();
    }
  }, [deviceService, devices]);


  return (
    <>
      <div className='
        px-2
        sm:px-6
      '>
        <InventoryTitle />
        <InventorySearchingForm categories={[]} />
        <InventoryCardGrid cards={devices} onDeleteDevice={handleDeleteDevice} />
      </div>

      <InventoryAddOne />
    </>
  )
}

export {
  Inventory,
}
