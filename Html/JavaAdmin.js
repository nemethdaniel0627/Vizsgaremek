var CurrentlyIndex = 0;
var table =  "<tr style='background-color: #2196f3BB'><th></th><th id = 'table_name'><a href = '#' onclick = 'OrderBy(name)'>Név </a></th><th id = 'table_class'><a href = '#' onclick = 'OrderBy(class)'>Osztály &#8205 &#8205 &#8205</a></th><th>Befizetve</th><th>Befizetett összeg</th><th>Lemondott napok</th></tr>";
var data = "";
var DataIndex = 0;
var CbIndexes = [];
function PageLoaded()
{
    this.data = ["Habsburg Mária Terézia;12.A;true;15000;2021-09-27#2021-09-26#2021-09-25"];
    for (let index = 0; index < 20; index++) {
        var zindex = Math.floor(Math.random() * 4) + 9;
        if (Math.floor(Math.random() * 100) % 3) {
            
            this.data.push("Habsburg Mária Terézia;"+ zindex +".A;false;0;");  
        }
        this.data.push("Habsburg Mária Terézia;"+ zindex +".A;true;15000;2021-09-27#2021-09-26#2021-09-25");    
        
        DataIndex = index;
    }
    document.querySelector("#table_tbody").innerHTML = TableLoader(this.data);
}

function SelectRow(row)
{
    if (document.getElementById("cb_"+row).checked) {
        document.getElementById("row_"+row).style.backgroundColor = "#807b7a77";
    }else
    {
        document.getElementById("row_"+row).style.backgroundColor = "";
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
    document.getElementsByClassName("button")[1].style.display = "block";
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
            document.getElementById("Modification_btn").style.display = "block";
            document.getElementsByClassName("button")[1].style.display = "none";
            break;
        default:
            break;
    }
    document.getElementsByClassName("button")[which].style.display = "none";
    document.getElementsByClassName("custom-file-upload")[0].innerHTML = "<input type = 'file' id = 'file' onchange = UploadFile()><img src='./Images/File_icon.png' alt='Fájl' style='width: 20px;'> Fájl kiválasztása"
}

function UploadFile()
{
    console.log(document.getElementById('file').value);
    document.getElementsByClassName("custom-file-upload")[0].innerHTML = TextAbstract(document.getElementById('file').value.toString().split('\\')[document.getElementById('file').value.toString().split('\\').length-1],20);
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
    RegisterRow.push("<input type = 'checkbox' id = 'new_cb' class = 'form-check-input '/>");
    RegisterRow.push("<input type = 'button'  id = 'new_Save' value = 'Mentés'  style = 'width: 150px'   class = 'btn btn-success' onclick = 'RegistrationSave()'>");
    RegisterRow.push("<input type = 'button' value = 'Mégsem' id = 'new_Cancel' style = 'width: 150px'  class = 'btn btn-danger' onclick = 'RegistrationCancel()'>");
    var row = document.getElementById("Downloadable_table").insertRow(1);
    for (let index = 0; index < RegisterRow.length; index++) {
        row.insertCell(index).innerHTML = RegisterRow[index];  
    }
    
}

function RegistrationSave()
{
    var RegisterRow = "";
    var datarow = [];
    datarow.push(document.getElementById('new_name').value + ";" + document.getElementById('new_class').value + ";" + document.getElementById('new_cb').checked + ";0;");
    datarow.push(data);
    RegisterRow += TableLoader(datarow);
    document.querySelector("#table_tbody").innerHTML = TableLoader(this.data);

}

function TableLoader(data)
{

    var datapertable= "";
    for (let index = 0; index < data.length; index++) {
        datapertable += "<tr id = 'row_" + index + "'><td><input type = 'checkbox' id = cb_"+ index +" class = 'form-check-input' onchange= 'SelectRow(" + index +")'></td>";
        CbIndexes.push(index);
        for (let dataIndex = 0; dataIndex < data[index].split(';').length; dataIndex++) {
            const element = data[index].split(';');
            if (element[dataIndex].toLowerCase() == "true") {
                datapertable += "<td> <img class = 'PaidImage' src='./Images/Correct_icon.png' alt='Igen'> </td>";
            }else if(element[dataIndex].toLowerCase() == "false")
            {
                datapertable += "<td> <img class = 'PaidImage' src='./Images/Incorrect_icon.png' alt='Nincs'> </td>";
            }else if(dataIndex == element.length-2)
            {
                datapertable += "<td>" + element[dataIndex] + " Ft </td>" 
            }else if(dataIndex == element.length-1)
            {
                if(element[dataIndex] != "" && element[dataIndex] != null)
                {
                    datapertable += "<td> <select class = 'form-select'>"
                    for (const item of element[dataIndex].split('#')) {
                        datapertable += "<option>" + item + "</option>" 
                        
                    }
                    datapertable += "</select></td>"
                }else
                {
                    datapertable += "<td><select class = 'form-select' disabled><option>Nincs</option></select></td>";
                }
                
            }
            else{
                datapertable += "<td> " + element[dataIndex] + "</td>";

            }
        }
        datapertable += "</tr>";
        CurrentlyIndex = index;
    }
    return datapertable;
}

var index = [0,0];
function OrderBy(type)
{
    switch (type) {
        case "name":
            switch(index[0])
            {
                case 0:
                    document.getElementById("table_name").innerHTML = "<a href = '#' onclick =OrderBy('name')>Név &#8681 </a>";
                    index[0]++;
                    break;
                case 1: 
                    document.getElementById("table_name").innerHTML = "<a href = '#' onclick = OrderBy('name')>Név &#8679 </a>";
                    index[0]++;
                    break;
                case 2: 
                    document.getElementById("table_name").innerHTML = "<a href = '#' onclick =OrderBy('name')>Név </a>";
                    index[0] = 0;
                    break;
            }
            index[1] = 0;
            document.getElementById("table_class").innerHTML = "<a href = '#' onclick = OrderBy('class')>Osztály &#8205 &#8205 &#8205</a>";
            break;
            
        case "class":
            switch(index[1])
            {
                case 0:
                    document.getElementById("table_class").innerHTML = "<a href = '#' onclick = OrderBy('class')>Osztály &#8681 </a>";
                    index[1]++;
                    break;
                case 1: 
                document.getElementById("table_class").innerHTML = "<a href = '#' onclick = OrderBy('class')>Osztály &#8679 </a>";
                    index[1]++;
                    break;
                case 2: 
                document.getElementById("table_class").innerHTML = "<a href = '#' onclick = OrderBy('class')>Osztály &#8205 &#8205 &#8205</a>";
                    index[1] = 0;
                    break;
            }
            index[0] = 0;
            document.getElementById("table_name").innerHTML = "<a href = '#' onclick = OrderBy('name')>Név </a>";
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


function Download(file="Táblázat", table_id, separator = ';') {
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ');
            data = data.replace(/"/g, '""');
            if(j == cols.length - 1 && i != 0)
            {
                var data = "";
                for (const item of cols[j].innerText.split('\n')) {
                    data += item + ',';
                }
                
            }else if(j == 3 && i != 0)
            {
                data = cols[j].innerHTML.split('"')[cols[j].innerHTML.split('"').length-2];
            }
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    var filename = file + '_' + new Date().toLocaleDateString() + '.csv';
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
    document.querySelector("#DataBase_Table table").deleteRow(1);
    for (const button of document.getElementsByTagName("button")) {
        button.disabled = false;
    }
    Cancel(1);
}

function Delete()
{

    for (let index = 0; index < CbIndexes.length; index++) {
        if(document.getElementById('cb_' + CbIndexes[index]).checked)
            {
                document.querySelector("#DataBase_Table table").deleteRow(index+1);
                CbIndexes.splice(index,1);
                console.log(CbIndexes);
                index--;
                
            }
        
    }
}