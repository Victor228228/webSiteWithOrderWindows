const images = () => {
    const imgBlock = document.createElement("div"); //создали блок в котором будет картинка
    const bigImg = document.createElement("img"); //создаем картинку, которую затем поместим в блок imgBlock
    const wrapperAllImg = document.querySelector(".works"); //объщая обертка

    imgBlock.classList.add("popup_img");
    imgBlock.style.display = "none"; //пока что ставим в ноне, что бы не отображать.  а потом в флекс, когда произойдет клик
    imgBlock.style.justifyContent = "center";
    imgBlock.style.alignItems = "center";

    wrapperAllImg.appendChild(imgBlock);
    imgBlock.appendChild(bigImg);

    wrapperAllImg.addEventListener("click", function (event) {
       event.preventDefault();
       const target = event.target;

       if (target && target.classList.contains("preview")) {
           console.log("yes img");
           imgBlock.style.display = "flex";
           const srcForBigImg = target.parentNode.getAttribute("href"); //поднимаемся от картинку выше к ее родителю и берем у него (атрибут) путь до бльшой картинки
           bigImg.src = srcForBigImg;

           document.body.style.overflow = "hidden";
           imgBlock.classList.add("faded"); //анимация
       }
       if (target && target.classList.contains("popup_img")) { //просто target для проверки поддерживает ли элемент по которому произошло событие событие click //отслеживаем клик по подложке, что бы закрыть окно с картинкой
           imgBlock.style.display = "none";
           document.body.style.overflow = "";
           imgBlock.classList.remove("faded");
       }
    });
}
export default images;
