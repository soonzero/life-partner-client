import NaverMap from './NaverMap';
import { MapInPost } from 'types/types';
import { addCommasToNumber } from 'functions/common';

const Card = ({ item, detail }: MapInPost) => {
	return (
		<article className="group vertical w-full h-72 rounded-xl border-1 cursor-pointer hover:opacity-90 transition overflow-hidden bg-white">
			<map className="block w-full h-1/2 z-[2] shrink-0">
				<NaverMap item={item} detail={detail} />
			</map>
			<figcaption className="vertical grow m-3 overflow-hidden">
				<h4 className="text-lg font-bold truncate shrink-0 group-hover:animate-marquee group-hover:w-max">
					{item.location.split(',')[0]}
				</h4>
				<p className="relative text-sm grow overflow-hidden after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-white">
					<span className="inline-block break-normal">{item.title}</span>
				</p>
				<p className="flex justify-between">
					<span>{item.period}분 소요</span>
					<span className="font-medium">{addCommasToNumber(item.price)}원</span>
				</p>
			</figcaption>
		</article>
	);
};

export default Card;
