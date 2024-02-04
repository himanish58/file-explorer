import React, { FC, memo, useState } from 'react';
import { FileExplorerData } from './constants';
import './fileExplorers.css';
import FileExplorerItem from './FileExplorerItem';

interface Props {
	fileExplorerData: FileExplorerData;
}

const FileExplorer: FC<Props> = ({ fileExplorerData }) => {
	const [selectedFile, setSelectedFile] = useState<null | number>(null);
	const [actionListOpenedFor, setActionListOpenedFor] = useState<null | number>(
		null
	);

	return (
		<ul className="file-explorer-list">
			{fileExplorerData.map((fileExplorerItemData, index) => (
				<FileExplorerItem
					key={index}
					fileExploreItemData={fileExplorerItemData}
					selectedFile={selectedFile}
					setSelectedFile={setSelectedFile}
					actionListOpenedFor={actionListOpenedFor}
					setActionListOpenedFor={setActionListOpenedFor}
				/>
			))}
		</ul>
	);
};

export default memo(FileExplorer);
