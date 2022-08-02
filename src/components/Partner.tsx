import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import token from 'data/token';
import { Dispatch, MouseEvent } from 'react';
import ReactModal from 'react-modal';
import { ReactComponent as CloseSVG } from 'static/icons/close.svg';

const Partner = (props: {
	isOpen: boolean;
	setIsOpen: Dispatch<React.SetStateAction<boolean>>;
	articleId: number | undefined;
}) => {
	const getPartnersList = async () => {
		const {
			data: { partners },
		} = await axios({
			method: 'GET',
			url: `http://15.164.225.61/api/partners/${props.articleId}/list`,
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		return partners;
	};

	const { data } = useQuery(['partners'], getPartnersList);

	const selectPartner = async (e: MouseEvent<HTMLButtonElement>) => {
		const nickname = e.currentTarget.value;
		if (window.confirm(`${nickname}을 파트너로 선택하시겠습니까?`)) {
			try {
				const { data } = await axios({
					method: 'PATCH',
					url: `http://15.164.225.61/api/articles/${props.articleId}/partners`,
					headers: {
						authorization: `Bearer ${token}`,
					},
					data: {
						nickname,
					},
				});
				if (data.result) {
					props.setIsOpen(false);
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			props.setIsOpen(false);
		}
	};

	return (
		<ReactModal
			isOpen={props.isOpen}
			style={{
				overlay: {
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					zIndex: '10',
				},
				content: {
					margin: 'auto',
					width: '35%',
					height: 'max-content',
				},
			}}
		>
			<div className="flex items-center justify-between mb-6">
				<h3>파트너 선택하기</h3>
				<span
					className="cursor-pointer p-1 rounded-full hover:bg-gray-50"
					onClick={() => props.setIsOpen(false)}
				>
					<CloseSVG />
				</span>
			</div>

			{data && (
				<p className="flex space-x-2">
					{data.map((p: string, id: number) => (
						<button
							key={id}
							className="px-4 py-1 border-1 border-main rounded-full hover:bg-main hover:text-white transition"
							onClick={selectPartner}
							value={p}
						>
							{p}
						</button>
					))}
				</p>
			)}
		</ReactModal>
	);
};

export default Partner;
