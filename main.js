const urls = [ // Ссылки на API
    "https://meowfacts.herokuapp.com/?count=10",
    "https://api.thecatapi.com/v1/images/search?limit=10"
];

function getData(urls) { //получение ответов c API
    const requests = urls.map(url => {

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка получения данных: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            return data; // Возвращаем полученные данные
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
    });

    return Promise.all(requests);
}

getData(urls)
.then(data => { //создание карточек с котиками
    let dives = [];
    for(let i = 0; i < data[1].length; i++) {
        dives.push(createDiv(data[0].data[i], data[1][i].url));
    }
        document.querySelector('main').append(...dives);
    })
    
function createP(text) { //создание html элемента
    let p = document.createElement('p');
    p.classList.add('text');
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