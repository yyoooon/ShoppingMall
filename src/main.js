// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json') //promise 반환
        .then(response => response.json()) // 필요한 json파일 json화
        .then(json => json.items); // json전체 말고 필요한 배열만 가져와 반환
}

// Update the list with given items
function displayItems(items) {
    const container = document.querySelector('.items');
    const html = items.map(item => createHTMLString(item));
    container.innerHTML = html.join('');
    // map은 배열 요소 하나하나를 가져와서 정한 함수에 따라 처리한 후 반환 값을 배열요소로 넣어
    // 새로운 배열로 반환한다, 각 item요소 당 각각 li가 텍스트가 됐으므로, ul에 하나의 텍스트로 넣기 위해
    // 텍스트 배열 요소를 모두 합쳐주는 .join을 해줘야한다
}

//Create HTML list item from the given data item
function createHTMLString(item) { // 하나씩 가져와지는 item은 오브젝트이다
    return `
    <li class='item' data-type = '${item.type}' data-color = '${item.color}' >
        <img src="${item.image}" alt="${item.type}" class='item__thumbnail'>
        <span class='item__description'>${item.type}, ${item.color}</span>
    </li>
    `;
}

function onButtonClick(e, items) {
    const dataset = e.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    if(key == null || value == null) return;

    // const filtered = items.filter(item => item[key] === value);
    // displayItems(filtered);
    updateItems(key, value);
}

// li에도 데이터 타입과 컬러를 적어서 타겟의 것과 맞는 것만 클래스를 추가해주는 방법
function updateItems(key, value) {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        if(item.dataset[key] === value) {
            item.classList.remove('invisible');
        } else {
            item.classList.add('invisible');
        }
    });
}

function setEventListners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons'); // 이벤트 위임
    logo.addEventListener('click', () =>  displayItems(items));
    buttons.addEventListener('click', (e) => onButtonClick(e, items)); // 코드가 길어져 함수로 묶음
}

// main - 필요한 데이터 배열만 쏙 가져오도록 함수로 축약함
loadItems() // 마지막으로 반환된게 json.items였기 때문에 then의 인자로 쓰임, 그냥 반환된 것에서 이어진다고 생각하면 됨
    .then(items => {
        displayItems(items);
        setEventListners(items);
    })
    .catch(console.log);