// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13, "eng": "violet"},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35, "eng": "green"},
  {"kind": "Личи", "color": "розово-красный", "weight": 17, "eng": "carmazin"},
  {"kind": "Карамбола", "color": "желтый", "weight": 28, "eng": "yellow"},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22, "eng": "lightbrown"}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    const newLi = document.createElement("li");
    newLi.className = `fruit__item fruit_${fruits[i].eng}`;
    fruitsList.appendChild(newLi);

    const newDiv = document.createElement("div");
    newDiv.className = "fruit__info";
    newLi.appendChild(newDiv);
    
    newDiv.appendChild(document.createElement("div")).innerHTML = 'index: '+ i;
    newDiv.appendChild(document.createElement("div")).innerHTML = 'kind: '+ fruits[i].kind;
    newDiv.appendChild(document.createElement("div")).innerHTML = 'color: '+ fruits[i].color;
    newDiv.appendChild(document.createElement("div")).innerHTML = 'weight (кг): '+ fruits[i].weight;

  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const tempFruits = fruits;

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
      // TODO: допишите функцию перемешивания массива
      //
      // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    const randomIndex = getRandomInt(0, fruits.length-1); 
      // вырезаем его из fruits и вставляем в result.
      // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
      // (массив fruits будет уменьшатся, а result заполняться)
    result.push(fruits[randomIndex]);
    fruits.splice(randomIndex, 1);
  }
  if(tempFruits === result) {
    alert('Achtung! order not changed!');
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits = JSON.parse(fruitsJSON);

  fruits = fruits.filter((item) => {
    // TODO: допишите функцию
    let minWeightInput = document.querySelector('.minweight__input').value;
    let maxWeightInput = document.querySelector('.maxweight__input').value;

    minWeightInput = minWeightInput && parseInt(minWeightInput) ? minWeightInput : 0;
    maxWeightInput = maxWeightInput && parseInt(maxWeightInput) ? maxWeightInput : 1000;

    return item.weight >= minWeightInput && item.weight <= maxWeightInput;
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  console.log(a, b);
  const colorPriority = ['carmazin', 'violet', 'yellow', 'green', 'lightbrown'];
  const priority1 = colorPriority.indexOf(a.eng);
  const priority2 = colorPriority.indexOf(b.eng);

  return priority1 > priority2;  
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparationColor(arr[j], arr[j+1])) { 
                // делаем обмен элементов
                let temp = arr[j+1]; 
                arr[j+1] = arr[j]; 
                arr[j] = temp; 
            }
        }
    }     
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    function swap(arr, firstIndex, secondIndex){
      const temp = arr[firstIndex];
      arr[firstIndex] = arr[secondIndex];
      arr[secondIndex] = temp;
   }
   
   // функция разделитель
   function partition(arr, left, right) {
      var pivot = arr[Math.floor((right + left) / 2)],
          i = left,
          j = right;
      while (i <= j) {
          while (arr[i] < pivot) {
              i++;
          }
          while (arr[j] > pivot) {
              j--;
          }
          if (i <= j) {
          //if (comparationColor(arr[j], arr[i])) {
              swap(arr, i, j);
              i++;
              j--;
          }
      }
      return i;
   }
   
   // алгоритм быстрой сортировки
   function quickSrt(arr, left, right) {
      var index;
      if (arr.length > 1) {
          left = typeof left != "number" ? 0 : left;
          right = typeof right != "number" ? arr.length - 1 : right;
          index = partition(arr, left, right);
          if (left < index - 1) {
              quickSrt(arr, left, index - 1);
          }
          if (index < right) {
              quickSrt(arr, index, right);
          }
      }
      return arr;
   }    

    quickSrt(arr);

  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = (sortKind === 'bubbleSort') ? 'quickSort': 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = "sorting..."
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  let kindInput = document.querySelector('.kind__input').value;
  let colorInput = document.querySelector('.color__input').value;
  let weightInput = document.querySelector('.weight__input').value;

  if (kindInput && colorInput && weightInput){
    fruits.push({
      "kind":   kindInput, 
      "color":  colorInput, 
      "weight": weightInput, 
      "eng": "white"});
      document.querySelector('.kind__input').value = "";
      document.querySelector('.color__input').value = "";
      document.querySelector('.weight__input').value = "";
    display();
  } else alert("Achtung! not every fields are filled");
});
