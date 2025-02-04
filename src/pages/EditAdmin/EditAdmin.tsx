import React, { useState } from 'react';
import { EditAdminTitle } from './EditAdminTitle';
import { EditAdminForm } from './EditAdminForm';
import { adminData } from '../../helpers/data/admin';
import { EditInstitutionForm } from './EditInstitutionForm';

const EditAdmin: React.FC = () => {
	// adminData es un objeto de prueba
	const [admin] = useState(adminData);

	return (
		<React.Fragment>
			<EditAdminTitle>{admin.name}</EditAdminTitle>
			<EditAdminForm></EditAdminForm>
			<EditInstitutionForm {...admin}></EditInstitutionForm>
		</React.Fragment>
	);
};

export { EditAdmin };
