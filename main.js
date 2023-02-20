(() => {
    // создаем новый массив чисел-пар, который будем перемещивать
    let numbersArr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    // создаем пустой массив, в котором будет перемешанный массив чисел
    let mixedNumbersArr = [];


    // создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.classList.add('title');
        appTitle.id = 'title';
        appTitle.innerHTML = title;
        return appTitle;
    }

    // const CONTAINER = document.createElement('div');
    // CONTAINER.classList.add('container');
    // CONTAINER.id = 'couples-game';

    // return {
    //     CONTAINER
    // }


    // создаем и возвращаем карточки-кнопки с номерами
    function createCards(number) {

        const CARD = document.createElement('li');
        const BUTTON = document.createElement('button');

        CARD.classList.add('list-cards__item');
        BUTTON.classList.add('btn-cards', 'btn-reset');
        BUTTON.textContent = number;
        BUTTON.dataset.id = number;

        BUTTON.addEventListener('click', () => {
          BUTTON.disabled = true;
        });

        CARD.append(BUTTON)
    
        return {
            CARD,
            BUTTON
        }
    }


    // создаем и возвращаем элементы финального экрана
    function createGameOverScreenItems() {
        const ENDSCREEN = document.createElement('div');
        const ENDTEXT = document.createElement('p');
        const ENDBUTTONLINK = document.createElement('a');
        
        ENDSCREEN.classList.add('end-screen', 'end-screen-hidden');
        ENDTEXT.classList.add('end-text');
        ENDBUTTONLINK.classList.add('end-button', 'btn-reset');
        ENDSCREEN.id = 'end-screen';
        ENDTEXT.textContent = 'Игра окончена!';
        ENDBUTTONLINK.textContent = 'Сыграть снова';
        ENDBUTTONLINK.href = '#index';

        // отслеживание события click при нажатии на кнопку в конце игры
        ENDBUTTONLINK.addEventListener('click', () => {      
            window.location.reload();        
        });

        ENDSCREEN.append(ENDTEXT, ENDBUTTONLINK)
    
        return {
            ENDSCREEN,
            ENDTEXT,
            ENDBUTTONLINK
        }
    }


    //функция, которая будет перемещивать изначальный массив цифр
    function shuffle(array) {
        let currentIndex = array.length;
            while(currentIndex !=0) {
            let randomIndex = Math.floor(Math.random()*array.length);
            currentIndex -=1;
            let temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex]=temp;  
            }
        return array;
    }

    // создаем и возвращаем список, в котором будут расположены все "карточки"
    let couplesList = document.createElement('ul');
    couplesList.classList.add('list-cards');
    couplesList.id = 'list-cards';

    // создаем и возвращаем игровое поле с элементами
    function createPlayingField() {
        
        // перемешиваем массив цифр(16) в случайном порядке
        mixedNumbersArr = shuffle(numbersArr);
        // console.log(mixedNumbersArr);

        // помещаем номер из перемещанного массива на "карточку"
        function createCardNumber(obj) {
            for (let i = 0; i < obj.length; i++) {
                // создаем новую карту с номером из массива
                let todoCard = createCards(mixedNumbersArr[i]);
                // добавляем в список новые карты
                couplesList.append(todoCard.CARD);
            }
        }
        createCardNumber(mixedNumbersArr);

        return {
            couplesList
        };
    }
    
    
    // собираем всю игру и выводим на экран
    function createCoupleGame(container, title) {
        let todoAppTitle = createAppTitle(title);
        let gamePlayingField = createPlayingField();
        let gameOver = createGameOverScreenItems();

        container.append(todoAppTitle);
        container.append(gamePlayingField.couplesList);
        container.append(gameOver.ENDSCREEN);


        // совпадающие карточки по номерам остаются открытыми
        function chekingMatchingCards() {
            //пустой массив для добавления объектов после click по "карточкам"
            let = couplesCards = [];
            
            // обработка события click при "игре"
            couplesList.addEventListener('click', (e) => {
                // console.log(e.target.dataset.id); 

                // добавляем активный класс именно к выбранному элементу, по которому был клик 
                function chooseElementButton () {
                let activeCard = e.target.closest('button'); 
                // console.log(activeCard);
                if (!activeCard) return; 
                if (!couplesList.contains(activeCard)) return;
                
                activeCard.classList.add('btn-cards-active'); // добавить класс новому activeCard
                activeCard.disabled = true;
                };
                chooseElementButton ();              
                
                // создаем элементы, которые будут целью первого и второго click игрока
                let element1 = couplesList.querySelector(`[data-target = "${couplesCards[0]}"]`);
                console.log(element1);
                let element2 = couplesList.querySelector(`[data-target = "${couplesCards[1]}"]`);
                console.log(element2);
                

                // сравнение объектов в массиве couplesCards по значениям, несовпадающие
                if (couplesCards.length == 2 && couplesCards[0] !== couplesCards[1]) {
                    element1.classList.remove('btn-cards-active');
                    element2.classList.remove('btn-cards-active');
                    element1.disabled = false;
                    element2.disabled = false;
                } 

                if (couplesCards.length == 2) {                  
                    // setTimeout(turnCards, 2000);
                        // element1.classList.add('btn-cards-active');
                        // // element1.classList.add('btn-cards-wrong');
                        // element2.classList.add('btn-cards-active');

                    couplesList.querySelectorAll('[data-target]').forEach((e) => {
                        delete e.dataset.target
                    });

                    couplesCards = []
                        // нужно! обнулить массив после каждого if
                }
                        
                                    
                // массив, в который добавляется 2 объекта, значение которых равно id элемента при click
                e.target.dataset.id ? e.target.dataset.target = e.target.dataset.id : null
                e.target.dataset.id ? couplesCards.push(e.target.dataset.id) : null;
                console.log(couplesCards);


                // сравнение объектов в массиве couplesCards по значениям, совпадающие
                if (couplesCards[0] === couplesCards[1]) {

                    couplesList.querySelectorAll('[data-target]').forEach((e) => {
                        e.classList.add('btn-cards-disabled');

                        // функция, вызывающая "финальный экран" - игра окончена, когда все карточки "перевернуты"
                        function createGameOverScreen(){
                            // когда длина всех кнопок с классом disabled будет равна длинне массива
                            if (document.querySelectorAll('.btn-cards-disabled').length === mixedNumbersArr.length) {
                                screenEnd.classList.remove('end-screen-hidden');
                                body.classList.add('body-style__game-over');

                                // удалить html элементы, оставить только финальный экран
                                couplesList.innerHTML = '';
                                title.innerHTML = '';
                                // screenEnd.innerHTML = '';
                            }
                        }
                        createGameOverScreen();
                    });
                }
            });     


            // элементы для удаления в конце игры
            let body = document.querySelector('body');
            let screenEnd = document.getElementById('end-screen');
            console.log(screenEnd);

            // const myNode = document.getElementById('couples-game');
            // const myNode1 = document.getElementById('list-cards');
            // console.log(myNode1);
            const title = document.getElementById('title');

        }
        chekingMatchingCards();
    }
    
    window.createCoupleGame = createCoupleGame;

})();



