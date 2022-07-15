import { useEffect } from 'react';
import { MapInCard } from 'types/types';

const NaverMap = ({ item, detail }: MapInCard) => {
	const [_, lat, lng] = item.location.split(',');
	useEffect(() => {
		let map;
		let marker;
		const initMap = () => {
			map = new naver.maps.Map(`map${item.id}`, {
				center: new naver.maps.LatLng(Number(lng), Number(lat)),
				zoom: 14,
			});

			marker = new naver.maps.Marker({
				position: new naver.maps.LatLng(Number(lng), Number(lat)),
				map: map,
				icon: {
					url: detail
						? `https://user-images.githubusercontent.com/95613159/179005516-aa95271c-7ca3-4bea-9e5f-5dd0a4f262b8.png`
						: `https://user-images.githubusercontent.com/95613159/178690536-ec7d542c-fcb0-401d-afbf-cb3317bc0aeb.png`,
					size: new naver.maps.Size(50, 50),
					anchor: new naver.maps.Point(25, 25),
				},
			});

			map.setOptions({
				draggable: false,
				pinchZoom: false,
				scrollWheel: false,
				keyboardShortcuts: false,
				scaleControl: false,
				logoControl: false,
				mapDataControl: false,
				zoomControl: false,
				mapTypeControl: false,
				disableDoubleTapZoom: true,
				disableDoubleClickZoom: true,
				disableTwoFingerTapZoom: true,
			});
		};
		initMap();
	}, []);

	return <div id={`map${item.id}`} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap;
