function getItems(callback) {
    $.get(
        '/admin',
        (data)=>{
            console.log("success")
            callback(data);
        },'json'
    )
}

function postItem(title,price,description,callback) {
    $.post(
        '/admin/addItem',
        {
            title:title,
            price:price,
            description:description
        },
        (data)=>{
            console.log("Posted")
            callback(data);
        },
        'json'
    )
}

$(()=>{

    let itemBox=$('#cardDeck');
    let title=$('#title');
    let price=$('#price');
    let form=$('#addForm')
    let description=$('#description');

    let refreshItems=(items)=>{

        itemBox.empty();
        for(item of items)
        {
            let card=$(`<div class="card">
            <img class="card-img-top" src="${item.imagePath}" alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-text">${item.description}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated at ${item.updatedAt}</small>
            </div>
            </div>`);

            itemBox.append(card);

        }

    }

    getItems(refreshItems);

    form.submit((e)=>{
        e.preventDefault();
        postItem(title.val(),price.val(),description.val(),refreshItems);
    })
    
});