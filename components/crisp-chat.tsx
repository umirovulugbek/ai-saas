import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

export const CrispChat = () => {
	useEffect(() => {
		Crisp.configure('2819350d-14fc-4762-87d7-432d9bbbdf9c');
	}, []);
	return null;
};
