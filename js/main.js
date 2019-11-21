$(document).ready(function(){
    $('#mainNav li .main-link').click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(600, redirectPage);
    });
    function redirectPage() {
        window.location = linkLocation;
    }
    let preloaderChecker = true;    
    window.onload = function() {
        if (preloaderChecker){
            $('.preloader').fadeOut();
            preloaderChecker = false;
        }      
    };
    $('.dropdown-trigger').dropdown();
    window.setTimeout(function (){
        if (preloaderChecker){
            $('.preloader').fadeOut();
            preloaderChecker = false;
        }
    }, 1000);
});

function verificate (str){
    if (str != '' && str != null && str != undefined){
        return true;
    }
    return false;
}

function auth () {
    let login = $("#loginUser").val(),
    password = $("#passUser").val();
    if (verificate(login) && verificate(password)){
        M.toast({html: 'Успешно'});
    }
    else {
        M.toast({html: 'Заполните поля'});
    }
}

function tableSearch() {
    var phrase = document.getElementById('searchQueue');
    var table = document.getElementById('queueTable');
    var regPhrase = new RegExp(phrase.value, 'i');
    var flag = false;
    for (var i = 1; i < table.rows.length; i++) {
        flag = false;
        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }
    }
}