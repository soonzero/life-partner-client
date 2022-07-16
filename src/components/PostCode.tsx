import ReactModal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';

const PostCode = (props: {
	completeHandler: (data: any) => Promise<void>;
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
					height: '80%',
				},
			}}
		>
			<DaumPostcode
				onComplete={props.completeHandler}
				style={{ height: '100%' }}
			/>
		</ReactModal>
	);
};

export default PostCode;
