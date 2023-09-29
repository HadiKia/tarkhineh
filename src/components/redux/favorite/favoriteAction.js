const likeItem = (product) => {
    return {
        type : 'LIKE_ITEM'
        ,
        payload : product
    }
}

const dislikeItem = (product) => {
    return {
        type : "DISLIKE_ITEM",
        payload : product
    }
}

export {likeItem, dislikeItem}