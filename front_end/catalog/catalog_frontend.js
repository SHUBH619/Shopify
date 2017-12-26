function getItems(callback) {
    $.get(
        './task/getItems',
        (data)=>{
            console.log("success");
            callback(data);
        },'json'
    )
}

$(()=>{
    let itemBox=$('#cardDeck');
    let addCart=$('.cart');
    let av=$('#av');

    if(localStorage.getItem('MyCart')===null)
    {
        localStorage.setItem('MyCart',JSON.stringify([]));
    }
    let count=0;
    let refreshItems=(items)=>{
        itemBox.empty();
        count=items.length;
        for (item of items) {
            let imgPath='../admin'+(item.imagePath).slice(1);
            let card = $(`<div class="card">
            <img class="card-img-top" src="${imgPath}" alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-text">${item.des}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated at ${(item.updatedAt).substring(0, 10)} ${(item.updatedAt).slice(11, 19)}</small><br>
                 <div class=".cart" data-id="${item.title}" onclick="addToCart(this)"><i class="fas fa-cart-plus"></i></div>
            </div>
            </div>`);

            itemBox.append(card);

        }
    }

    getItems(refreshItems);

    window.addToCart=(element)=>{
        console.log(localStorage.getItem('MyCart'));
        let storedItems=JSON.parse(localStorage.getItem('MyCart'));
        let title=$(element).attr('data-id');
        if(storedItems.indexOf(title)===-1)
        {
            storedItems.push(title);
            $(element).parent().parent().hide();
            if(storedItems.length===count)
                av.text("THANKS!");
        }
        localStorage.setItem('MyCart',JSON.stringify(storedItems));
        console.log(localStorage.getItem('MyCart'))

    }


})