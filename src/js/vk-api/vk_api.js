import { apiId, DnD, DropZone } from '../config/index';
import helpers from '../helper/helpers';

export default () => {
    VK.init( {
        apiId: apiId
    } );

    function auth() {
        return new Promise( ( resolve, reject ) => {
            VK.Auth.login( data => {
                if ( data.session ) {
                    resolve();
                } else {
                    reject( new Error( 'Не удалось авторизоваться' ) );
                }
            }, 2 );
        } );
    }

    function callAPI( method, params ) {
        params.v = '5.76';

        return new Promise( ( resolve, reject ) => {
            VK.api( method, params, ( data ) => {
                if ( data.error ) {
                    reject( data.error );
                } else {
                    resolve( data.response );
                }
            } );
        } )
    }

    (async () => {
        try {
            await auth();

            const friends = await callAPI( 'friends.get', { fields: 'city, country, photo_100' } );

            const rightDropZoneData = DropZone.data.get( DropZone.right.DropZone );
            const leftDropZoneData = helpers.removeItems( friends.items, rightDropZoneData );

            DropZone.data.set( DropZone.left.DropZone, leftDropZoneData );

            helpers.renderDropZone( DropZone.right.DropZone, rightDropZoneData );
            helpers.renderDropZone( DropZone.left.DropZone, leftDropZoneData );

        } catch ( e ) {
            console.error( e );
        }
    })();
}

