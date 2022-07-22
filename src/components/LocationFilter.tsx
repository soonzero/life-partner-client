import classNames from 'classnames';
import { daejeon } from 'data/dummyData';
import { useState, MouseEvent } from 'react';
import { Daejeon } from 'types/types';

const initialState = {
	대덕구: [],
	동구: [],
	서구: [],
	중구: [],
	유성구: [],
};

const LocationFilter = (props: { closeFilter: any }) => {
	const [selectedGu, setSelectedGu] = useState<string>('');
	const [selectedDong, setSelectedDong] = useState<Daejeon>({
		대덕구: [],
		동구: [],
		서구: [],
		중구: [],
		유성구: [],
	});

	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		const target = e.currentTarget.getAttribute('name');
		if (target) {
			setSelectedGu((prev) => target);
		}
	};

	const manageDong = (e: MouseEvent<HTMLLIElement>) => {
		const target = e.currentTarget.getAttribute('id');
		if (target) {
			if (!selectedDong[selectedGu].includes(target)) {
				if (
					selectedDong.대덕구.length +
						selectedDong.동구.length +
						selectedDong.서구.length +
						selectedDong.유성구.length +
						selectedDong.중구.length >=
					3
				) {
					alert('총 세 개의 동까지만 검색이 가능해요!');
				} else {
					setSelectedDong((prev) => ({
						...prev,
						[selectedGu]: selectedDong[selectedGu].concat(target),
					}));
				}
			} else {
				setSelectedDong((prev) => ({
					...prev,
					[selectedGu]: selectedDong[selectedGu].filter((i) => i !== target),
				}));
			}
		}
	};

	const resetRange = () => {
		setSelectedGu((prev) => '');
		setSelectedDong((prev) => initialState);
	};

	return (
		<>
			<div className="grow grid grid-cols-2">
				<div className="border-1 vertical">
					{Object.keys(daejeon).map((gu, idx) => {
						return (
							<button
								key={idx}
								name={gu}
								className={classNames('p-2 cursor-pointer', {
									'bg-main text-white font-semibold': selectedGu === gu,
									'hover:bg-gray-100': selectedGu !== gu,
								})}
								onClick={onClickHandler}
							>
								{gu}
							</button>
						);
					})}
				</div>
				<div className="border-1 overflow-scroll">
					<ul className="vertical h-16">
						{daejeon[selectedGu]?.map((g) => (
							<li
								id={g}
								key={g}
								className={classNames('text-center p-2 cursor-pointer', {
									'bg-main text-white font-semibold':
										selectedDong[selectedGu].includes(g),
									'hover:bg-gray-100': !selectedDong[selectedGu].includes(g),
								})}
								onClick={manageDong}
							>
								{g}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="flex space-x-2">
				{selectedDong['대덕구'].map((i) => (
					<div key={i} className="rounded-full border-1 px-2 py-1 text-xs">
						{i}
					</div>
				))}
				{selectedDong['동구'].map((i) => (
					<div key={i} className="rounded-full border-1 px-2 py-1 text-xs">
						{i}
					</div>
				))}
				{selectedDong['서구'].map((i) => (
					<div key={i} className="rounded-full border-1 px-2 py-1 text-xs">
						{i}
					</div>
				))}
				{selectedDong['유성구'].map((i) => (
					<div key={i} className="rounded-full border-1 px-2 py-1 text-xs">
						{i}
					</div>
				))}
				{selectedDong['중구'].map((i) => (
					<div key={i} className="rounded-full border-1 px-2 py-1 text-xs">
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
					type="submit"
					className="btn-primary text-sm"
					onClick={props.closeFilter}
				>
					적용
				</button>
			</div>
		</>
	);
};
export default LocationFilter;
