var DarkModeOn = true;
var users = [];
var date = new Date();

function PageLoaded() {
  document.getElementById("ResignDate").value =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  

  user = {
    id: users.length + 1,
    username: "Habsburg.Maria.Terezia",
    password: "Password1122",
    name: "Habsburg Mária Terézia",
    schoolOM: "OM220",
    Userclass: "12.A",
    email: "hmt@email.com",
    paid: true,
    value: "15000 Ft",
    dates: "2021-09-27#2021-09-26#2021-09-25",
    isDeleted: false,
  };

  users.push(user);
  for (let index = 0; index < 40; index++) {
    var letter =
    Math.floor(Math.random() * 1000) % 11 == 0
      ? "A"
      : Math.floor(Math.random() * 1000) % 7 == 0
      ? "B"
      : Math.floor(Math.random() * 1000) % 5 == 0
      ? "C"
      : Math.floor(Math.random() * 1000) % 3 == 0
      ? "D"
      : "E";
    var zindex = Math.floor(Math.random() * 4) + 9;
    if (Math.floor(Math.random() * 1000) % 3) {
      var user = {
        id: users.length + 1,
        username: "Habsburg.Maria.Terezia",
        password: "Password1122",
        name: "Habsburg Mária Terézia",
        schoolOM: "OM220",
        Userclass: zindex + "." + letter,
        email: "habsburg.maria.terezia@students.jedlik.eu",
        paid: false,
        value: "0 Ft",
        dates: "",
        isDeleted: false,
      };

      users.push(user);
    } else {
      user = {
        id: users.length + 1,
        username: "Habsburg.Maria.Terezia",
        password: "Password1122",
        name: "Habsburg Mária Terézia",
        schoolOM: "OM220",
        Userclass: "12.A",
        email: "hmt@email.com",
        paid: true,
        value: "15000 Ft",
        dates: "2021-09-27#2021-09-26#2021-09-25",
        isDeleted: false,
      };
      users.push(user);
    }
  }
  

  users.sort(compare);

  for (let index = 12; index > 8; index--) {
    users2 = [];
    for (const user of users) {
      if(user.Userclass.split('.')[0] == index)
      {
        users2.push(user);
      }
    }
    users2.sort(compare2);

    for (const user of users2) {
      if (!user.isDeleted) {
        TableLoader(user);
      }
    }
  }

 

  if (sessionStorage.getItem("DarkModeOn") == "true") {
    document.getElementById("hide-checkbox").checked = false;
    DarkModeStyleChange();
  }
  DarkModeStyleChange(document.getElementById("hide-checkbox").checked);
}

function compare( a, b ) {
  if ( parseInt(a.Userclass.split('.')[0]) < parseInt(b.Userclass.split('.')[0])  ){
    return 1;
  }
  if ( parseInt(a.Userclass.split('.')[0])  > parseInt(b.Userclass.split('.')[0])  ){
    return -1;
  }
  return 0;
}

function compare2( a, b ) {
  if ( a.Userclass.split('.')[1] < b.Userclass.split('.')[1]  ){
    return -1;
  }
  if ( a.Userclass.split('.')[1]  > b.Userclass.split('.')[1]  ){
    return 1;
  }
  return 0;
}



function Searching() {
  Refresh();
  document.getElementById("datasInAccordion").innerHTML = "";
  searchedName = document.getElementById("Search_txt").value;
  if (searchedName != "") {
    var filteredUsers = [];
    searchIndex = 0;
    while (searchIndex < 7 && filteredUsers.length == 0) {
      switch (searchIndex) {
        case 0:
          filteredUsers = users.filter(({ id }) => id === searchedName);
          break;
        case 1:
          filteredUsers = users.filter(
            ({ username }) => username === searchedName
          );
          break;
        case 2:
          filteredUsers = users.filter(({ name }) => name === searchedName);
          break;
        case 3:
          filteredUsers = users.filter(
            ({ Userclass }) => Userclass === searchedName.toUpperCase()
          );
          break;
        case 4:
          filteredUsers = users.filter(({ email }) => email === searchedName);
          break;
        case 5:
          let paidSearch;
          if (
            searchedName.toLowerCase() == "true" ||
            searchedName.toLowerCase() == "befizetve" ||
            searchedName.toLowerCase() == "igen"
          ) {
            paidSearch = true;
          } else if (
            searchedName.toLowerCase() == "false" ||
            searchedName.toLowerCase() == "nem"
          ) {
            paidSearch = false;
          }
          filteredUsers = users.filter(({ paid }) => paid === paidSearch);
          break;
        case 6:
          filteredUsers = users.filter(
            ({ value }) => value.split(" ")[0] === searchedName.split(" ")[0]
          );
          break;
      }
      searchIndex++;
    }

    if (filteredUsers.length == 0) {
      document.getElementById("SearchFail").style = "display: block!important";
    }

    for (const user of filteredUsers) {
      if (!user.isDeleted) {
        TableLoader(user);
      }
    }
  } else {
    Refresh();
  }
}
var NewDatesIndex = 0;
var ResignDates = [];

function ResignDatesAdd(newDate, modify) {
  if (newDate == "") {
    var newDate = document.getElementById("ResignDate").value;
  }
  if (!ResignDates.includes(newDate) || modify) {
    var newResignDate =
      '<div class="input-group mb-1 w-50" id = "dateDiv_ ' +
      NewDatesIndex +
      '"><input type="date" id="newDate_' +
      NewDatesIndex +
      '" class="form-control" disabled value = ' +
      newDate +
      '><button class="input-group-text" id="date_ ' +
      NewDatesIndex +
      '" onclick="ResignDatesRemove(this)">x</button></div>';

    document.getElementById("ResignDates").innerHTML += newResignDate;
    NewDatesIndex++;
    ResignDates.push(newDate);
  }
}

function ResignDatesRemove(e) {
  document
    .getElementById("ResignDates")
    .removeChild(document.getElementById("dateDiv_" + e.id.split("_")[1]));
  ResignDates.splice(
    ResignDates.indexOf(
      document.getElementById("newDate_" + e.id.split("_")[1])
    ),
    1
  );
}

document.querySelector(".wrapper").addEventListener("change", function (e) {
  DarkModeStyleChange(e.target.checked);
});

function DarkModeStyleChange(bool) {
  var css;

  if (!bool) {
    css = "./Styles/AdminDark.css";
    sessionStorage.setItem("DarkModeOn", "true");
    DarkModeOn = false;
  } else {
    css = "./Styles/AdminDefault.css";
    sessionStorage.setItem("DarkModeOn", "false");
    DarkModeOn = true;
  }

  var oldLink = document.getElementsByTagName("link").item(1);
  var newLink = document.createElement("link");
  newLink.setAttribute("rel", "stylesheet");
  newLink.setAttribute("type", "text/css");
  newLink.setAttribute("href", css);

  document.getElementsByTagName("head").item(0).replaceChild(newLink, oldLink);
}



function SelectRow(element) {
  if (element.checked) {
    document.getElementById(
      "row_" + element.id.toString().split("_")[1]
    ).style.backgroundColor = "#807b7a77";
    CheckedCheckBox.push(element.id.toString().split("_")[1]);
  } else {
    document.getElementById(
      "row_" + element.id.toString().split("_")[1]
    ).style.backgroundColor = "";
    CheckedCheckBox.splice(
      CheckedCheckBox.indexOf(element.id.toString().split("_")[1]),
      1
    );
  }
}

function Register() {
  document.getElementsByClassName("button")[1].style.display = "none";
  document.getElementsByClassName("button")[2].style.display = "block";

  for (const button of document.getElementsByTagName("button")) {
    button.disabled = true;
  }

  document.getElementById("NewOne_btn").disabled = false;
  document.getElementById("Upload_btn").disabled = false;
  document.getElementById("RegisterCancel_btn").disabled = false;
}

function Modification() {
  document.getElementById("Modification_btn").style.display = "none";
  document.getElementsByClassName("button")[2].style.display = "block";
}

function Search() {
  document.getElementById("Search_btn").style.display = "none";
  document.getElementsByClassName("button")[0].style.display = "block";
}

function Cancel(which) {
  for (const button of document.getElementsByTagName("button")) {
    button.disabled = false;
  }

  switch (which) {
    case 0:
      document.getElementById("Search_btn").style.display = "block";
      Refresh();

      break;
    case 1:
      try {
        document.getElementById("Filter_btn").style.display = "block";
      } catch (error) {}
      break;
    case 2:
      document.getElementById("Modification_btn").style.display = "block";
      document.getElementsByClassName("button")[2].style.display = "none";
      break;
    default:
      break;
  }
  document.getElementsByClassName("button")[which].style.display = "none";
  document.getElementsByClassName("custom-file-upload")[0].innerHTML =
    '<input id = "file" type="file" onchange="UploadFile()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mb-1 bi bi-file-earmark-plus" viewBox="0 0 16 16"><path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg> Fájl kiválasztása';
}

function Refresh() {
  document.getElementById("SearchFail").style = "";
  document.getElementById("datasInAccordion").innerHTML = "";
  for (const user of users) {
    if (!user.isDeleted) {
      TableLoader(user);
    }
  }
}

//TODO FELTÖLTÉS
var file;
function UploadFile() {
  file = document.getElementById("file").files[0];

  document.getElementsByClassName("custom-file-upload")[0].innerHTML =
    TextAbstract(
      document.getElementById("file").value.toString().split("\\")[
        document.getElementById("file").value.toString().split("\\").length - 1
      ],
      20
    );
}

document.getElementById("Upload_btn").addEventListener("click", function () {
  try {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      NewsFromFile(this.result);
    });
    reader.readAsText(file);
  } catch (error) {
    alert("Nincs fájl kiválasztva!");
  }
});

function NewsFromFile(datarow) {
  var index = 0;

  for (const row of datarow.split("\n")) {
    if (index == 0) {
      index++;
    } else {
      var datas = row.split(";");
      user = {
        id: users.length + 1,
        username: datas[1],
        password: datas[2],
        name: datas[3],
        schoolOM: datas[4],
        Userclass: datas[5],
        email: datas[6],
        paid: datas[7] == "true" ? true : false,
        value: datas[8],
        dates: datas[9],
        isDeleted: datas[10] == "true" ? true : false,
      };
      console.log(user);
      this.users.push(user);
    }
  }
  Refresh();
}

function TextAbstract(text, length) {
  if (text == null) {
    return "";
  }
  if (text.length <= length) {
    return text;
  }
  text = text.toString().substring(0, length - 3);
  return text + "...";
}

function Registration(which) {
  which == "Modify"
    ? (document.getElementById("RegistrationBtn").innerHTML = "Módosítás")
    : (document.getElementById("RegistrationBtn").innerHTML = "Hozzáadás");
  document.getElementById("newUserId").innerHTML = "";
  document.getElementById("NewName").value = "";
  document.getElementById("NewClass").value = "";
  document.getElementById("NewEmail").value = "";
  document.getElementById("NewUsername").value = "";
  document.getElementById("NewPaid").checked = "";
  document.getElementById("NewValue").value = "";
  document.getElementById("Registration").style.display = "block";
  document.getElementById("ResignDates").innerHTML = "";
  disableScroll();
}

function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "visible";
}

function RegistrationSave() {
  if (document.getElementById("newUserId").innerHTML != "") {
    var index = 0;

    var _name = "";
    for (const letter of document.getElementById("NewName").value) {
      var let = letter.toLowerCase();
      if (index == 0) {
        var let = letter.toUpperCase();
        index++;
      }
      if (letter == " ") {
        index = 0;
      }
      _name += let;
    }

    var _schoolId = "OM220";

    var _class = document
      .getElementById("NewClass")
      .value.toString()
      .toUpperCase();

    var _email = document
      .getElementById("NewEmail")
      .value.toString()
      .toLowerCase();

    d = new Date();
    var _pass = "Jedlik" + d.getFullYear();

    var _username = document.getElementById("NewUsername").value;

    var _paid = document.getElementById("NewPaid").checked;

    var _value = document.getElementById("NewValue").value;
    if (
      _name.trim() == "" ||
      _class.trim() == "" ||
      _email.trim() == "" ||
      _username.trim() == "" ||
      !_email.toString().includes("@")
    ) {
      alert("Nem megfelelők a módosítási paraméterek!");
    } else {
      var userId = parseInt(document.getElementById("newUserId").innerHTML);
      const user = users.find(({ id }) => id === userId);

      user.username = _username;
      user.password = _pass;
      user.name = _name;
      user.schoolOM = _schoolId;
      user.Userclass = _class;
      user.email = _email;
      user.paid = _paid;
      user.value = _value + " Ft";
      user.dates = ResignDates.join("#");
      Refresh();
      TableLoader(user);
    }
    RegistrationCancel();
  } else {
    var index = 0;

    var _name = "";
    for (const letter of document.getElementById("NewName").value) {
      var let = letter.toLowerCase();
      if (index == 0) {
        var let = letter.toUpperCase();
        index++;
      }
      if (letter == " ") {
        index = 0;
      }
      _name += let;
    }

    var _schoolId = "OM220";

    var _class = document
      .getElementById("NewClass")
      .value.toString()
      .toUpperCase();

    var _email = document
      .getElementById("NewEmail")
      .value.toString()
      .toLowerCase();

    d = new Date();
    var _pass = "Jedlik" + d.getFullYear();

    var _username = document.getElementById("NewUsername").value;

    var _paid = document.getElementById("NewPaid").checked;

    var _value = document.getElementById("NewValue").value;

    if (
      _name.trim() == "" ||
      _class.trim() == "" ||
      _email.trim() == "" ||
      _username.trim() == "" ||
      !_email.toString().includes("@")
    ) {
      alert("Nem megfelelők a regisztáció paraméterek!");
    } else {
      user = {
        id: users.length + 1,
        username: _username,
        password: _pass,
        name: _name,
        schoolOM: _schoolId,
        Userclass: _class,
        email: _email,
        paid: _paid,
        value: _value + " Ft",
        dates: ResignDates.join("#"),
        isDeleted: false,
      };

      users.push(user);
      TableLoader(user);

      for (const button of document.getElementsByTagName("button")) {
        button.disabled = false;
      }
      RegistrationCancel();
    }
  }
  ResignDates = [];
}

function TableLoader(user) {
  var PaidIcon =
    '<svg id = "igen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2 text-success" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';
  var NotPaidIcon =
    '<svg id = "nem" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg text-danger" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg>';

  var DeleteIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mb-1 bi bi-person-dash" viewBox="0 0 16 16"> <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/><path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/></svg> ';
  var ModifyIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mb-1 bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>';

  accordionIndex = user.id;
  var colorIndex;

  switch (user.Userclass.split(".")[1]) {
    case "A":
      colorIndex = 250;
      break;
    case "B":
      colorIndex = 210;
      break;
    case "C":
      colorIndex = 170;
      break;
    case "D":
      colorIndex = 130;
      break;
    case "E":
      colorIndex = 100;
      break;
    default:
      break;
  }

  color =
    user.Userclass.split(".")[0] == 9
      ? "rgb(" + colorIndex + ",92,92)"
      : user.Userclass.split(".")[0] == 10
      ? "rgb(" + colorIndex + ",140,92)"
      : user.Userclass.split(".")[0] == 11
      ? "rgb(" + colorIndex + ",220,92)"
      : "rgb(100," + colorIndex + ",110)";

  accordion =
    '<div class="accordion-item mb-2"><h2 class="accordion-header" id="headingOne"><button id = "tesztbtn" class="accordion-button collapsed text-dark fw-bold" style = "background-color: ' +
    color +
    '" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' +
    accordionIndex +
    '">';
  accordion +=
    "<span>" +
    user.name +
    " - " +
    user.Userclass +
    '</span></button></h2><div id="collapse' +
    accordionIndex +
    '" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#datasInAccordion">';
  accordion +=
    '<div class="accordion-body"> <table class="table table-striped w-100">';
  if (user.dates != "") {
    select = "<select class = 'form-select hasDays' onchange = 'DataStay()'>";
    if (user.dates.split("#")[0] != "Nap(ok):") {
      select += "<option>" + "Nap(ok):" + "</option>";
    }

    for (const date of user.dates.split("#")) {
      select += "<option class = 'DaysOption'>" + date + "</option>";
    }
    select += "</select>";
  } else {
    select =
      "<select class = 'form-select' disabled><option>Nincs</option></select>";
  }
  accordion +=
    "<tr><td>Felhasználónév:</td><td>" +
    user.username +
    "</td><td>E-mail:</td><td>" +
    user.email +
    "</td></tr>";
  accordion +=
    "<tr><td>Befizetve:</td><td>" +
    (user.paid ? PaidIcon : NotPaidIcon) +
    "</td><td>Összeg:</td><td>" +
    user.value +
    "</td></tr>";
  accordion +=
    '<tr><td colspan = "2">Lemondott nap(ok):</td><td colspan = "2">' +
    select +
    "</td></tr>";
  accordion +=
    '<tr><td colspan = "4"><button class = "btn btn-primary w-25" id = "' +
    user.id +
    '_modify" onclick = "ModifyUser(this)">' +
    ModifyIcon +
    ' Módosítás</button><button class = "w-25 ms-5 btn btn-danger" id = "' +
    user.id +
    '_delete" onclick = "DeleteUser(this)">' +
    DeleteIcon +
    " Törlés</button></td></tr>";
  accordion += "</table> </div></div></div>";
  document.getElementById("datasInAccordion").innerHTML += accordion;
}

function ModifyUser(e) {
  Registration("Modify");

  var userId = parseInt(e.id.split("_")[0]);
  const user = users.find(({ id }) => id === userId);

  document.getElementById("newUserId").innerHTML = user.id;
  document.getElementById("NewName").value = user.name;
  document.getElementById("NewClass").value = user.Userclass;
  document.getElementById("NewEmail").value = user.email;
  document.getElementById("NewUsername").value = user.username;
  document.getElementById("NewPaid").checked = user.paid;
  document.getElementById("NewValue").value = user.value.split(" ")[0];

  userDates = user.dates.split("#");
  console.log(userDates);
  for (const date of userDates) {
    if (date != "") {
      console.log(date);
      ResignDatesAdd(date, true);
    }
  }
}

function PageChanger(e){
  document.getElementById("QRMain").style.display = "none";
  document.getElementById("MainPage").style.display = "none";
  document.getElementById("SettingsMain").style.display = "none";
  switch (e.id) {
    case 'QRPage':
      document.getElementById("QRMain").style = "none";
      break;
    case 'DataPage':
      document.getElementById("MainPage").style = "none";
      break;
    case 'SettingsPage':
      document.getElementById("SettingsMain").style = "none";
      break;  
    default:
      break;
  }
}

function Reload() {
  location.reload();
}

function DataStay() {
  for (const item of document.getElementsByClassName("hasDays")) {
    item.value = "Nap(ok):";
  }
}

function Download(file = "Táblázat", table_id, separator = ";") {
  var csv = [];
  csv.push(
    "Id;Felhasználónév;Jelszó;Név;IskolaOM;Osztály;E-mail;Befizetett;Összeg;Lemondott nap(ok);Törölt"
  );
  for (const user of this.users) {
    var dataArray = [];
    dataArray.push(user.id);
    dataArray.push(user.username);
    dataArray.push(user.password);
    dataArray.push(user.name);
    dataArray.push(user.schoolOM);
    dataArray.push(user.Userclass);
    dataArray.push(user.email);
    dataArray.push(user.paid);
    dataArray.push(user.value);
    dataArray.push(user.dates);
    dataArray.push(user.isDeleted);

    csv.push(dataArray.join(";"));
  }
  var csv_string = csv.join("\n");
  var filename = file + ".csv";
  var link = document.createElement("a");
  link.style.display = "none";
  link.setAttribute("target", "_blank");
  link.setAttribute(
    "href",
    "data:text/csv;charset=utf-16," + encodeURIComponent(csv_string)
  );
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function RegistrationCancel() {
  document.getElementById("Registration").style.display = "none";
  for (const button of document.getElementsByTagName("button")) {
    button.disabled = false;
  }
  enableScroll();
  Cancel(1);
}

function Delete() {
  var userId = parseInt(
    document.getElementById("delete_user").className.split("_")[0]
  );
  const user = users.find(({ id }) => id === userId);
  user.isDeleted = true;
  document.getElementById("DeleteAlert").style.display = "none";
  document.getElementById("datasInAccordion").innerHTML = "";
  for (const user of users) {
    if (!user.isDeleted) {
      TableLoader(user);
    }
  }
}

function DeleteUser(e) {
  var userId = parseInt(e.id.split("_")[0]);
  const user = users.find(({ id }) => id === userId);
  document.getElementById("delete_user").className = user.id + "_";
  document.getElementById("delete_user").innerHTML = "(" + user.name + ")";
  document.getElementById("DeleteAlert").style.display = "block";
}

function DeleteCancel() {
  document.getElementById("DeleteAlert").style.display = "none";
}

function FilterShow() {
  document.getElementById("Filter_btn").style.display = "none";
  document.getElementsByClassName("button")[1].style.display = "block";
}

//QRCode
