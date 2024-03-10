import { UserButton } from '@clerk/nextjs';

const DashboardPage = () => {
	return (
		<div>
			Dashboard page (protected)
			<UserButton  afterSignOutUrl='/'/>
		</div>
	);
};

export default DashboardPage;
