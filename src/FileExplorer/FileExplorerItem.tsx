import React, {
	FC,
	memo,
	useMemo,
	useState,
	useCallback,
	useEffect,
} from 'react';
import ActionItems from './ActionItems';
import {
	FileItem,
	FolderItem,
	FOLDER_IMAGE_SRC,
	LOGO_MAPPER,
	Meta,
} from './constants';

interface Props {
	fileExploreItemData: FileItem | FolderItem;
	selectedFile: null | number;
	setSelectedFile: React.Dispatch<React.SetStateAction<null | number>>;
	actionListOpenedFor: null | number;
	setActionListOpenedFor: React.Dispatch<React.SetStateAction<null | number>>;
}

const FileExplorerItem: FC<Props> = ({
	fileExploreItemData,
	selectedFile,
	setSelectedFile,
	actionListOpenedFor,
	setActionListOpenedFor,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const isFolder = useMemo(
		() => fileExploreItemData.type === 'folder',
		[fileExploreItemData.type]
	);
	const isSelected = useMemo(
		() => selectedFile === fileExploreItemData.id,
		[fileExploreItemData.id, selectedFile]
	);
	const isActionListOpened = useMemo(
		() => actionListOpenedFor === fileExploreItemData.id,
		[actionListOpenedFor, fileExploreItemData.id]
	);

	const handleOutsideClicks = useCallback(() => {
		setActionListOpenedFor(null);
		setSelectedFile(null);
	}, [setActionListOpenedFor, setSelectedFile]);

	useEffect(() => {
		document.addEventListener('click', handleOutsideClicks);

		return () => {
			document.removeEventListener('click', handleOutsideClicks);
		};
	}, [handleOutsideClicks]);

	const handleItemClick = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			setActionListOpenedFor(null);
			if (isFolder) {
				setIsExpanded((prev) => !prev);
			} else {
				setSelectedFile(fileExploreItemData.id);
			}
		},
		[fileExploreItemData.id, isFolder, setActionListOpenedFor, setSelectedFile]
	);

	const handleItemRightClick = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.preventDefault();
			setActionListOpenedFor(fileExploreItemData.id);
		},
		[fileExploreItemData.id, setActionListOpenedFor]
	);

	const actionClickHandler = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			console.log(
				`${(event.target as HTMLElement).id} ${fileExploreItemData.name}`
			);
			setActionListOpenedFor(null);
		},
		[fileExploreItemData.name, setActionListOpenedFor]
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
						isFolder
							? FOLDER_IMAGE_SRC
							: LOGO_MAPPER[(fileExploreItemData as FileItem).meta as Meta]
					}
					alt="Folder Icon"
					className="item-icon"
				/>
				<span className={isSelected ? 'selected-file' : ''}>
					{fileExploreItemData.name}
				</span>

				{isActionListOpened && (
					<ActionItems actionClickHandler={actionClickHandler} />
				)}
			</div>

			{isExpanded && (
				<ul className="file-explorer-list">
					{(fileExploreItemData as FolderItem).data.map(
						(data: any, index: React.Key | null | undefined) => (
							<FileExplorerItem
								key={index}
								fileExploreItemData={data}
								selectedFile={selectedFile}
								setSelectedFile={setSelectedFile}
								actionListOpenedFor={actionListOpenedFor}
								setActionListOpenedFor={setActionListOpenedFor}
							/>
						)
					)}
				</ul>
			)}
		</li>
	);
};

export default memo(FileExplorerItem);
