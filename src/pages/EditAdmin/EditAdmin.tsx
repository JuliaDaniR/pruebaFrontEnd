import React, { useEffect, useState } from 'react';
import { EditAdminTitle } from './EditAdminTitle';
import { EditAdminForm } from './EditAdminForm';
import { EditInstitutionForm } from './EditInstitutionForm';
import { AdminGet } from '../../models/admin/AdminGet';
import { InstitutionGet } from '../../models/admin/InstitutionGet';
import { useAuthProvider } from '../../context/AuthProvider';
import { getAdminData } from '../../services/adminRequest';
import { getInstitutionData } from '../../services/institutionRequest';

const EditAdmin: React.FC = () => {
	const { user } = useAuthProvider();

	const [admin, setAdmin] = useState<AdminGet | null>(null);
	const [institution, setInstitution] = useState<InstitutionGet | null>(null);

	useEffect(() => {
		const fetchAdminAndInstitution = async () => {
			if (user?.name && user?.jwtToken) {
				const adminData = await getAdminData(user.name, user.jwtToken);
				setAdmin(adminData);

				if (adminData?.nameSchool) {
					const institutionData = await getInstitutionData(
						adminData.nameSchool,
						user.jwtToken,
					);
					setInstitution(institutionData);
				}
			}
		};

		fetchAdminAndInstitution();
	}, [user?.name, user?.jwtToken]);

	return (
		<React.Fragment>
			<EditAdminTitle>{institution?.name}</EditAdminTitle>
			<EditAdminForm></EditAdminForm>
			<EditInstitutionForm {...admin}></EditInstitutionForm>
		</React.Fragment>
	);
};

export { EditAdmin };
