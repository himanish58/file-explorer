import React, { memo } from 'react';
import FileExplorer from './FileExplorer';
import { Data } from './TestData';
import './App.css';

const App = () => (
	<div className="App">
		<FileExplorer fileExplorerData={Data} />
	</div>
);

export default memo(App);
