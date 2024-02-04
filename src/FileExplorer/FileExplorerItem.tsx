import React, {
	FC,
	memo,
	useMemo,
	useState,
	useCallback,
	useEffect,
} from 'react';
import {
	FileItem,
	FolderItem,
	FOLDER_IMAGE_SRC,
	LOGO_MAPPER,
} from './constants';

interface Props {
	fileExploreItemData: any;
}

const FileExplorerItem: FC<Props> = ({ fileExploreItemData }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isSelected, setIsSelected] = useState(false);
	const [showActionMenu, setShowActionMenu] = useState(false);

	const isFolder = useMemo(
		() => fileExploreItemData.type === 'folder',
		[fileExploreItemData.type]
	);

	const clickEventListener = useCallback(() => {
		setShowActionMenu(false);
	}, []);

	useEffect(() => {
		document.addEventListener('click', clickEventListener);

		return () => {
			document.removeEventListener('click', clickEventListener);
		};
	}, [clickEventListener]);

	const handleItemClick = useCallback(
		(event: { stopPropagation: () => void }) => {
			event.stopPropagation();
			if (isFolder) {
				setIsExpanded((prev) => !prev);
			} else {
				setIsSelected((prev) => !prev);
			}
		},
		[isFolder]
	);

	const handleItemRightClick = useCallback(
		(event: { preventDefault: () => void }) => {
			event.preventDefault();
			setShowActionMenu((prev) => !prev);
		},
		[]
	);

	const actionClickHandler = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			// @ts-ignore
			console.log(`${event.target.id} ${fileExploreItemData.name}`);
		},
		[fileExploreItemData.name]
	);

	return (
		<li>
			<div
				className="list-content"
				onClick={handleItemClick}
				onContextMenu={handleItemRightClick}>
				{isFolder && <span>{isExpanded ? '▼' : '▶'}</span>}
				<img
					src={
						// @ts-ignore
						isFolder ? FOLDER_IMAGE_SRC : LOGO_MAPPER[fileExploreItemData.meta]
					}
					alt="Folder Icon"
					className="item-icon"
				/>
				<span className={isSelected ? 'selected-file' : ''}>
					{fileExploreItemData.name}
				</span>
				{showActionMenu && (
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
				)}
			</div>
			{isFolder && isExpanded && (
				<ul className="file-explorer-list">
					{fileExploreItemData.data.map(
						(data: any, index: React.Key | null | undefined) => (
							<FileExplorerItem fileExploreItemData={data} key={index} />
						)
					)}
				</ul>
			)}
		</li>
	);
};

export default memo(FileExplorerItem);
