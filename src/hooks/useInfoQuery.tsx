import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { AccountInfo } from 'types/types';

const getProfileInfo = async () => {
	const { data } = await axios({
		method: 'GET',
		url: 'http://15.164.225.61/api/users/user-info',
		headers: {
			authorization: `Bearer ${sessionStorage.getItem('token')}`,
		},
	});
	return data;
};

const useInfoQuery = (
	options?: any
): UseQueryResult<AccountInfo, AxiosError> => {
	return useQuery(['profile'], getProfileInfo, options);
};

export default useInfoQuery;
