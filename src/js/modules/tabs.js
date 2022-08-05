const tabs = (buttonSelector, contentSelector, activeClass, display = "block") => { //передаем значение display = "block" по умолчанию
    const button = document.querySelectorAll(buttonSelector);
    const content = document.querySelectorAll(contentSelector);


    function hideTabContent () {
        content.forEach(function (item) {
           item.style.display = "none";
        });
        button.forEach(function (item) {
            item.classList.remove(activeClass);
        });
    }
    function showTabContent (i = 0) {
        content[i].style.display = display;
        button[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    button.forEach(function (item, index) {
       item.addEventListener("click", function (event) {
           hideTabContent();
           showTabContent(index);
       });
    });
}

export default tabs;
