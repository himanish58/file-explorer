export interface FileItem {
	id: number;
	type: string;
	meta: string;
	name: string;
}

export interface FolderItem {
	id: number;
	type: string;
	name: string;
	data: Array<FolderItem | FileItem>;
}

export type FileExplorerData = Array<FolderItem | FileItem>;

export const FOLDER_IMAGE_SRC =
	'https://logowik.com/content/uploads/images/343_folder.jpg';

const JS_LOGO =
	'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png';

const TS_LOGO =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png';

const HTML_LOGO =
	'https://e7.pngegg.com/pngimages/840/443/png-clipart-html-5-logo-web-development-html-css3-canvas-element-web-design-w3c-html5-logo-miscellaneous-text-thumbnail.png';

const IMG_LOGO =
	'https://w7.pngwing.com/pngs/293/624/png-transparent-managed-file-transfer-product-demonstration-computer-icons-business-business-blue-company-text-thumbnail.png';

const SVG_LOGO =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/SVG_Logo.svg/2048px-SVG_Logo.svg.png';

export const LOGO_MAPPER = {
	js: JS_LOGO,
	ts: TS_LOGO,
	html: HTML_LOGO,
	img: IMG_LOGO,
	svg: SVG_LOGO,
};
