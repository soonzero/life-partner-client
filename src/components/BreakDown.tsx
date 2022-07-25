import axios from 'axios';
import { Link } from 'react-router-dom';
import { Post } from 'types/types';

const BreakDown = (props: {
	item: Post;
	selectPartner: (articleId: number) => void;
}) => {
	const deselectPartner = async (articleId: number) => {
		try {
			const response = await axios({
				method: 'PATCH',
				url: `http://15.164.225.61/api/articles/${articleId}`,
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
				data: {
					status: 'waiting',
				},
			});
		} catch (e) {
			console.log(e);
		}
	};

	const managePost = async (articleId: number, status: string) => {
		if (
			window.confirm(
				status === 'deleted'
					? `게시글을 삭제하시겠어요?`
					: `거래 확정은 되돌릴 수 없습니다. 그래도 진행하시겠습니까?`
			)
		) {
			try {
				const response = await axios({
					method: 'PATCH',
					url: `http://15.164.225.61/api/articles/${articleId}`,
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
					data: {
						status,
					},
				});
			} catch (e) {
				console.log(e);
			}
		} else {
			return;
		}
	};

	return (
		<tr key={props.item.id}>
			<td>{props.item.date}</td>
			<td>
				<h4>
					<Link to={`/articles/${props.item.id}`}>{props.item.title}</Link>
				</h4>
			</td>
			<td>{props.item.location.split(',')[0]}</td>
			<td className="py-2">
				{props.item.partner === null ? (
					<button
						className="btn-primary text-xs"
						onClick={() => props.selectPartner(props.item.id)}
					>
						파트너 선택
					</button>
				) : (
					props.item.partner
				)}
			</td>
			<td className="py-2 space-x-3">
				{props.item.status === 'waiting' && (
					<button
						className="btn-secondary text-xs"
						onClick={() => managePost(props.item.id, 'deleted')}
					>
						게시글 삭제
					</button>
				)}
				{props.item.status === 'matching' && (
					<button
						className="btn-secondary text-xs"
						onClick={() => deselectPartner(props.item.id)}
					>
						파트너 선택 취소
					</button>
				)}
				{props.item.status === 'matching' && (
					<button
						className="btn-primary text-xs"
						onClick={() => managePost(props.item.id, 'complete')}
					>
						거래 확정
					</button>
				)}
			</td>
		</tr>
	);
};

export default BreakDown;
