var CurrentlyIndex = 0;
var table =  "<tr style='background-color: #2196f3BB'><th></th><th id = 'table_name'><a href = '#' onclick = 'OrderBy(name)'>Név </a></th><th id = 'table_class'><a href = '#' onclick = 'OrderBy(class)'>Osztály &#8205 &#8205 &#8205</a></th><th>Befizetve</th><th>Befizetett összeg</th><th>Lemondott napok</th></tr>";
var data = "";
function PageLoaded()
{
    
    this.data = ["Habsburg Mária Terézia;12.A;true;15000;2021-09-27#2021-09-26#2021-09-25"];
    for (let index = 0; index < 20; index++) {
        var zindex = Math.floor(Math.random() * 4) + 9;
        if (Math.floor(Math.random() * 100) % 3) {
            
            this.data.push("Habsburg Mária Terézia;"+ zindex +".A;false;0;");  
        }
        this.data.push("Habsburg Mária Terézia;"+ zindex +".A;true;15000;2021-09-27#2021-09-26#2021-09-25");    
        
        
    }
    document.querySelector("#DataBase_Table table").innerHTML += TableLoader(this.data);
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
    document.getElementById("Register_btn").style.display = "none";
    document.getElementsByClassName("button")[1].style.display = "block";

    for (const button of document.getElementsByTagName("button")) {
        button.disabled = true;
    }

    document.getElementById("NewOne_btn").disabled = false;
    document.getElementById("Upload_btn").disabled = false;
    document.getElementById("RegisterCancel_btn").disabled = false;
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

    if(which == 0){
        document.getElementById("Search_btn").style.display = "block";
    }else
    {
        document.getElementById("Register_btn").style.display = "block";
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
    var datapertable= "";
    datapertable += "<tr><td></td>";
    datapertable += "<td><input id = 'new_name' type = 'text' placeholder = 'Név'  style = 'width: 220px'></td>";
    datapertable += "<td><input id = 'new_class' type = 'text' placeholder = 'Osztály'  style = 'width: 90px'></td>";
    datapertable += "<td> <input type = 'checkbox' id = 'cb_new'/></td>";
    datapertable += "<td><input type = 'button' value = 'Mentés'  style = 'width: 150px'   class = 'btn btn-success' onclick = ''></td>";
    datapertable += "<td><input type = 'button' value = 'Mégsem' style = 'width: 150px'  class = 'btn btn-danger' onclick = 'RegistrationCancel()'></td></tr>";
    document.querySelector("#DataBase_Table table").innerHTML = table + datapertable + TableLoader(this.data);
}

function TableLoader(data)
{

    var datapertable= "";
    for (let index = 0; index < data.length; index++) {
        datapertable += "<tr id = 'row_" + index + "'><td><input type = 'checkbox' id = cb_"+ index +" onchange= 'SelectRow(" + index +")'></td>";
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
                    datapertable += "<td> <select>"
                    for (const item of element[dataIndex].split('#')) {
                        datapertable += "<option>" + item + "</option>" 
                        
                    }
                    datapertable += "</select></td>"
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


function Download(file="Táblázat")
{
    var table = document.getElementById("Downloadable_table");
    var rows =[];
    for(var i=0,row; row = table.rows[i];i++){
        column1 = row.cells[0].innerText;
        column2 = row.cells[1].innerText;
        column3 = row.cells[2].innerText;
        column4 = row.cells[3].innerText;
        column5 = row.cells[4].innerText;
        column6 = "";
        if (i == 0) {
            column6 = row.cells[5].innerText;
        }else
        {
            try {
                for (let index = 0; index < row.cells[5].innerText.split('\n').length; index++) {
                    if ( row.cells[5].innerText.split('\n')[index] == null) {
                        break;
                    }
                    column6 +=  row.cells[5].innerText.split('\n')[index] + ',';
                }
            } catch (error) {
                
            }
           
        }
        rows.push(
            [
                column1,
                column2,
                column3,
                column4,
                column5,
                column6
            ]
        );
 
        }
        csvContent = "data:text/csv;charset=utf-8,";
        rows.forEach(function(rowArray){
            row = rowArray.join(";");
            csvContent += row + "\r\n";
        });
 
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", file + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
}

function RegistrationCancel()
{
    document.querySelector("#DataBase_Table table").deleteRow(1);
}

function Delete()
{
    //document.querySelector("#DataBase_Table table").deleteRow(1);   
}