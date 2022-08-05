const informationFromModal = (objectWithInformationFromModal) => {
    const windowsForm = document.querySelectorAll(".balcon_icons_img");
    const windowWidth = document.querySelectorAll("#width");
    const windowHeight = document.querySelectorAll("#height");
    const windowType = document.querySelectorAll("#view_type");
    const windowProfile = document.querySelectorAll(".checkbox");

    function checkInputs (inputs) {
        inputs.forEach(function (item) {
           item.addEventListener("input", function (event) {
               item.value = item.value.replace(/\D/, "");
           });
        });
    }
    checkInputs(windowWidth);
    checkInputs(windowHeight);

    function addToObjectElements (event, element, property) {
        element.forEach(function (item, index) { //перебираем все формы окон и на которой произошло событие мы ее индекс добавляем в объект с информацией
            item.addEventListener(event, function (event) {
                switch (item.nodeName) { //проверяем какая нода у item
                    case "SPAN" : //если спан, то это выбор типа окна
                        objectWithInformationFromModal[property] = index; // в объекте ObjectInformationFromModal создаем ключ со значением из index
                        break;
                    case "INPUT":
                        if (item.getAttribute("type") === "checkbox") { //если атрибут инпута (инпут type равен checkbox)
                            if (index === 0) { // проверяем на каком чекбоксе из псевдомассива произошло событие(их всего два), если на первом, то холодное окно,если на втором ,то теплое
                                objectWithInformationFromModal[property] = "холодное";
                            } else {
                                objectWithInformationFromModal[property] = "теплое";
                            }
                            element.forEach(function (item, j){ //перебираем все чекбоксы(раз дошло сюда через все условия, значит element это чекбоксы). для того ,что бы можно было выбирать лишь один чекбокс
                               item.checked = false; //устанавливаем все чекбоксы в значение фолс.
                               if (j === index) { //если индекс перебранного сейчас чекбокса совпадает с индексом чекбокса по которому произошло событие и который мы перебрали раньше, то устанавливаем ему тру
                                   item.checked = true;
                               }
                            });
                        } else {
                            objectWithInformationFromModal[property] = item.value;
                        }
                        break;
                    case "SELECT":
                        objectWithInformationFromModal[property] = item.value;
                        break;
                }
                console.log(objectWithInformationFromModal);
            });
        });
    }
    addToObjectElements("click", windowsForm, "form");
    addToObjectElements("input", windowWidth, "width");
    addToObjectElements("input", windowHeight, "height");
    addToObjectElements("change", windowType, "type");
    addToObjectElements("change", windowProfile, "profile");

/*

    windowsForm.forEach(function (item, index) { //перебираем все формы окон и на которой произошло событие мы ее индекс добавляем в объект с информацией
       item.addEventListener("click", function (event) {
           objectWithInformationFromModal.form = index; // в объекте ObjectInformationFromModal создаем ключ form со значением из index
       });
    });
    windowWidth.addEventListener("input", function (event) {
        windowWidth.value = windowWidth.value.replace(/\D/, "");
        objectWithInformationFromModal.width = windowWidth.value;
    });
    windowHeight.addEventListener("input", function (event) {
        windowHeight.value = windowHeight.value.replace(/\D/, "");
        objectWithInformationFromModal.height = windowHeight.value;
    });
*/


};

export default informationFromModal;
