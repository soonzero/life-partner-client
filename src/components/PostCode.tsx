import ReactModal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import { ReactComponent as CloseSVG } from 'static/icons/close.svg';
import { Dispatch, SetStateAction } from 'react';

const PostCode = (props: {
	completeHandler: (data: any) => Promise<void>;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
}) => {
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
					width: '50%',
					height: '50%',
				},
			}}
		>
			<DaumPostcode
				onComplete={props.completeHandler}
				style={{ height: '100%' }}
				animation={true}
			/>
			<span
				className="absolute top-1 right-1 cursor-pointer"
				onClick={() => props.setIsOpen(false)}
			>
				<CloseSVG />
			</span>
		</ReactModal>
	);
};

export default PostCode;
