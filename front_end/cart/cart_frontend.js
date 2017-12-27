function getItems(title,callback){
    console.log(title);
    $.ajax({
            url: './task/getItems',
            method:"POST",
            data: {
                items: title
            },
            success: (data) => {
                console.log("Success")
                console.log(data)
                callback(data);
            },
            error:function (xhr,err,op) {
                console.log(err);
            }

        }
    );
}



$(()=>{
    let itemBox=$('#cardDeck');
    let goToShop=$('#shop');
    let items=0;
    if(localStorage.getItem('MyCart')===null)
        localStorage.setItem('MyCart',JSON.stringify([]))
    else
        items=localStorage.getItem('MyCart');
    let removeItem=$('.delete');
    console.log(items);


    let refreshItems=(itemss)=>{
        itemBox.empty();
        count=itemss.length;
        for (item of itemss) {
            if(item!==null)
            {
            let imgPath = '../admin' + (item.imagePath).slice(1);
            let card = $(`<div class="card">
            <img class="card-img-top" src="${imgPath}" alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-text">${item.des}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated at ${(item.updatedAt).substring(0, 10)} ${(item.updatedAt).slice(11, 19)}</small><br>
                 <div class=".delete" data-id="${item.title}" onclick="removeFromCart(this)"><i class="fas fa-minus-square fa-2x"></i></div>
            </div>
            </div>`);

            itemBox.append(card);
        }
        }
    }

    getItems(items,refreshItems);

    goToShop.click(()=>{
        window.location='../catalog';
    })

    window.removeFromCart=(element)=>{
        requestAnimationFrame(()=>{
            let storedItems=JSON.parse(localStorage.getItem('MyCart'));
            console.log(element)
            let title=$(element).attr('data-id')
            console.log(title)
            let i=storedItems.indexOf(title);
            delete storedItems[i];
            localStorage.setItem('countItems',JSON.parse(localStorage.getItem('countItems'))-1);
            if(localStorage.getItem('countItems')==0)
                localStorage.setItem('MyCart',JSON.stringify([]));
            else
            localStorage.setItem('MyCart',JSON.stringify(storedItems));
            $(element).parent().parent().hide();
        })

    }
})