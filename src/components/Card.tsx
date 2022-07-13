import NaverMap from './NaverMap';
import { MapInCard } from 'types/types';
import { addCommasToNumber } from 'functions/common';

const Card = ({ item }: MapInCard) => {
	return (
		<article className="group vertical w-60 h-72 rounded-xl border-1 cursor-pointer hover:opacity-90 hover:shadow-main transition overflow-hidden bg-white">
			<map className="block w-full h-1/2 z-[2]">
				<NaverMap item={item} />
			</map>
			<figcaption className="grow vertical m-3 overflow-hidden">
				<h4 className="text-lg font-bold truncate group-hover:animate-marquee group-hover:w-max">
					{item.location.split(',')[0]}
				</h4>
				<p className="text-sm grow">{item.contents}</p>
				<p className="flex justify-between">
					<span>{item.period}분 소요</span>
					<span>{addCommasToNumber(item.price)}원</span>
				</p>
			</figcaption>
		</article>
	);
};

export default Card;
