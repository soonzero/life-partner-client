import { MouseEvent, useState } from 'react';
import { ReactComponent as ChevronDownSVG } from 'static/icons/chevron-down.svg';
import { addCommasToNumber } from 'functions/common';
import classNames from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Filter = (props: { price: number[]; period: number[] }) => {
	const [minPrice, setMinPrice] = useState<number>(props.price[0]);
	const [maxPrice, setMaxPrice] = useState<number>(props.price[1]);
	const [minPeriod, setMinPeriod] = useState<number>(props.period[0]);
	const [maxPeriod, setMaxPeriod] = useState<number>(props.period[1]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [openedFilter, setOpenedFilter] = useState<string>('');

	const changeRange = (data: number | number[]) => {
		if (openedFilter === 'price') {
			if (Array.isArray(data)) {
				setMinPrice((prev) => data[0]);
				setMaxPrice((prev) => data[1]);
			}
		} else if (openedFilter === 'period') {
			if (Array.isArray(data)) {
				setMinPeriod((prev) => data[0]);
				setMaxPeriod((prev) => data[1]);
			}
		}
	};

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

	const resetRange = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget.getAttribute('name');
		if (target === 'price') {
			setMinPrice((prev) => props.price[0]);
			setMaxPrice((prev) => props.price[1]);
		} else if (target === 'period') {
			setMinPeriod((prev) => props.period[0]);
			setMaxPeriod((prev) => props.period[1]);
		}
	};

	const closeFilter = () => {
		setIsOpen((prev) => !prev);
		setOpenedFilter((prev) => '');
	};

	return (
		<ul className="flex mb-3 space-x-3 sticky top-[65px] py-3 bg-white z-[5] border-b-1">
			<li className="relative">
				<button
					name="price"
					className={classNames('btn-filter center transition', {
						'bg-main text-white font-semibold': openedFilter === 'price',
					})}
					onClick={openFilter}
				>
					<span className="mr-1 text-sm">금액</span>
					<ChevronDownSVG
						className={classNames('transition h-5 w-5', {
							'rotate-180': openedFilter === 'price',
						})}
					/>
				</button>
				{isOpen && openedFilter === 'price' && (
					<form className="absolute top-12 z-[3] w-96 h-40 border-1 rounded-lg bg-white vertical px-12 py-6 justify-center space-y-6">
						<fieldset className="text-center w-full space-y-3">
							<legend className="text-sm inline-block">
								{`선택한 범위: ${addCommasToNumber(
									minPrice
								)}원 ~ ${addCommasToNumber(maxPrice)}원`}
							</legend>
							<Slider
								range
								min={props.price[0]}
								max={props.price[1]}
								step={1000}
								value={[minPrice, maxPrice]}
								defaultValue={[props.price[0], props.price[1]]}
								allowCross={true}
								onChange={changeRange}
							/>
						</fieldset>
						<div className="flex justify-center space-x-6">
							<button
								name="price"
								type="button"
								className="btn-secondary text-sm"
								onClick={resetRange}
							>
								초기화
							</button>
							<button
								name="price"
								className="btn-primary text-sm"
								onClick={closeFilter}
							>
								적용
							</button>
						</div>
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
					className={classNames('btn-filter center transition', {
						'bg-main text-white font-semibold': openedFilter === 'period',
					})}
					onClick={openFilter}
				>
					<span className="mr-1 text-sm">소요 시간</span>
					<ChevronDownSVG
						className={classNames('transition h-5 w-5', {
							'rotate-180': openedFilter === 'period',
						})}
					/>
				</button>
				{isOpen && openedFilter === 'period' && (
					<form className="absolute top-12 z-[3] w-96 h-40 border-1 rounded-lg bg-white vertical px-12 py-6 justify-center space-y-6">
						<fieldset className="w-full text-center space-y-2">
							<legend className="text-sm inline-block">
								{`선택한 범위: ${minPeriod}분 ~ ${maxPeriod}분`}
							</legend>
							<Slider
								range
								min={props.period[0]}
								max={props.period[1]}
								step={10}
								value={[minPeriod, maxPeriod]}
								defaultValue={[props.period[0], props.period[1]]}
								allowCross={true}
								onChange={changeRange}
							/>
						</fieldset>
						<div className="flex justify-center space-x-6">
							<button
								type="button"
								name="period"
								className="btn-secondary text-sm"
								onClick={resetRange}
							>
								초기화
							</button>
							<button
								name="period"
								className="btn-primary text-sm"
								onClick={closeFilter}
							>
								적용
							</button>
						</div>
					</form>
				)}
			</li>
		</ul>
	);
};

export default Filter;
