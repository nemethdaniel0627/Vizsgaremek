var CurrentlyIndex = 0;
function PageLoaded()
{
    var table =  "<table><tr style='background-color: #2196f3BB'><th></th><th id = 'table_name'><a href = '#' onclick = 'OrderBy(name)'>Név &#8681 </a></th><th id = 'table_class'><a href = '#' onclick = 'OrderBy(class)'>Osztály &#8679</a></th><th>Befizetve</th><th>Befizetett összeg</th><th>Lemondott napok</th></tr>";
    var data = ["Habsburg Mária Terézia;12.A;true;15000;2021-09-27#2021-09-26#2021-09-25"];
    var zindex = 9;
    for (let index = 0; index < 10; index++) {
        if (index % 30/(4) == 0) {
            zindex++;
        }
        data.push("Habsburg Mária Terézia;"+ zindex +".A;true;15000;2021-09-27#2021-09-26#2021-09-25");    
        
        
    }
    document.querySelector("#DataBase_Table table").innerHTML += TableLoader(data);
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
    document.getElementsByClassName("button")[0].style.display = "block";
}

function Cancel()
{
    document.getElementById("Register_btn").style.display = "block";
    document.getElementsByClassName("button")[0].style.display = "none";
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
    datapertable += "<tr><td><input type = 'button' value = '+' style = ' height:32px; margin: 2px'></td>";
    datapertable += "<td><input id = 'new_name' type = 'text' placeholder = 'Név' style = 'width: 250px; text-align:center; height:32px'></td>";
    datapertable += "<td><input id = 'new_class' type = 'text' placeholder = 'Osztály' style = 'width: 90px; text-align:center; height:32px'></td>";
    datapertable += "<td> <input type = 'checkbox' id = 'cb_new'/></td>";
    datapertable += "<td></td>";
    datapertable += "<td></td></tr>";
    document.querySelector("#DataBase_Table table").innerHTML += datapertable;
}

function TableLoader(data)
{

    var datapertable= "";
    for (let index = 0; index < data.length; index++) {
        datapertable += "<tr id = 'row_" + index + "'><td><input type = 'checkbox' id = cb_"+ index +" onchange= 'SelectRow(" + index +")'></td>";
        for (let dataIndex = 0; dataIndex < data[index].split(';').length; dataIndex++) {
            const element = data[index].split(';');
            if (element[dataIndex].toLowerCase() == "true") {
                datapertable += "<td> <input type = 'checkbox' checked disabled/> </td>";
            }else if(element[dataIndex].toLowerCase() == "false")
            {
                datapertable += "<td> <input type = 'checkbox' disabled/> </td>";
            }else if(dataIndex == element.length-2)
            {
                datapertable += "<td>" + element[dataIndex] + " Ft </td>" 
            }else if(dataIndex == element.length-1)
            {
                datapertable += "<td> <select>"
                for (const item of element[dataIndex].split('#')) {
                    datapertable += "<option>" + item + "</option>" 
                    
                }
                datapertable += "</select></td>"
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
            if (index[0] == 0) {
                document.getElementById("table_name").innerHTML = "<a href = '#' onclick =OrderBy('name')>Név &#8681 </a>";
                index[0] = 1;
            }else
            {
                document.getElementById("table_name").innerHTML = "<a href = '#' onclick = OrderBy('name')>Név &#8679 </a>";
                index[0] = 0;
            }
            index[1] = 0;
            document.getElementById("table_class").innerHTML = "<a href = '#' onclick = OrderBy('class')>Osztály &#8205 &#8205 &#8205</a>";
            break;
            
        case "class":
            if (index[1] == 0) {
                document.getElementById("table_class").innerHTML = "<a href = '#' onclick = OrderBy('class')>Osztály &#8681 </a>";
                index[1] = 1;
            }else
            {
                document.getElementById("table_class").innerHTML = "<a href = '#' onclick = OrderBy('class')>Osztály &#8679 </a>";
                index[1] = 0;
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
    /* Get the HTML data using Element by Id */
    var table = document.getElementById("Downloadable_table");
     
    /* Declaring array variable */
    var rows =[];
 
      //iterate through rows of table
    for(var i=0,row; row = table.rows[i];i++){
        //rows would be accessed using the "row" variable assigned in the for loop
        //Get each cell value/column from the row
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
            for (let index = 0; index < row.cells[5].innerText.length; index++) {
                if (row.cells[5].innerText[i] == null) {
                    break;
                }
                column6 += row.cells[5].innerText[i] + ',';
            }
        }
 
    /* add a new records in the array */
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
         /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
        rows.forEach(function(rowArray){
            row = rowArray.join(";");
            csvContent += row + "\r\n";
        });
 
        /* create a hidden <a> DOM node and set its download attribute */
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", file + '.csv');
        document.body.appendChild(link);
         /* download the data file named "Stock_Price_Report.csv" */
        link.click();
}

function download(text, fileName) {
    const link = document.createElement('a');
    link.setAttribute('href',`data:text/csv;charset=utf-8,${encodeURIComponent(text)}`);
    link.setAttribute('download',fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const toCSV = function (table) {
    const rows = table.querySelectorAll('tr');

    return [].slice.call(rows).map(function (row) {
        const cell = row.querySelectorAll('th,td');
        return [].slice.call(function (cell) {
            return cell.textContent;
        }).join(',');
    })
    .join(',');
}