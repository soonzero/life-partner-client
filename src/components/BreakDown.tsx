import axios from 'axios';
import { Link } from 'react-router-dom';
import { Post } from 'types/types';

const BreakDown = (props: {
	item: Post;
	selectPartner: (articleId: number) => void;
	getList: () => Promise<void>;
}) => {
	const deselectPartner = async (articleId: number) => {
		if (window.confirm('파트너 선택을 취소하시겠어요?')) {
			try {
				await axios({
					method: 'PATCH',
					url: `http://15.164.225.61/api/articles/${articleId}`,
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
					data: {
						status: 'waiting',
					},
				});
				props.getList();
			} catch (e) {
				console.log(e);
			}
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
				await axios({
					method: 'PATCH',
					url: `http://15.164.225.61/api/articles/${articleId}`,
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
					data: {
						status,
					},
				});
				props.getList();
			} catch (e) {
				console.log(e);
			}
		} else {
			return;
		}
	};

	return (
		<tr
			key={props.item.id}
			className="border-b-1 border-dotted last:border-b-0"
		>
			<td className="py-2">{props.item.date}</td>
			<td>
				<h4 className="text-sm">
					<Link to={`/articles/${props.item.id}`}>{props.item.title}</Link>
				</h4>
			</td>
			<td className="hidden md:table-cell">
				{props.item.location.split(',')[0]}
			</td>
			<td className="py-2 hidden lg:table-cell">
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
			<td className="py-2 space-x-3 hidden lg:table-cell">
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
				{props.item.status === 'complete' && '거래 완료'}
			</td>
		</tr>
	);
};

export default BreakDown;
