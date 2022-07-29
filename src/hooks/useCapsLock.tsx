import { KeyboardEvent, useCallback, useState } from 'react';

const useCapsLock = () => {
	const [capsLockIsActive, setCapsLockIsActive] = useState<boolean>(false);

	const onKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'CapsLock')
			setCapsLockIsActive((prev) => e.getModifierState('CapsLock'));
	}, []);

	return { capsLockIsActive, onKey };
};

export default useCapsLock;
