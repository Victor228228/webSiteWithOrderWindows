const modals = () => {
   function bindModal(triggerOpen, modalWindow, triggerClose) {
       const buttonsOpen = document.querySelectorAll(triggerOpen);
       const modal = document.querySelector(modalWindow);
       const buttonClose = document.querySelector(triggerClose);

       const allModal = document.querySelectorAll("[data-modal]"); //находим все модальные окна, для того,что бы их можно было закрыть все разом

       buttonsOpen.forEach(function (item) {
          item.addEventListener("click", function (event) {
              event.preventDefault();

              allModal.forEach(function (item) { //закрываем все модальные окна если они открыты
                 item.style.display = "none";
              });

              modal.style.display = "block";
              document.body.style.overflow = "hidden"; // отключаем прокрутку станицы
          });
       });
       buttonClose.addEventListener("click", function (event) {
           allModal.forEach(function (item) { //закрываем все модальные окна если они открыты
               item.style.display = "none";
           });

           modal.style.display = "none";
           document.body.style.overflow = "";
       });
       modal.addEventListener("click", function (event) {
          if (event.target.classList.contains("popup_engineer") || event.target.classList.contains("popup") || event.target.classList.contains("popup_calc")) { // проверяем наличие класса popup_engineer или popup, если он есть, то клик призошел по объщей подложке модальных окон и тогда закрываем модальное окно
              allModal.forEach(function (item) { //закрываем все модальные окна если они открыты
                  item.style.display = "none";
              });

              modal.style.display = "none";
              document.body.style.overflow = "";
          }
       });
   }
    bindModal(".popup_engineer_btn", ".popup_engineer", ".popup_engineer .popup_close");
    bindModal(".phone_link", ".popup", ".popup .popup_close");

    //модальные окна в калькуляторе расчета стоимости
    bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
    bindModal(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close");
    bindModal(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close");

    function showModalByTime (modal ,time) {
        setTimeout(function () {
            document.querySelector(modal).style.display = "block";
            document.body.style.overflow = "hidden";
        }, time)
    }
    showModalByTime(".popup", 30000);
}
export default modals;
