let DnD = {
    startDropZone: null,
        element: null,
        friendId: null,
        friend: null,
        nameZoneTemplate: null
};
let DropZone = {
    left: {
        DropZone: document.querySelector( '.left-friend-list.drop-zone' ),
            inputSearch: document.querySelector( '#friend_left' )
    },
    right: {
        DropZone: document.querySelector( '.right-friend-list.drop-zone' ),
            inputSearch: document.querySelector( '#friend_right' )
    },
    btnSave: document.querySelector( '.save-button' ),
        data: new Map()
};

export {
    DnD,
    DropZone
};