import classNames from 'classnames';
import daejeon from 'data/location';
import { useState, MouseEvent, Dispatch } from 'react';
import { ActionChangeRange } from 'types/types';

const LocationFilter = (props: {
	closeFilter: () => void;
	dispatch: Dispatch<ActionChangeRange>;
	getPosts: () => void;
}) => {
	const [selectedGu, setSelectedGu] = useState<string>('');
	const [selectedDong, setSelectedDong] = useState<string[]>([]);

	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget.getAttribute('name');
		if (target) {
			setSelectedGu((prev) => target);
		}
	};

	const manageDong = (e: MouseEvent<HTMLLIElement>) => {
		const target = e.currentTarget.getAttribute('id');
		if (target) {
			if (!selectedDong.includes(target)) {
				if (selectedDong.length > 2) {
					alert('총 세 개의 동까지만 검색이 가능해요!');
				} else {
					setSelectedDong((prev) => [...prev, target]);
					props.dispatch({
						type: 'CHANGE_LOCATION',
						value: [...selectedDong, target],
					});
				}
			} else {
				setSelectedDong((prev) => prev.filter((i) => i !== target));
				props.dispatch({
					type: 'CHANGE_LOCATION',
					value: [...selectedDong.filter((i) => i !== target)],
				});
			}
		}
	};

	const resetRange = () => {
		setSelectedGu((prev) => '');
		setSelectedDong((prev) => []);
		props.dispatch({
			type: 'CHANGE_LOCATION',
			value: ['* *', 'not location', 'not location'],
		});
	};

	const applyFilter = async () => {
		props.getPosts();
		props.closeFilter();
	};

	return (
		<>
			<div className="grow grid grid-cols-2">
				<div className="border-1 vertical">
					{Object.keys(daejeon).map((gu, idx) => {
						return (
							<button
								type="button"
								key={idx}
								name={gu}
								className={classNames(
									'p-2 cursor-pointer text-sm sm:text-base',
									{
										'bg-main text-white font-semibold': selectedGu === gu,
										'hover:bg-gray-300': selectedGu !== gu,
									}
								)}
								onClick={onClickHandler}
							>
								{gu}
							</button>
						);
					})}
				</div>
				<div className="border-1 overflow-scroll">
					<ul className="vertical h-16">
						{daejeon[selectedGu]?.map((g: string) => (
							<li
								id={`${selectedGu} ${g}`}
								key={g}
								className={classNames(
									'text-center p-2 cursor-pointer text-sm sm:text-base',
									{
										'bg-main text-white font-semibold': selectedDong.includes(
											`${selectedGu} ${g}`
										),
										'hover:bg-gray-300': !selectedDong.includes(
											`${selectedGu} ${g}`
										),
									}
								)}
								onClick={manageDong}
							>
								{g}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="flex space-x-2">
				{selectedDong.map((i) => (
					<div
						key={i}
						className="rounded-full border-1 px-2 py-1 text-[0.5rem] sm:text-xs"
					>
						{i}
					</div>
				))}
			</div>
			<span className="text-center text-xs font-bold text-red-400">
				최대 세 개의 동까지 선택할 수 있고,
				<br />
				미선택 시 대전광역시의 전체를 검색합니다.
			</span>
			<div className="flex justify-center space-x-6">
				<button
					name="location"
					type="button"
					className="btn-secondary text-sm"
					onClick={resetRange}
				>
					초기화
				</button>
				<button
					name="location"
					type="button"
					className="btn-primary text-sm"
					onClick={applyFilter}
				>
					적용
				</button>
			</div>
		</>
	);
};
export default LocationFilter;
