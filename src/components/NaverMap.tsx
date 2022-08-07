import { useEffect } from 'react';
import { Map } from 'types/types';

const NaverMap = ({ id, location, detail }: Map) => {
	const [_, lat, lng] = location.split(',');
	useEffect(() => {
		let map;
		let marker;
		const initMap = () => {
			map = new naver.maps.Map(`map${id}`, {
				center: new naver.maps.LatLng(Number(lng), Number(lat)),
				zoom: 15,
			});

			marker = new naver.maps.Marker({
				position: new naver.maps.LatLng(Number(lng), Number(lat)),
				map: map,
				icon: {
					url: detail
						? `https://user-images.githubusercontent.com/95613159/179005516-aa95271c-7ca3-4bea-9e5f-5dd0a4f262b8.png`
						: `https://user-images.githubusercontent.com/95613159/178690536-ec7d542c-fcb0-401d-afbf-cb3317bc0aeb.png`,
					size: new naver.maps.Size(50, 50),
					anchor: detail
						? new naver.maps.Point(25, 50)
						: new naver.maps.Point(25, 25),
				},
			});

			map.setOptions({
				draggable: detail ? true : false,
				pinchZoom: detail ? true : false,
				scrollWheel: detail ? true : false,
				keyboardShortcuts: false,
				scaleControl: false,
				logoControl: false,
				mapDataControl: false,
				zoomControl: detail ? true : false,
				mapTypeControl: false,
				disableDoubleTapZoom: detail ? false : true,
				disableDoubleClickZoom: detail ? false : true,
				disableTwoFingerTapZoom: detail ? false : true,
			});
		};
		initMap();
	}, []);

	return (
		<div
			id={`map${id}`}
			style={{ width: '100%', height: '100%', zIndex: '5' }}
		/>
	);
};

export default NaverMap;
