import React, { FC, memo } from 'react';

interface Props {
	actionClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

const ActionItems: FC<Props> = ({ actionClickHandler }) => (
	<ul className="action-menu" onClick={actionClickHandler}>
		<li className="action-menu-item" id="copy">
			Copy
		</li>
		<li className="action-menu-item" id="delete">
			Delete
		</li>
		<li className="action-menu-item" id="rename">
			Rename
		</li>
	</ul>
);

export default memo(ActionItems);
