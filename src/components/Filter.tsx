import { MouseEvent, useState } from 'react';
import { ReactComponent as ChevronDownSVG } from 'static/icons/chevron-down.svg';
import { addCommasToNumber } from 'functions/common';

const Filter = (props: { price: number[]; period: number[] }) => {
	const [maxPrice, setMaxPrice] = useState<number>(props.price[1]);
	const [maxPeriod, setMaxPeriod] = useState<number>(props.period[1]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [openedFilter, setOpenedFilter] = useState<string>('');

	const openFilter = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget.getAttribute('name');
		if (target === null) {
			return;
		} else {
			if (isOpen) {
				// 메뉴가 뭐라도 열려있을 때
				if (openedFilter === target) {
					// 열려있는 메뉴 선택하면 열려져 있던 메뉴 닫기
					setIsOpen((prev) => !prev);
					setOpenedFilter((prev) => '');
				} else {
					// 열려있지 않은 다른 메뉴 선택하면 해당 메뉴 열기
					setOpenedFilter((prev) => target);
				}
			} else {
				// 메뉴 닫혀있을 때 선택한 메뉴 열기
				setIsOpen((prev) => !prev);
				setOpenedFilter((prev) => target);
			}
		}
	};

	const closeFilter = () => {
		setIsOpen((prev) => !prev);
		setOpenedFilter((prev) => '');
	};

	return (
		<ul className="flex mb-3 space-x-3 sticky top-[65px] py-3 bg-white z-[5] border-b-1">
			<li className="relative">
				<button name="price" className="btn-filter center" onClick={openFilter}>
					<span className="mr-1 text-sm">금액</span>
					<ChevronDownSVG />
				</button>
				{isOpen && openedFilter === 'price' && (
					<form className="absolute top-12 z-[3] w-96 h-32 border-1 rounded-lg bg-white flex center space-x-6">
						<fieldset className="w-2/3">
							<legend className="text-sm inline-block mb-3">
								최대 금액: {addCommasToNumber(maxPrice)}원
							</legend>
							<input
								className="slider"
								type="range"
								min={props.price[0]}
								step={500}
								defaultValue={maxPrice}
								max={props.price[1]}
								onChange={(e) => setMaxPrice(() => Number(e.target.value))}
							/>
						</fieldset>
						<button className="btn-primary text-sm" onClick={closeFilter}>
							적용
						</button>
					</form>
				)}
			</li>
			{/* <li className="relative">
				<button
					name="location"
					className="btn-filter center"
					onClick={openFilter}
				>
					<span className="mr-1 text-sm">위치</span>
					<ChevronDownSVG />
				</button>
				{isOpen && openedFilter === 'location' && (
					<div className="absolute z-[3]">위치</div>
				)}
			</li> */}
			<li className="relative">
				<button
					name="period"
					className="btn-filter center"
					onClick={openFilter}
				>
					<span className="mr-1 text-sm">소요 시간</span>
					<ChevronDownSVG />
				</button>
				{isOpen && openedFilter === 'period' && (
					<form className="absolute top-12 z-[3] w-96 h-32 border-1 rounded-lg bg-white flex center space-x-6">
						<fieldset className="w-2/3">
							<legend className="text-sm inline-block mb-3">
								최대 소요 시간: {maxPeriod}분
							</legend>
							<input
								className="slider"
								type="range"
								min={props.period[0]}
								step={5}
								defaultValue={maxPeriod}
								max={props.period[1]}
								onChange={(e) => setMaxPeriod(() => Number(e.target.value))}
							/>
						</fieldset>
						<button className="btn-primary text-sm" onClick={closeFilter}>
							적용
						</button>
					</form>
				)}
			</li>
		</ul>
	);
};

export default Filter;
