import { useForm } from 'react-hook-form';
import { AddEditUsersForm } from '../../models/AddEditUsersForm';
import { AddEditUsersTitle } from './AddEditUsersTitle';
import { useParams } from 'react-router-dom';

import { AddEditUsersSubmitButton } from './AddEditUsersSubmitButton';
import { useEffect, useState } from 'react';
import { AddEditUsersInputs } from './AddEditUsersInputs';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import {
	showFailAlert,
	showSuccessAlert,
} from '../../helpers/showGenericAlerts';

const AddEditUsers = () => {
	// Initial Hooks
	const { dni } = useParams();
	const {
		register: userRegister,
		handleSubmit: handleUserSubmit,
		formState: { errors },
		reset,
	} = useForm<AddEditUsersForm>();
  const [initialRender, setInitialRender] = useState<boolean>(true);
	const [userForm, setUserForm] = useState<AddEditUsersForm>({
		...new AddEditUsersForm(),
	});
	const [userNameToEdit, setUserNameToEdit] = useState('')

	// Services
	const userService = UserService();

	// Functions
	const prepareUserToSubmit = (form: AddEditUsersForm): User => {
		return {
			dni: dni ? dni : form.dni,
			email: form.email,
			full_name: form.name,
			role: 'TEACHER',
			password: form.pass1,
			password2: form.pass2,
		};
	};

	// Handlers
	const submitUserForm = async (form: AddEditUsersForm) => {
		try {
			const user = prepareUserToSubmit(form);
			if (dni) { await userService.updateUser({ user }); }
			else { await userService.createUser({ user }); }
			showSuccessAlert();
			setUserForm(form);
		} catch (error) {
			console.log(error);
			showFailAlert();
		}
	};

	// Use effects
	useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }
		const reFillingForm = async () => {
			const user = await userService.getUserByDni({ dni: dni! });
			setUserForm((prevForm) => {
				const newForm = {
					dni: user.dni,
					email: user.email,
					name: user.fullName,
					pass1: '',
					pass2: '',
					role: user.role || 'ADMIN',
				};
				return JSON.stringify(prevForm) !== JSON.stringify(newForm)
					? newForm
					: prevForm;
			});
			setUserNameToEdit(prevName => {
				return String(prevName) !== String(user.fullName)
					? user.fullName
					: prevName;
			})
		};

		if (dni) {
			reFillingForm();
		} else {
			console.log('No hay dni');
		}
	}, [dni, userService, initialRender]);

	useEffect(() => {
		if (userForm) {
			reset(userForm);
		}
	}, [userForm, reset]);

	return (
		<form
			className='
        p-2 text-sky-500
        sm:px-6 sm:py-4
      '
			onSubmit={handleUserSubmit(submitUserForm)}
		>
			<AddEditUsersTitle userName={userNameToEdit} />
			<AddEditUsersInputs register={userRegister} errors={errors} />
			<AddEditUsersSubmitButton />
		</form>
	);
};

export { AddEditUsers };
