import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { AddEditDeviceInputs } from './AddEditDeviceInputs';
import {
	showFailAlert,
	showSuccessAlert,
} from '../../helpers/showGenericAlerts';
import { AddEditDeviceForm } from '../../models/AddEditDeviceForm';
import { Device } from '../../models/Device';
import { DeviceService } from '../../services/ResourceService';
import { AddEditDeviceTitle } from './AddEditDeviceTitle';
import { AddEditDeviceSubmitButton } from './AddEditDeviceSubmitButton';

const AddEditDevice = () => {
	// Initial Hooks
	const { id } = useParams();
	const {
		register: deviceRegister,
		handleSubmit: handleDeviceSubmit,
		formState: { errors },
		reset,
	} = useForm<AddEditDeviceForm>();
	const [deviceForm, setDeviceForm] = useState<AddEditDeviceForm>({
		...new AddEditDeviceForm(),
	});
	const [deviceNameToEdit, setDeviceNameToEdit] = useState('');
	const [firstRender, setFirstRender] = useState<boolean>(true);

	// Services
	const deviceService = DeviceService();

	// Functions
	const prepareDeviceToSubmit = (form: AddEditDeviceForm): Device => {
		return {
			id: id ? Number(id) : 0,
			category: form.category,
			description: form.description,
			name: form.name,
			status: form.isAvailable,
			inventoryId: 0,
		};
	};

	// Handlers
	const submitDeviceForm = async (form: AddEditDeviceForm) => {
		try {
			const device = prepareDeviceToSubmit(form);
			if (id) { await deviceService.updateDevice(device); }
			else { await deviceService.createDevice(device); }
			showSuccessAlert();
			setDeviceForm(form);
		} catch (error) {
			console.log(error);
			showFailAlert();
		}
	};

	// Use effects
	useEffect(() => {
		if (firstRender) {
			setFirstRender(false);
			return;
		}

		const reFillingForm = async () => {
			const device = await deviceService.getDeviceById(Number(id));
			setDeviceForm((prevForm) => {
				const newForm: AddEditDeviceForm = {
					id: Number(id),
					name: device.name,
					description: device.description,
					isAvailable: device.status,
					category: device.category,
				};
				return JSON.stringify(prevForm) !== JSON.stringify(newForm)
					? newForm
					: prevForm;
			});
			setDeviceNameToEdit(prevName => {
				return String(prevName) !== String(device.name)
					? device.name
					: prevName;
			})
		};

		if (id) {
			reFillingForm();
		} else {
			console.log('No hay id');
		}
	}, [deviceService, id, firstRender]);

	useEffect(() => {
		if (deviceForm) {
			reset(deviceForm);
		}
	}, [deviceForm, reset]);

	return (
		<form
			className='
        p-2 text-sky-500
        sm:px-6 sm:py-4
      '
			onSubmit={handleDeviceSubmit(submitDeviceForm)}
		>
			<AddEditDeviceTitle deviceName={deviceNameToEdit} />
			<AddEditDeviceInputs register={deviceRegister} errors={errors} />
			<AddEditDeviceSubmitButton />
		</form>
	);
};

export { AddEditDevice };
