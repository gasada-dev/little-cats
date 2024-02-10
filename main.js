function getData(urls) {
    const requests = urls.map(url => {

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка получения данных: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data; // Возвращаем полученные данные
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
    });

    return Promise.all(requests);
}




const urls = [
    "https://cat-fact.herokuapp.com/facts",
    "https://api.thecatapi.com/v1/images/search?limit=10"
];


getData(urls)
.then(data => {
    let dives = [];
    for(let i = 0; i < data[0].length; i++) {
        dives.push(createDiv(data[0][i].text, data[1][i].url));
    }
    console.log(dives);
        document.querySelector('main').append(...dives);
    })
    
  

function createP(text) {
    let p = document.createElement('p');
    p.classList.add('text')
    p.textContent = text;
    return p
}

function createDiv(text, img){ 
    let div = document.createElement('div');
    div.classList.add('cats');
    div.append(createP(text), createImg(img));
    return div;
}


function createImg(imgUrl){ 
   let img = document.createElement('img');
   img.classList.add('img');
   img.src = imgUrl;
   return img;
}