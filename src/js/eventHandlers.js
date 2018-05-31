import { apiId, DnD, DropZone } from './config/index';
import helpers from './helper/helpers';

export default () => {
    // Сохранение
    DropZone.btnSave.addEventListener( 'click', function ( e ) {
        localStorage.setItem( 'right_' + apiId, JSON.stringify( DropZone.data.get( DropZone.right.DropZone ) ) );
    } );
    // Добавление друга по плюсику
    DropZone.left.DropZone.addEventListener('click', function ( e ) {
        if(e.target && e.target.classList.contains('fa-plus')){
            e.preventDefault();

            helpers.dropFriend({
                startElement: e.target,
                finishElement: DropZone.right.DropZone,
                startFriend: helpers.getDataItem( DropZone.data.get( DropZone.left.DropZone ), 'id', e.target.getAttribute('id') * 1 )
            });
        }
    });

    DropZone.right.DropZone.addEventListener('click', function ( e ) {
        debugger;
        if(e.target && e.target.classList.contains('fa-times')){
            e.preventDefault();

            helpers.dropFriend({
                startElement: e.target,
                finishElement: DropZone.left.DropZone,
                startFriend: helpers.getDataItem( DropZone.data.get( DropZone.right.DropZone ), 'id', e.target.getAttribute('id') * 1 )
            });
        }
    });
// Фильтрация в левом блоке
    DropZone.left.inputSearch.addEventListener( 'input', function ( e ) {
        const DropZoneData = DropZone.data.get( DropZone.left.DropZone );
        const val = e.target.value;
        let searchResult = DropZoneData;
        if ( val ) {
            searchResult = helpers.search( DropZoneData, val );
        }
        helpers.renderDropZone( DropZone.left.DropZone, searchResult );
    } );

// Фильтрация в правом блоке
    DropZone.right.inputSearch.addEventListener( 'input', function ( e ) {
        const DropZoneData = DropZone.data.get( DropZone.right.DropZone );
        const val = e.target.value;
        let searchResult = DropZoneData;
        if ( val ) {
            searchResult = helpers.search( DropZoneData, val );
        }
        helpers.renderDropZone( DropZone.right.DropZone, searchResult );
    } );

    /* Реализация DragAndDrop */
    document.addEventListener( 'dragstart', function ( e ) {
        console.log( e.target );
        // Запоминаем зону из которой стартовало перетаскивание
        DnD.startDropZone = helpers.closest( e.target, '.drop-zone' );
        if ( DnD.startDropZone.classList.contains( 'left-friend-list' ) ) {
            DnD.nameZoneTemplate = 'right';
        } else if ( DnD.startDropZone.classList.contains( 'right-friend-list' ) ) {
            DnD.nameZoneTemplate = 'left';
        }
        let dropZoneData = DropZone.data.get( DnD.startDropZone );

        // задаем тип перетаскивания, которое пользователь может выполнять с элементом
        e.dataTransfer.effectAllowed = 'move';

        // задаем внешний вид курсора мыши в соответствии с заданным типом перетаскивания
        e.dataTransfer.dropEffect = 'move';

        DnD.element = helpers.closest( e.target, '.friend-list-item' );
        DnD.friendId = DnD.element.querySelector( '.fa' ).getAttribute( 'id' ) * 1;
        DnD.friend = helpers.getDataItem( DropZone.data.get( DnD.startDropZone ), 'id', DnD.friendId );
} );

    document.addEventListener( 'dragover', function ( e ) {
        if ( DnD.element ) {
            e.preventDefault();
        }
    } );

    document.addEventListener( 'drop', function ( e ) {
        console.log( e.target );
        if ( DnD.element ) {
            e.preventDefault();
            helpers.dropFriend( {
                startElement: DnD.element,
                finishElement: e.target,
                startFriend: DnD.friend
            });
        }
    } );
}
