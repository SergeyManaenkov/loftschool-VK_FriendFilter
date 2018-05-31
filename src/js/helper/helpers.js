import { apiId, DnD, DropZone } from '../config/index';

let helpers = {
    closest: function ( node, selector ) {
        // По селектору находим родителя. Поиск начитается с переданного элемента
        while ( node ) {
            if ( node.matches( selector ) ) {
                return node;
            } else {
                node = node.parentElement;
            }
        }
        return null;
    },
    clearDnD: function () {
        // очищаем DnD
        for ( let key in DnD ) {
            DnD[key] = null;
        }
    },
    removeItems: function ( _of, _this ) {
        // Удаляем из одного масива _of удаляем то что содержиться в массиве _this
        if ( !_this.length ) {
            return _of;
        }
        for ( const item of _this ) {
            for ( let i = 0; i < _of.length; i++ ) {
                if ( _of[i].id === item.id ) {
                    _of.splice( i, 1 );
                    i--;
                }
            }
        }
        return _of;
    },
    search: function ( arr, text ) {
        if ( !text ) {
            return arr;
        }
        const reg = new RegExp( text, 'i' );
        return arr.filter( function ( item ) {
            if ( reg.test( item.first_name ) || reg.test( item.last_name ) ) {
                return true;
            }
            return false;
        } )
    },
    getDataItem: function ( arr, field, val ) {
        for ( let i = 0; i < arr.length; i++ ) {
            let item = arr[i];
            if ( item[field] === val ) {
                return { data: item, i: i };
            }
        }
    },
    renderDropZone: function ( dropZone, data ) {
        let nameZoneTemplate = dropZone.classList.contains( 'left-friend-list' ) ? 'left' : 'right';
        const render = Handlebars.compile( document.querySelector( '#user-' + nameZoneTemplate ).textContent );
        dropZone.innerHTML = render( { items: helpers.search( data, DropZone[nameZoneTemplate].inputSearch.value ) } );
    },
    dropFriend: function ( options ) {

        debugger;
        // drop zone в которую перетащили элемент
        const finishDropZone = helpers.closest( options.finishElement, '.drop-zone' );
        const startDropZone = helpers.closest( options.startElement, '.drop-zone' );
        if ( finishDropZone === startDropZone ) {
            return;
        }

        // находим элемент друга на который наведен курсор
        const friendItem = helpers.closest( options.finishElement, '.friend-list-item' );

        let finishDropZoneData = DropZone.data.get( finishDropZone );

        let currentFiendId = null;
        let currentFiend = null;

        if ( friendItem ) {
            currentFiendId = friendItem.querySelector( '.fa' ).getAttribute( 'id' ) * 1;
            currentFiend = helpers.getDataItem( DropZone.data.get( finishDropZone ), 'id', currentFiendId );
            finishDropZoneData.splice( currentFiend.i, 0, options.startFriend.data );
        } else if ( finishDropZone ) {
            finishDropZoneData.push( options.startFriend.data );
        }

        // Удаляем перенесенные данные из стартовой зоны
        // Удаляем элемент из стартовой зоны
        options.startElement.remove();

        let startZoneData = DropZone.data.get( startDropZone );
        // Удаляем данные о друге, из стартовой зоны
        startZoneData.splice( options.startFriend.i, 1 );

        helpers.renderDropZone( finishDropZone, finishDropZoneData );
        helpers.renderDropZone( startDropZone, startZoneData );

        // Обнуляем DnD
        helpers.clearDnD();

    }
};

export default helpers;


