import React, { FC, memo } from 'react';
import { FileExplorerData } from './constants';
import './fileExplorers.css';
import FileExplorerItem from './FileExplorerItem';

interface Props {
	fileExplorerData: FileExplorerData;
}

const FileExplorer: FC<Props> = ({ fileExplorerData }) => (
	<ul className="file-explorer-list">
		{fileExplorerData.map((fileExplorerItemData, index) => (
			<FileExplorerItem
				fileExploreItemData={fileExplorerItemData}
				key={index}
			/>
		))}
	</ul>
);

export default memo(FileExplorer);
