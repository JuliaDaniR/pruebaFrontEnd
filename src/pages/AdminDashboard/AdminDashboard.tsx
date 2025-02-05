import React, { useEffect, useState } from 'react';
import { AdminHomeTitle } from './AdminHomeTitle';
import { AdminHomeData } from './AdminHomeData';
import AdminHomeButton from './AdminHomeButton';
import { useNavigate } from 'react-router-dom';
import { getAdminData } from '../../services/adminRequest';
import { getInstitutionData } from '../../services/institutionRequest';
import { useAuthProvider } from '../../context/AuthProvider';
import { AdminGet } from '../../models/admin/AdminGet';
import { InstitutionGet } from '../../models/admin/InstitutionGet';

const AdminDashboard: React.FC = () => {
	const navigate = useNavigate();
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
			<AdminHomeTitle>{institution?.name ?? 'Cargando...'}</AdminHomeTitle>
			<AdminHomeData admin={admin} institution={institution} />
			<AdminHomeButton
				onClick={() => navigate('/edit-admin-profile')}
				text='Editar Perfil'
			/>
		</React.Fragment>
	);
};

export { AdminDashboard };
