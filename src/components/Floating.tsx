import classNames from 'classnames';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Floating = (props: { display: boolean }) => {
	const navigate = useCallback(useNavigate(), []);

	return (
		<div
			className={classNames(
				'fixed bottom-0 right-5 shadow-lg rounded-full transition z-10 bg-main w-16 h-16 flex center text-white cursor-pointer font-bold',
				{
					'invisible md:-translate-y-5 md:visible md:opacity-100':
						props.display,
					'invisible opacity-0': !props.display,
				}
			)}
			onClick={() => navigate('/login')}
		>
			로그인
		</div>
	);
};

export default Floating;
