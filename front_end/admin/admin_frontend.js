function getItems(callback) {
    $.get(
        '/admin',
        (data)=>{
            console.log("success");
            callback(data);
        },'json'
    )
}

function postItem(title,price,description,callback) {

    let fd=new FormData($('#addForm')[0]);
    // fd.append('image',$('#image').files)
    // fd.append('title',title);
    // fd.append('price',price);
    // fd.append('description',description)

    $.ajax({
        url:'/admin/addItem',
        method:"POST",
        data:fd,
        async:true,
        timeout:60000,
        processData: false,
        contentType: false,
        success:function (data) {
            console.log("Posted")
            callback(data);
        },
        error:function (err) {
            console.log(err);
        }
    })

}

function deleteItem(title,imagepath,callback) {

    $.post(
        '/admin/deleteItem',
        {
            title:title,
            imagePath:imagepath
        },
        (data)=>{
            console.log('deleted');
            callback(data);
    }
    )
}



$(()=>{

    let itemBox=$('#cardDeck');
    let title=$('#title');
    let price=$('#price');
    let form=$('#addForm')
    let description=$('#des');

    let refreshItems=(items)=>{

        itemBox.empty();
        for(item of items)
        {
            let card=$(`<div class="card">
            <img class="card-img-top" src="${item.imagePath}" alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-text">${item.des}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated at ${item.updatedAt.substring(0,10)} ${item.updatedAt.slice(11,19)}</small><br>
                 <div data-id="${item.title}" data-im="${item.imagePath}" onclick="deleteI(this)"><i class="fas fa-trash"></i><div>
            </div>
            </div>`);

            itemBox.append(card);

        }
    }

    getItems(refreshItems);

    window.deleteI=(element)=>{
        let title=$(element).attr('data-id');
        let imagepath=$(element).attr('data-im');
        console.log(title);
        deleteItem(title,imagepath,refreshItems);
    }

    form.submit((e)=>{
        e.preventDefault();
        postItem(title.val(),price.val(),description.val(),refreshItems);
        form.trigger('reset');
    })
    
});