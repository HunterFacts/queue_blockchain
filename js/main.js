$(document).ready(function(){
    M.AutoInit();
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

function createCustomModal(header, fillModalContent, isClose = true) {
    let string = '<div id="custom-modal" class="modal">'
        +'<div class="modal-content">'
            +'<h4>'+header+'</h4>'
            +'<p class="custom-modal-content"></p>'
        +'</div>'
        +'<div class="modal-footer">'
            +function (){
                let result = isClose == true ? '<a class="modal-close waves-effect waves-green btn-flat">Закрыть</a>' : '';
                return result;
            }()
        +'</div>'
    +'</div>';
    $(".custom-modals").html(string);
    let modalobject =  $('#custom-modal');
    modalobject.modal();
    modalobject.modal("open");
    fillModalContent();
}

function fillModalContentParameters () {
    let string = '<div class="input-field col s12">'
        +'<select onclick="renderParametr()" id="selectParametrs">'
            +'<option value="" disabled selected>Не выбрано</option>'
            +'<option value="1">Логическое (да/нет)</option>'
            +'<option value="2">Текстовое</option>'
            +'<option value="3">Числовое</option>'
            +'<option value="4">Дата</option>'
        +'</select>'
        +'<label>Выберите тип параметра</label>'
    +'</div>'
    +'<a onclick="renderParameter()" class="waves-effect btn">Выбрать</a>';
    $('.custom-modal-content').html(string);
    $('select').formSelect();
}

function renderParameter(){
    let valueParametr = $('#selectParametrs').val(),
    rows = {
        nameParameter: "",
        sort: {
            bool: false,
            disabled: false
        },
        prioritySort: {
            disabled: true
        },
        sortOrder: {
            bool: false,
            disabled: true
        },
        obligatory: {
            bool: false,
            disabled: false
        },
        hidden: {
            bool: false,
            disabled: false
        },
        customParameter: "",
        typeParameter: ""
    };
    switch(Number(valueParametr)) {
        case 1:
            rows.typeParameter = "bool";
            rows.customParameter ='<p>'
                +'<label>'
                    +'<input type="checkbox" />'
                    +'<span>Активен?</span>'
                +'</label>'
            +'</p>';
            break;
        case 2:
            rows.typeParameter = "string";
            rows.sort.disabled = true;
            break;
        case 3:
            rows.typeParameter = "number";
            break;
        case 4:
            rows.typeParameter = "date";
            rows.customParameter ='<p>'
                +'<label>'
                    +'<input type="checkbox" />'
                    +'<span>Текущая дата?</span>'
                +'</label>'
            +'</p>';
            break;
        default:    
            $('#custom-modal').modal("close");  
            return;      
            break;
    }
    let rowsId = function(){return $(".parameters").length + 1}(),
    tableRowHtml = '<tr data-id="'+rowsId+'" class="parameters">'
        +'<td>'             
            +'<div class="input-field">'
                +'<input type="text" placeholder="Не указано" class="parameterName">'
            +'</div>'
        +'</td>'
        +'<td>'
            +'<p>'
                +'<label>'
                    +'<input class="parameterSort" data-id="'+rowsId+'" type="checkbox" '+function(){return rows.sort.disabled == true ? 'disabled' : ''}()+' />'
                    +'<span></span>'
                +'</label>'
            +'</p>'
        +'</td>'
        +'<td>'
            +'<div class="input-field">'
                +'<input data-id="'+rowsId+'" type="number" '+function(){return rows.prioritySort.disabled == true ? 'disabled' : ''}()+' value="'
                + function(){return $(".parameters[disabled='']").length + 1}()             
                +'" class="parameterPrioritySort">'
            +'</div>'
        +'</td>'
        +'<td>'
            +'<div class="switch">'
                +'<label>'
                    +'Возрастание'
                    +'<input data-id="'+rowsId+'" class="parameterSortOrder" '+function(){return rows.sortOrder.disabled == true ? 'disabled' : ''}()+' type="checkbox">'
                    +'<span class="lever"></span>'
                    +'Убывание'
                +'</label>'
            +'</div>'
        +'</td>'
        +'<td>'
            +'<p>'
                +'<label>'
                    +'<input data-id="'+rowsId+'" class="parameterObligatory" type="checkbox" '+function(){return rows.obligatory.disabled == true ? 'disabled' : ''}()+' />'
                    +'<span></span>'
                +'</label>'
            +'</p>'
        +'</td>'
        +'<td>'
            +'<p>'
                +'<label>'
                    +'<input data-id="'+rowsId+'" class="parameterHidden" type="checkbox" '+function(){return rows.hidden.disabled == true ? 'disabled' : ''}()+' />'
                    +'<span></span>'
                +'</label>'
            +'</p>'        
        +'</td>'
        +'<td data-id="'+rowsId+'" class="customTD">'
            +rows.customParameter
        +'</td>'
        +'<td style="display: none;" class="parameterType">'+rows.typeParameter+'</td>'
    +'</tr>';
    $('#parametersTable>tbody').append(tableRowHtml);
    $('#custom-modal').modal("close");
}

function logicParameterDisabled (){

}