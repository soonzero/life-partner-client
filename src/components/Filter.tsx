import { MouseEvent, useReducer, useState } from 'react';
import { ReactComponent as ChevronDownSVG } from 'static/icons/chevron-down.svg';
import { addCommasToNumber } from 'functions/common';
import classNames from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ActionChangePrice, ActionChangePeriod, Range } from 'types/types';

const initialState = {
	price: {
		minPrice: 2000,
		maxPrice: 30000,
	},
	period: {
		minPeriod: 10,
		maxPeriod: 120,
	},
};

const reducer = (
	state: Range,
	action: ActionChangePeriod | ActionChangePrice
) => {
	switch (action.type) {
		case 'CHANGE_PRICE':
			return {
				...state,
				price: {
					...state.price,
					[action.id]: action.value,
				},
			};
		case 'CHANGE_PERIOD':
			return {
				...state,
				period: {
					...state.period,
					[action.id]: action.value,
				},
			};
		default:
			return state;
	}
};

const Filter = (props: { price: number[]; period: number[] }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { price, period } = state;
	const { minPrice, maxPrice } = price;
	const { minPeriod, maxPeriod } = period;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [openedFilter, setOpenedFilter] = useState<string>('');

	const changeRange = (data: number | number[]) => {
		if (openedFilter === 'price') {
			if (Array.isArray(data)) {
				dispatch({
					type: 'CHANGE_PRICE',
					id: 'minPrice',
					value: data[0],
				});
				dispatch({
					type: 'CHANGE_PRICE',
					id: 'maxPrice',
					value: data[1],
				});
			}
		} else if (openedFilter === 'period') {
			if (Array.isArray(data)) {
				dispatch({
					type: 'CHANGE_PERIOD',
					id: 'minPeriod',
					value: data[0],
				});
				dispatch({
					type: 'CHANGE_PERIOD',
					id: 'maxPeriod',
					value: data[1],
				});
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
			dispatch({ type: 'CHANGE_PRICE', id: 'minPrice', value: 2000 });
			dispatch({ type: 'CHANGE_PRICE', id: 'maxPrice', value: 30000 });
		} else if (target === 'period') {
			dispatch({ type: 'CHANGE_PERIOD', id: 'minPeriod', value: 10 });
			dispatch({ type: 'CHANGE_PERIOD', id: 'maxPeriod', value: 120 });
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
								min={2000}
								max={30000}
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
								min={10}
								max={120}
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
