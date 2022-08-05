import "./slider"; // ипортируем слайдер

import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from "./modules/forms";
import informationFromModal from "./modules/informationFromModal";
import timer from "./modules/timer";
import images from "./modules/images";

window.addEventListener("DOMContentLoaded", () => {
   let deadLine = "2023-01-01"
   let objectWithInformationFromModal = { //создали объект в который будем записывать информацию из модльных окон(что выбрал пользователь)

   };
   informationFromModal(objectWithInformationFromModal);

   modals();
   tabs(".glazing_block > a", ".glazing_content", "active");
   tabs(".no_click", ".decoration_content > div > div", "after_click");
   tabs(".balcon_icons_img ", ".big_img > img", "do_image_more", "inline-block");

   forms(objectWithInformationFromModal);
   timer(".container1", deadLine);
   images();
});
