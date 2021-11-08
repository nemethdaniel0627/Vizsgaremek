
var CurrentlyIndex = 0;
var table =  "<tr style='background-color: #2196f3BB'><th></th><th id = 'table_name'><a href = '#' onclick = 'OrderBy(name)'>Név </a></th><th id = 'table_class'><a href = '#' onclick = 'OrderBy(class)'>Osztály &#8205 &#8205 &#8205</a></th><th>Befizetve</th><th>Befizetett összeg</th><th>Lemondott napok</th></tr>";
var data = "";
var DataIndex = 0;
var DarkModeOn = true;
var CbIndexes = [];
var Filter = ["name", "user", "email", "paid", "days"];
var CheckedCheckBox = [];
function PageLoaded()
{
    document.querySelector("#table_thead").innerHTML = TableHeadLoader();



    this.data = ["Habsburg.Maria.Terezia;Password1122;Habsburg Mária Terézia;OM220;12.A;hmt@email.com;true;15000 Ft;2021-09-27#2021-09-26#2021-09-25"];
    for (let index = 0; index < 5; index++) {
        var zindex = Math.floor(Math.random() * 4) + 9;
        if (Math.floor(Math.random() * 100) % 3) {
            
            this.data.push("Habsburg.Maria.Terezia;Password1122;Habsburg Mária Terézia;OM220;"+ zindex +".A;habsburg.maria.terezia@students.jedlik.eu;false;0 Ft;");  
        }
        this.data.push("Habsburg.Maria.Terezia;Password1122;Habsburg Mária Terézia;OM220;"+ zindex +".A;hmt@email.com;true;15000 Ft;2021-09-27#2021-09-26#2021-09-25");    
        DataIndex = index;
    }
    document.querySelector("#table_tbody").innerHTML = TableLoader(this.data);

    if (sessionStorage.getItem("DarkModeOn") == "true") {
        document.getElementById("Dark_check").checked = true;
        DarkModeStyleChange();
    }
}

function DarkModeStyleChange(){
    var css;
    var DarkModeIcon;
    
    if (DarkModeOn) {
        css = "./Styles/AdminDark.css";
        DarkModeIcon = "./Images/ToDark.png";
        DarkModeOn = false;
        sessionStorage.setItem("DarkModeOn", "true");
    }else{
        css = "./Styles/AdminDefault.css";
        DarkModeIcon = "./Images/ToDefault.png";
        DarkModeOn = true;
        sessionStorage.setItem("DarkModeOn", "false");
    }

    var oldLink = document.getElementsByTagName("link").item(1);
    var newLink = document.createElement("link");
    newLink.setAttribute("rel", "stylesheet");
    newLink.setAttribute("type", "text/css");
    newLink.setAttribute("href", css);

    document.getElementsByTagName("head").item(0).replaceChild(newLink, oldLink);
    document.getElementById("DarkMode_img").src = DarkModeIcon;
}

function SelectRow(element)
{
    if (element.checked) {
        document.getElementById('row_' + element.id.toString().split('_')[1]).style.backgroundColor = "#807b7a77";
        CheckedCheckBox.push(element.id.toString().split('_')[1]);
    }else
    {
        document.getElementById('row_' + element.id.toString().split('_')[1]).style.backgroundColor = "";
        CheckedCheckBox.splice(CheckedCheckBox.indexOf(element.id.toString().split('_')[1]),1);
    }
    
}

function Register()
{
    document.getElementsByClassName("button")[1].style.display = "none";
    document.getElementsByClassName("button")[2].style.display = "block";

    for (const button of document.getElementsByTagName("button")) {
        button.disabled = true;
    }

    document.getElementById("NewOne_btn").disabled = false;
    document.getElementById("Upload_btn").disabled = false;
    document.getElementById("RegisterCancel_btn").disabled = false;
}

function Modification()
{
    document.getElementById("Modification_btn").style.display = "none";
    document.getElementsByClassName("button")[2].style.display = "block";
}

function Search()
{
    document.getElementById("Search_btn").style.display = "none";
    document.getElementsByClassName("button")[0].style.display = "block";
}

function Cancel(which)
{
    for (const button of document.getElementsByTagName("button")) {
        button.disabled = false;
    }

    switch (which) {
        case 0:
            document.getElementById("Search_btn").style.display = "block";
            break;
        case 1:
            document.getElementById("Filter_btn").style.display = "block";
            break;
        case 2:
            document.getElementById("Modification_btn").style.display = "block";
            document.getElementsByClassName("button")[2].style.display = "none";
            break;
        default:
            break;
    }
    document.getElementsByClassName("button")[which].style.display = "none";
    document.getElementsByClassName("custom-file-upload")[0].innerHTML = "<input type = 'file' id = 'file' onchange = UploadFile()><img src='./Images/File_icon.png' alt='Fájl' style='width: 20px;'> Fájl kiválasztása"
}


var file;
function UploadFile()
{
    file = document.getElementById('file').files[0];

    document.getElementsByClassName("custom-file-upload")[0].innerHTML = TextAbstract(document.getElementById('file').value.toString().split('\\')[document.getElementById('file').value.toString().split('\\').length-1],20);
}

document.getElementById("Upload_btn").addEventListener("click", function() {
    try {
        var reader = new FileReader();
        reader.addEventListener('load', function() {
            NewsFromFile(this.result);
        });
        reader.readAsText(file);
    } catch (error) {
        alert("Nincs fájl kiválasztva!");
    }
  
});

function NewsFromFile(datarow){
    var index = 0;
    var Datas = [];
    for (const row of datarow.split('\n')) {
        if(index == 0)
        {
            index++;
        }
        else{
            var datarows = "";
            for (const datas of row.split(';')) {
                datarows+=datas + ";";
            }
            Datas.push(datarows);
        }
    }
    for (const row of data) {
        Datas.push(row);
    }
    this.data = Datas;
    document.querySelector("#table_tbody").innerHTML = TableLoader(Datas);
}

function TextAbstract(text,length)
{
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.toString().substring(0,length-3);
    return text + "...";
}

function NewOne()
{
    for (const button of document.getElementsByTagName("button")) {
        button.disabled = true;
    }
    document.getElementById("Modification_btn").style.display = "block";
    document.getElementsByClassName("button")[1].style.display = "none";
    

    var RegisterRow = [];
    RegisterRow.push("");
    RegisterRow.push("<input id = 'new_name' type = 'text' placeholder = 'Név'  style = 'width: 220px'>");
    RegisterRow.push("<input id = 'new_class' type = 'text' placeholder = 'Osztály'  style = 'width: 90px'>");
    RegisterRow.push("<input id = 'new_class' type = 'text' placeholder = 'Felhasználónév'  style = 'width: 220px'>");
    RegisterRow.push("<input id = 'new_email' type = 'email' placeholder = 'E-mail'  style = 'width: 220px'>");
    RegisterRow.push("<input type = 'checkbox' id = 'new_cb' class = 'form-check-input '/>");
    RegisterRow.push("<input type = 'button'  id = 'new_Save' value = 'Mentés'  style = 'width: 150px'   class = 'btn btn-success' onclick = 'RegistrationSave()'>");
    RegisterRow.push("<input type = 'button' value = 'Mégsem' id = 'new_Cancel' style = 'width: 150px'  class = 'btn btn-danger' onclick = 'RegistrationCancel()'>");
    var row = document.getElementById("Downloadable_table").insertRow(1);
    for (let index = 0; index < RegisterRow.length; index++) {
        row.insertCell(index).innerHTML = RegisterRow[index];  
    }
    
}

function Registration()
{
    document.getElementById('Registration').style.display = "block";
}

function RegistrationSave()
{
    CbIndexes = [];
    var RegisterRow = "";
    var datarow = [];
    var index = 0;

    var _name = "";
    for (const letter of document.getElementById('NewName').value) {
        var let = letter.toLowerCase();
        if(index == 0){
            var let = letter.toUpperCase();
            index++;
        }
        if(letter == ' '){index = 0;}
        _name += let;
    }

    var _schoolId = "OM220";

    var _class = document.getElementById('NewClass').value.toString().toUpperCase();

    var _email = document.getElementById('NewEmail').value.toString().toLowerCase();

    d = new Date();
    var _pass = "Jedlik" + d.getFullYear();

    var _username = document.getElementById('NewUsername').value;

    var _paid = document.getElementById('NewPaid').checked;
    
    
    if(_name.trim() == "" || _class.trim() == "" || _email.trim() == "" || _username.trim() == "" || !_email.toString().includes('@'))
    {
        alert("Nem megfelelők a regisztáció paraméterek!");
    }
    else
    {
        datarow.push(`${_username};${_pass};${_name};${_schoolId};${_class};${_email};${_paid};0;`);

        for (const item of data) {
            datarow.push(item);
        }
        this.data = datarow;
        document.querySelector("#table_tbody").innerHTML = TableLoader(datarow);
    
        for (const button of document.getElementsByTagName("button")) {
            button.disabled = false;
        }
        RegistrationCancel();
    }

    

}

function TableHeadLoader()
{
    var datapertable = "<tr id = 'first_tr'> <th></th>";
    
    if (this.Filter.includes('name')) {
        datapertable += "<th id = 'table_name' colspan='2'><a href = '#' onclick = 'OrderBy(\"name\")' id = 'a-name'>Név </a> - <a href = '#' onclick = 'OrderBy(\"class\")' id = 'a-class'>Osztály &#8205 &#8205 &#8205</a></th>";
    }

    if (this.Filter.includes('user')) {
        datapertable += "<th>Felhasználónév</th>";
    }
    
    if (this.Filter.includes('email')) {
        datapertable += "<th>E-mail</th>";
    }

    if (this.Filter.includes('paid')) {
        datapertable += "<th colspan='2'> <a href = '#' onclick = 'OrderBy(\"paid\")' id = 'a-paid'>Befizetve &#8205 &#8205</a> - <a href = '#' onclick = 'OrderBy(\"value\")' id = 'a-value'>&#8205 &#8205 Összeg &#8205 &#8205</a></th>";
    }

    if (this.Filter.includes('days')) {
        datapertable += "<th>Lemondott nap(ok)</th>";
    }

    datapertable += "<tr>";
    return datapertable;
}

function TableLoader(data)
{
    var datapertable= "";

    for (let index = 0; index < data.length; index++) {
        datapertable += "<tr id = 'row_" + index + "'><td><input type = 'checkbox' id = cb_"+ index +" class = 'form-check-input' onchange= 'SelectRow(this)'></td>";
        CbIndexes.push(index);
        var nameindex = 0;
        const element = data[index].split(';');
        if (this.Filter.includes('name')) {
            datapertable += "<td> " + element[2] + "</td>";
            datapertable += "<td> " + element[4] + "</td>";
        }

        if (this.Filter.includes('user')) {
            datapertable += "<td> " + element[0] + "</td>";
        }
        
        if (this.Filter.includes('email')) {
            if(element[5].length > 25)
            {
                datapertable += "<td> " + element[5].split('@')[0] + '<br> @' + element[5].split('@')[1] + "</td>";
            }else
            {
                datapertable += "<td> " + element[5].split('@')[0] + '@' + element[5].split('@')[1] + "</td>";
            }
        }

        if (this.Filter.includes('paid')) {
            if (element[6].toLowerCase() == "true" || element[6].toLowerCase() == 'igen') {
                datapertable += "<td> <img class = 'PaidImage' src='./Images/Correct_icon.png' alt='Igen'> </td>";
            }else if(element[6].toLowerCase() == "false" || element[6].toLowerCase() == 'nem')
            {
                datapertable += "<td> <img class = 'PaidImage' src='./Images/Incorrect_icon.png' alt='Nem'> </td>";
            }
    
            datapertable += "<td> " + element[7] + "</td>";
        }

        if (this.Filter.includes('days')) {
            if(element[8] != "" && element[8] != null && element[8] != "Nincs")
            {
                datapertable += "<td> <select class = 'form-select hasDays' onchange = 'DataStay()'>";
                if(element[8].split('#')[0] != "Nap(ok):"){datapertable += "<option>" + "Nap(ok):" + "</option>" ;}
                
                for (const item of element[8].split('#')) {
                    
                    datapertable += "<option class = 'DaysOption'>" + item + "</option>";
                }
                datapertable += "</select></td>";
            }else
            {
                datapertable += "<td><select class = 'form-select' disabled><option>Nincs</option></select></td>";
            }
        }
        

        

        

        

        
        datapertable += "</tr>";
        CurrentlyIndex = index;
    }
    return datapertable;
}

var index = [0,0,0,0];
function OrderBy(type)
{
    switch (type) {
        case "name":
            switch(index[0])
            {
                case 0:
                    document.getElementById("a-" + type).innerHTML = "Név &#8681";
                    index[0]++;
                    break;
                case 1:
                    document.getElementById("a-" + type).innerHTML = "Név &#8679";
                    index[0]++;
                    break;
                case 2: 
                document.getElementById("a-" + type).innerHTML = "Név ";
                    index[0] = 0;
                    break;
            }
            index[1] = 0;
            index[2] = 0;
            index[3] = 0;
            document.getElementById("a-class").innerHTML = "Osztály &#8205 &#8205 &#8205 ";
            document.getElementById("a-paid").innerHTML = "Befizetve &#8205 &#8205 ";
            document.getElementById("a-value").innerHTML = "&#8205 &#8205 Összeg &#8205 &#8205";
            break;
            
        case "class":
            switch(index[1])
            {
                case 0:
                    document.getElementById("a-" + type).innerHTML = "Osztály &#8681";
                    index[1]++;
                    break;
                case 1:
                    document.getElementById("a-" + type).innerHTML = "Osztály &#8679";
                    index[1]++;
                    break;
                case 2: 
                document.getElementById("a-" + type).innerHTML = "Osztály &#8205 &#8205 &#8205";
                    index[1] = 0;
                    break;
            }
            index[0] = 0;
            index[2] = 0;
            index[3] = 0;
            document.getElementById("a-name").innerHTML = "Név ";
            document.getElementById("a-paid").innerHTML = "Befizetve &#8205 &#8205 ";
            document.getElementById("a-value").innerHTML = "&#8205 &#8205 Összeg &#8205 &#8205";
            break;
         case "paid":
            switch(index[2])
            {
                case 0:
                    document.getElementById("a-" + type).innerHTML = "Befizetve &#8681";
                    index[2]++;
                    break;
                case 1:
                    document.getElementById("a-" + type).innerHTML = "Befizetve &#8679";
                    index[2]++;
                    break;
                case 2: 
                document.getElementById("a-" + type).innerHTML = "Befizetve &#8205 &#8205";
                    index[2] = 0;
                    break;
            }
            index[0] = 0;
            index[1] = 0;
            index[3] = 0;
            document.getElementById("a-name").innerHTML = "Név ";
            document.getElementById("a-class").innerHTML = "Osztály &#8205 &#8205 &#8205 ";
            document.getElementById("a-value").innerHTML = "&#8205 &#8205 Összeg &#8205 &#8205";
            break;  
         case "value":
            switch(index[3])
            {
                case 0:
                    document.getElementById("a-" + type).innerHTML = "&#8205 &#8205 Összeg &#8681";
                    index[3]++;
                    break;
                case 1:
                    document.getElementById("a-" + type).innerHTML = "&#8205 &#8205 Összeg &#8679";
                    index[3]++;
                    break;
                case 2: 
                document.getElementById("a-" + type).innerHTML = "&#8205 &#8205 Összeg &#8205 &#8205";
                    index[3] = 0;
                    break;
            }
            index[0] = 0;
            index[1] = 0;
            index[2] = 0;
            document.getElementById("a-name").innerHTML = "Név ";
            document.getElementById("a-class").innerHTML = "Osztály &#8205 &#8205 &#8205 ";
            document.getElementById("a-paid").innerHTML = "Befizetve &#8205 &#8205";
            break;    
        default:
            break;
    }
}

function QRPage() {
    document.getElementById("QRPage").style = "none";
    document.getElementById("MainPage").style.display = "none";
}

function DataBasePage() {
    document.getElementById("MainPage").style = "none";
    document.getElementById("QRPage").style.display = "none";
}

function Reload()
{
    location.reload();
}

function DataStay()
{
    for (const item of document.getElementsByClassName('hasDays')) {
        item.value = "Nap(ok):";
    }
}

function Download(file="Táblázat", table_id, separator = ';') {
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    var csv = [];
    csv.push("Felhasználónév;Jelszó;Név;Osztály;E-mail;Befizetett;Összeg;Lemondott nap(ok)");
    for (const row of this.data) {
        csv.push(row);
    }
    var csv_string = csv.join('\n');
    var filename = file + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-16,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function RegistrationCancel()
{
    document.getElementById('Registration').style.display = "none";
    for (const button of document.getElementsByTagName("button")) {
        button.disabled = false;
    }
    Cancel(1);
}


function Delete()
{
    for (const row of CheckedCheckBox) {
        try {
            document.querySelector("#DataBase_Table #table_tbody").deleteRow(CbIndexes.indexOf(parseInt(row)));
            CbIndexes.splice(CbIndexes.indexOf(parseInt(row)),1);
        } catch (error) {
            console.log(error);
        }
    }
    CheckedCheckBox = [];
    document.getElementById('DeleteAlert').style.display = "none";
    // if (deletecount != 0) {
    //     alert("Sikeresen törölt " + deletecount + " elemet!");
    // }
   
}

function DeletePetition()
{
    if(CheckedCheckBox.length > 0) document.getElementById('DeleteAlert').style.display = "block";
}

function DeleteCancel()
{
    document.getElementById('DeleteAlert').style.display = "none";
}

function FilterShow()
{
    document.getElementById("Filter_btn").style.display = "none";
    document.getElementsByClassName("button")[1].style.display = "block";
}

function Filtering(type)
{
    this.Filter = [];
    for (const checkboxes of document.getElementsByClassName('filter_cb')) {
        
        if (checkboxes.checked == false) {
            this.Filter.splice(this.Filter.indexOf(checkboxes.name.split('_')[0]),0);
        }else
        {
            this.Filter.push(checkboxes.name.split('_')[0]);
        }
        
    }
    
    document.querySelector("#table_thead").innerHTML = TableHeadLoader();
    document.querySelector("#table_tbody").innerHTML = TableLoader(this.data);
}

//QRCode
