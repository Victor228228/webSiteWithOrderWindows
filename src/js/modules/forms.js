const forms = (objectWithInformationFromModal) => {
    const form = document.querySelectorAll("form"); //получаем все формы с наешго сайта
    const input = document.querySelectorAll("input"); //получаем все инпуты с наешго сайта, что бы вдальнейшем их очищать при отправки формы на сервер
    const phoneInputs = document.querySelectorAll("input[name='user_phone']"); //находим все инпуты с атрибутом 'user_phone', что бы сделать ввод только чисел

    phoneInputs.forEach(function (item) {
       item.addEventListener("input", function (event) {
           item.value = item.value.replace(/\D/, ""); //при помощи регулярных выражений удаляем все символы которые вводяться, если они не числа    /\D/, ""
       });
    });

    const message = { //объект с сообщениями для пользователя
      loading: "Загрузка",
      success: "Спасибо! Скоро с вами свяжемся",
      failure: "Что-то пошло не так..."
    };
    const postData = async (url, data) => { //функция для отправки данных на сервер
        document.querySelector(".status").textContent = message.loading; //находим наш созданный див со статусом по добавленному нами классу status и меняем в нем текс статуса
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    };
    const clearInputs = function () {
        input.forEach(function (item) {
           item.value = "";
        });
    }

    form.forEach(function (item) {
       item.addEventListener("submit", function (event) { //обработчик submit сработает, если была нажата кнопка отправить в форме
          event.preventDefault();
          let statusMessage = document.createElement("div"); // Создаем блок в который поместим сообщение для пользователя
           statusMessage.classList.add("status"); //добавляем созданому блоку заготовленный класс со стилями
           item.appendChild(statusMessage); // добавляем блок в конец формы в которой произошло событие

           const formData = new FormData(item); // объект FormData соберет информацию из всех инпутов в форме
           if (item.getAttribute("data-calc") === "end") { //если у формы есть дата атрибут END, то мы берем из нее информацию,которую добавили в объект objectWithInformationFromModal и добавляем все в formData
               for (let key in objectWithInformationFromModal) {
                   formData.append(key, objectWithInformationFromModal[key]);
               }
           }
           postData("assets/server.php", formData)
               .then(res => {
                   console.log(res); //выводим в консоль то ,что пришло из функции postData res.text(), то что ответил нам сервер
                   statusMessage.textContent = message.success;
               })
               .catch(() => {
                   statusMessage.textContent = message.failure;
               })
               .finally(() => {
                   clearInputs();
                   setTimeout(function () {
                       statusMessage.remove();
                   }, 3000);
               });
       });
    });
}

export default forms;
