import { apiId, DnD, DropZone } from './config/index';
import vkAPI from './vk-api/vk_api';
import initEvent from './eventHandlers';

DropZone.data.set( DropZone.left.DropZone, [] );
DropZone.data.set( DropZone.right.DropZone, (JSON.parse( localStorage.getItem( 'right_' + apiId ) ) || []) );

vkAPI();

initEvent();

