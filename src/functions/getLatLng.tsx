import axios from 'axios';

const getLatLng = async (address: string) => {
	const {
		data: { addresses },
	} = await axios({
		method: 'GET',
		url: `/map-geocode/v2/geocode?query=${address}`,
		headers: {
			'X-NCP-APIGW-API-KEY-ID': `${process.env.REACT_APP_NAVER_API_KEY_ID}`,
			'X-NCP-APIGW-API-KEY': `${process.env.REACT_APP_NAVER_API_KEY}`,
		},
	});
	return [addresses[0].y, addresses[0].x];
};

export default getLatLng;
