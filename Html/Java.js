var DarkModeOn = true;
var Logined = "false;";
var Chosable = [];
var CurrentPage = "Login";
var Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var MenuPerWeek = [];

var errorIcon ='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="mb-1 bi bi-exclamation-triangle" viewBox="0 0 16 16"><path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/><path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg>';
var infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mb-1 bi bi-info-circle" viewBox="0 0 16 16">'
+'<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>'
+'<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>'
+'</svg>';
var payIcon ='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mb-1 bi bi-credit-card" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/><path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/></svg>';
var date = new Date();



function PageLoaded() {
  for (let index = 0; index < 5; index++) {
    MenuPerWeek.push(
      "Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta;Dessert"
    );
  }
  for (let index = 0; index < 5; index++) {
    MenuPerWeek.push("Babgulyás;Tavaszi rizseshús;Gyümölcs");
  }

  //Logined = sessionStorage.getItem("Logined") == null ? "false;" : sessionStorage.getItem("Logined");
  CurrentPage =
    sessionStorage.getItem("CurrentPage") == null
      ? "Login"
      : sessionStorage.getItem("CurrentPage");

  sessionStorage.setItem('SavedUser', localStorage.getItem('ToPageUser') == null ? sessionStorage.getItem('SavedUser') : localStorage.getItem('ToPageUser'));

  sessionStorage.setItem(
    "Logined",
    (Logined =
      sessionStorage.getItem("SavedUser") == "null" ||
      sessionStorage.getItem("SavedUser") == ""
        ? "false;"
        : "true;")
  );
  Chosable = WhichDayIsNotChosable();

  if (Logined == "true;") {
    LogingIn();
  } else {
    PageChanger(null, sessionStorage.getItem("CurrentPage"));
    localStorage.removeItem("ToPageUser");
    LogingOut();
  }

  if (sessionStorage.getItem("DarkModeOn") == "true") {
    document.getElementById("Dark_check").checked = true;
    DarkModeStyleChange();
  }

  document.getElementsByClassName("Menu_date_date")[0].innerHTML =
    ThisMondayDate().split("-").join(". ") +
    ". - " +
    ThisFridayDate().split("-").join(". ") +
    ".";
  try {
    document.getElementsByClassName("Menu_date_date")[1].innerHTML =
      ThisMondayDate().split("-").join(". ") +
      ". - " +
      ThisFridayDate().split("-").join(". ") +
      ".";
  } catch (error) {}
  DatesLoader();

  PageChanger(null, sessionStorage.getItem("CurrentPage"));
  document.querySelector(".date p").innerHTML =
    "Dátum: " +
    NowDate().toString().split("-")[0] +
    "." +
    NowDate().toString().split("-")[1] +
    "." +
    NowDate().toString().split("-")[2] +
    ".";

  CurrentDayColorize();

  MobileMode();

  var dates =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + date.getMonth() + 1
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  document.getElementById("FirstDay").value = dates;
  document.getElementById("LastDay").value = dates;
}

function DatesLoader() {

  for (let datesIndex = 0; datesIndex < ResignOrNot.length; datesIndex++) {
    if( datesIndex < 5 )
    {
      Dates[datesIndex] = AddDayToDate(ThisMondayDate().split('-'),'-',(datesIndex%5),true);
    }
    else
    {
      monday = AddDayToDate(ThisMondayDate().split('-'),'-',7,true);
      Dates[datesIndex] = AddDayToDate(monday.split('-'),'-',(datesIndex%5),true);
    }
  }
}

function DarkModeStyleChange() {
  var css;
  var DarkModeIcon;

  if (DarkModeOn) {
    css = "./Styles/dark.css";
    DarkModeIcon = "bi bi-moon-stars";
    DarkModeOn = false;
    sessionStorage.setItem("DarkModeOn", "true");
    document.getElementById("DarkModePic").style = "none";
    document.getElementById("DarkModePic2").style.display = "none";
    document.getElementById("tikTokIconLg").style = "color : white!important";
	document.getElementById("tikTokIconSm").style = "color : white!important";
  } else {
    css = "./Styles/default.css";
    DarkModeIcon = "bi bi-moon";
    DarkModeOn = true;
    sessionStorage.setItem("DarkModeOn", "false");
    document.getElementById("DarkModePic").style.display = "none";
    document.getElementById("DarkModePic2").style = "none";
    document.getElementById("tikTokIconLg").style = "";
	document.getElementById("tikTokIconSm").style = "";
  }

  var oldLink = document.getElementsByTagName("link").item(1);
  var newLink = document.createElement("link");
  newLink.setAttribute("rel", "stylesheet");
  newLink.setAttribute("type", "text/css");
  newLink.setAttribute("href", css);

  document.getElementsByTagName("head").item(0).replaceChild(newLink, oldLink);

  CurrentDayColorize();
}

function MobileMode() {
  if (document.body.clientWidth < 768) {
    // for (const classes of document.getElementsByClassName("Menu")) {
    //     classes.style.marginTop = "20px";
    // }

    // document.getElementById("front").style.width = "300px";
    // document.getElementById("Ticket_img").style.left = "250%";
    // document.getElementById("front").style.height = "300px";
    // document.getElementById("DarkMode").style.marginRight = "5px";
    // for (const classes of document.getElementsByClassName("Menu_calendar")) {
    //     classes.style.display = "none";
    // }

    // document.querySelector("#AllMenu h1").style.width = "100%";
    // document.querySelector("#AllMenu h1").style.marginLeft = "0";
    // for (const item of document.getElementsByClassName("Weekday")) {
    //     item.style.backgroundImage =
    //     "linear-gradient(to bottom, #adf7b0, #FFFFFF)";
    // }
    NotUsedDayDelete();
    return true;
  }
  return false;
}

function CurrentDayColorize() {
  if (DarkModeOn) {
    document.getElementsByClassName(CurrentDayPicker())[0].style ="display: block!important; background-image: linear-gradient(to bottom, #adf7b0, #FFFFFF);";
  } else {
    document.getElementsByClassName(CurrentDayPicker())[0].style ="display: block!important; background-image: linear-gradient(to bottom, #6a8f6b, #1D2D44);";
  }
  // document.getElementsByClassName(CurrentDayPicker())[0].className =
  //   "col-lg-3 col-sm-12 Weekday " + CurrentDayPicker();
}

function CurrentDayPicker() {
  return Days[
    date.getDay() - 1 < 0 || date.getDay() - 1 > 4 ? 0 : date.getDay() - 1
  ];
}

function NotUsedDayDelete() {
  // for (const day of Days) {
  //   if (CurrentDayPicker() != day) {
  //     for (const dayclasses of document.getElementsByClassName(day)) {
  //       dayclasses.style.display = "none";
  //     }
  //   }
  // }

  
}

sessionStorage.setItem("NextWeek", 0);

function ToNextWeek(WhichPage) {
  if (parseInt(sessionStorage.getItem("NextWeek")) < 1 || WhichPage == "Menu") {
    var date = document
      .getElementsByClassName("Menu_date_date")
      [WhichPage == "Menu" ? 0 : 1].innerHTML.split("-")[0]
      .replace(/ /g, "")
      .split(".");

    var NextMonday = AddDayToDate(date, ". ", 7, true) + ". ";

    var date = document
      .getElementsByClassName("Menu_date_date")
      [WhichPage == "Menu" ? 0 : 1].innerHTML.split("-")[1]
      .replace(/ /g, "")
      .split(".");

    var NextFriday = AddDayToDate(date, ". ", 7, false) + ". ";

    document.getElementsByClassName("Menu_date_date")[
      WhichPage == "Menu" ? 0 : 1
    ].innerHTML = NextMonday + " - " + NextFriday;

    if (WhichPage != "Menu") {
      if (document.getElementById("mainResignByMenu").style.display != "none") {
        NextWeekOrNot = 2;
        for (let index = 0; index < ResignOrNot.length; index++) {
          ChosenDayResign(Days[index], index);
        }
      }
      sessionStorage.setItem(
        "NextWeek",
        parseInt(sessionStorage.getItem("NextWeek")) + 1
      );
      MenuLoader(
        MenuPerWeek,
        parseInt(sessionStorage.getItem("NextWeek")),
        "ResignMenu"
      );
      JumpedWeek = 0;
    } else {
      JumpedWeek++;
      MenuLoader(MenuPerWeek, JumpedWeek, "Menu");
    }
  }
}

var JumpedWeek = 0;

function AddDayToDate(date , characters, daysNumber, FullDate) {
  if (FullDate == true) {
    if (daysNumber > 0) {
      var day;
      if (parseInt(date[2]) + daysNumber < 10) {
        day = "0" + (parseInt(date[2]) + daysNumber);
      } else {
        day = parseInt(date[2]) + daysNumber;
      }

      if (
        (parseInt(date[1]) == 2 && parseInt(day) > 28) ||
        (parseInt(date[1]) == 2 &&
          parseInt(day) > 29 &&
          parseInt(date[0]) % 4 == 0)
      ) {
        day = "0" + (parseInt(day) - 28);
      } else if (parseInt(date[1]) % 2 == 1 && parseInt(day) > 30) {
        day = "0" + (parseInt(day) - 30);
      } else if (parseInt(day) > 31) {
        day = "0" + (parseInt(day) - 31);
      }

      var month =
        parseInt(day) < 8
          ? parseInt(date[1]) + 1 > 12
            ? "1"
            : parseInt(date[1]) + 1
          : parseInt(date[1]) + 0;
      month = month < 10 ? "0" + month : month;

      var year = month == 1 && day < 8 ? parseInt(date[0]) + 1 : date[0];
    } else {
      daysNumber *= -1;
      var day;
      var month = parseInt(date[1]);
      if (
        parseInt(date[2]) - daysNumber < 10 &&
        parseInt(date[2]) - daysNumber > 0
      ) {
        day = "0" + (parseInt(date[2]) - daysNumber);
      } else {
        day = parseInt(date[2]) - daysNumber;
      }

      if (parseInt(date[1] - 1) == 2 && parseInt(day) < 0) {
        month = parseInt(date[1] - 1);
        day = parseInt(day) + 28;
      } else if (parseInt(date[1] - 1) % 2 == 1 && parseInt(day) < 0) {
        month = parseInt(date[1] - 1);
        day = parseInt(day) + 30;
      } else if (parseInt(date[1] - 1) % 2 == 0 && parseInt(day) < 0) {
        month = parseInt(date[1] - 1);
        day = parseInt(day) + 31;
      }
      month = month == 0 ? 12 : month;
      month = month < 10 ? "0" + month : month;

      var year = month == 12 && day > 24 ? parseInt(date[0]) - 1 : date[0];
    }
    return year + characters + month + characters + day;
  } else {
    if (daysNumber > 0) {
      var day;
      if (parseInt(date[1]) + daysNumber < 10) {
        day = "0" + (parseInt(date[1]) + daysNumber);
      } else {
        day = parseInt(date[1]) + daysNumber;
      }

      if (
        (parseInt(date[0]) == 2 && parseInt(day) > 28) ||
        (parseInt(date[0]) == 2 &&
          parseInt(day) > 29 &&
          parseInt(date.getFullYear()) % 4 == 0)
      ) {
        day = "0" + (parseInt(day) - 28);
      } else if (parseInt(date[0]) % 2 == 1 && parseInt(day) > 30) {
        day = "0" + (parseInt(day) - 30);
      } else if (parseInt(day) > 31) {
        day = "0" + (parseInt(day) - 31);
      }

      var month =
        parseInt(day) < 8
          ? parseInt(date[0]) + 1 > 12
            ? "1"
            : parseInt(date[0]) + 1
          : parseInt(date[0]) + 0;
      month = month < 10 ? "0" + month : month;
    } else {
      daysNumber *= -1;
      var day;
      var month = parseInt(date[0]);
      if (
        parseInt(date[1]) - daysNumber < 10 &&
        parseInt(date[1]) - daysNumber > 0
      ) {
        day = "0" + (parseInt(date[1]) - daysNumber);
      } else {
        day = parseInt(date[1]) - daysNumber;
      }

      if (parseInt(date[0] - 1) == 2 && parseInt(day) < 0) {
        month = parseInt(date[0] - 1);
        day = parseInt(day) + 28;
      } else if (parseInt(date[0] - 1) % 2 == 1 && parseInt(day) < 0) {
        month = parseInt(date[0] - 1);
        day = parseInt(day) + 30;
      } else if (parseInt(date[0] - 1) % 2 == 0 && parseInt(day) < 0) {
        month = parseInt(date[0] - 1);
        day = parseInt(day) + 31;
      }
      month = month == 0 ? 12 : month;
      month = month < 10 ? "0" + month : month;
    }
    return month + characters + day;
  }
}

function ToCurrentWeek(WhichPage) {
  if (parseInt(sessionStorage.getItem("NextWeek")) > 0 || JumpedWeek > 0) {
    var date = document
      .getElementsByClassName("Menu_date_date")
      [WhichPage == "Menu" ? 0 : 1].innerHTML.split("-")[0]
      .replace(/ /g, "")
      .split(".");

    var CurrentMonday = AddDayToDate(date, ". ", -7, true) + ". ";

    var date = document
      .getElementsByClassName("Menu_date_date")
      [WhichPage == "Menu" ? 0 : 1].innerHTML.split("-")[1]
      .replace(/ /g, "")
      .split(".");

    var CurrentFriday = AddDayToDate(date, ". ", -7, false) + ". ";

    document.getElementsByClassName("Menu_date_date")[
      WhichPage === "Menu" ? 0 : 1
    ].innerHTML = CurrentMonday + " - " + CurrentFriday;

    if (WhichPage != "Menu") {
      if (document.getElementById("mainResignByMenu").style.display != "none") {
        NextWeekOrNot = 1;
        for (let index = 0; index < ResignOrNot.length; index++) {
          ChosenDayResign(Days[index], index);
        }
      }
      sessionStorage.setItem(
        "NextWeek",
        parseInt(sessionStorage.getItem("NextWeek")) - 1
      );
      if (parseInt(sessionStorage.getItem("NextWeek") < 0))
        sessionStorage.setItem("NextWeek", 0);
      MenuLoader(
        MenuPerWeek,
        parseInt(sessionStorage.getItem("NextWeek")),
        "ResignMenu"
      );
    } else {
      JumpedWeek--;
      MenuLoader(MenuPerWeek, JumpedWeek, "Menu");
    }
  }
}

function ThisMondayDate() {
  
  var Year = date.getFullYear();
  Month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  Day =
    (date.getDate() - date.getDay() + 1 < 10 ? "0" : "") +
    (date.getDate() - date.getDay() + 1);
  var PreviousMonday = Year + "-" + Month + "-" + Day;

  if(date.getDay() > 5)
  {
    return AddDayToDate(PreviousMonday.split('-'),'-',7,true);
  }

  return PreviousMonday;
}

function ThisFridayDate() {
  var Year = date.getFullYear();
  Month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  Day =
    (date.getDate() - date.getDay() + 5 < 10 ? "0" : "") +
    (date.getDate() - date.getDay() + 5);
  var PreviousFriday = Month + "-" + Day;

  if(date.getDay() > 5)
  {
    return AddDayToDate(PreviousFriday.split('-'),'-',7,false);
  }

  return PreviousFriday;
}

function NowDate() {
  var Year = date.getFullYear();
  Month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  Day = (date.getDate() < 10 ? "0" : "") + date.getDate();
  var Now = Year + "-" + Month + "-" + Day;
  return Now;
}

function LogingIn() {

  var User = JSON.parse(sessionStorage.getItem("SavedUser"));
  if (
    (document.getElementById("User").value == User.username &&
      document.getElementById("Pass").value == DeCoder(User.password)) ||
    Logined == "true;"
  ) {
    sessionStorage.setItem("Logined", "true;");
    localStorage.removeItem("ToPageUser");
    document.title = "Food-WEB : " + User.name;
    document.getElementById("username").innerHTML = User.name;
    if (sessionStorage.getItem("CurrentPage") == "Login") {
      sessionStorage.setItem("CurrentPage", "MenuPage");
    }
    PageChanger(null, sessionStorage.getItem("CurrentPage"));
    TicketDataLoader(User);
    PersonalDataLoader(User);
    MenuLoader(MenuPerWeek, 0, "Menu");
  } else {
    LogingOut();
  }
}

function LogingOut() {
  // sessionStorage.setItem("Logined", "false;");
  // sessionStorage.setItem("SavedUser", "");
  // window.location.href = "index.html";
}

function PageChanger(e, saved) {
  for (const item of document.getElementsByClassName("PageChanger")) {
    item.style = "color: black";
    item.style.backgroundColor = "none";
  }
  if (e != null) {
    for (const item of document.getElementsByClassName("PageChanger")) {
      item.style = "color: black";
      e.style.backgroundColor = "";
    }

    if (e.className.includes("drpdown")) {
      e.style =
        "background-image: linear-gradient(to right, #adf7b0 10%, #ffffff00 90%)";
    } else {
      e.style = "color: white";
    }
  } else {
    try {
      if (
        document
          .getElementById(sessionStorage.getItem("CurrentPage"))
          .className.includes("drpdown")
      ) {
        document.getElementById(sessionStorage.getItem("CurrentPage")).style =
          "background-image: linear-gradient(to right, #adf7b0 10%, #ffffff00 90%)";
      } else {
        document.getElementById(
          sessionStorage.getItem("CurrentPage")
        ).style.color = "white";
      }
    } catch (error) {}
  }
  saved = e != null ? e.id : saved;
  switch (saved) {
    case "MenuPage":
      document.getElementById("LoginMain").style.display = "none";
      document.getElementById("MenuMain").style.display = "block";
      document.getElementById("ResignMain").style.display = "none";
      document.getElementById("TicketMain").style.display = "none";
      document.getElementById("PasswordMain").style.display = "none";
      document.getElementById("PaymentMain").style.display = "none";
      document.getElementById("ReportMain").style.display = "none";
      sessionStorage.setItem("CurrentPage", "MenuPage");
      break;
    case "ResignPage":
      document.getElementById("LoginMain").style.display = "none";
      document.getElementById("MenuMain").style.display = "none";
      document.getElementById("ResignMain").style.display = "block";
      document.getElementById("TicketMain").style.display = "none";
      document.getElementById("PasswordMain").style.display = "none";
      document.getElementById("PaymentMain").style.display = "none";
      document.getElementById("ReportMain").style.display = "none";
      sessionStorage.setItem("CurrentPage", "ResignPage");
      MenuLoader(MenuPerWeek, 0, "ResignMenu");
      break;
    case "TicketPage":
      document.getElementById("LoginMain").style.display = "none";
      document.getElementById("MenuMain").style.display = "none";
      document.getElementById("ResignMain").style.display = "none";
      document.getElementById("TicketMain").style.display = "block";
      document.getElementById("PasswordMain").style.display = "none";
      document.getElementById("PaymentMain").style.display = "none";
      document.getElementById("ReportMain").style.display = "none";
      sessionStorage.setItem("CurrentPage", "TicketPage");
      break;
    case "PersonalData":
      document.getElementById("LoginMain").style.display = "none";
      document.getElementById("MenuMain").style.display = "none";
      document.getElementById("ResignMain").style.display = "none";
      document.getElementById("TicketMain").style.display = "none";
      document.getElementById("PasswordMain").style.display = "block";
      document.getElementById("PaymentMain").style.display = "none";
      document.getElementById("ReportMain").style.display = "none";
      sessionStorage.setItem("CurrentPage", "PersonalData");
      break;
    case "PaymentPage":
      document.getElementById("LoginMain").style.display = "none";
      document.getElementById("MenuMain").style.display = "none";
      document.getElementById("ResignMain").style.display = "none";
      document.getElementById("TicketMain").style.display = "none";
      document.getElementById("PasswordMain").style.display = "none";
      document.getElementById("PaymentMain").style.display = "block";
      document.getElementById("ReportMain").style.display = "none";
      sessionStorage.setItem("CurrentPage", "PaymentPage");
      break;
    case "ReportPage":
      document.getElementById("LoginMain").style.display = "none";
      document.getElementById("MenuMain").style.display = "none";
      document.getElementById("ResignMain").style.display = "none";
      document.getElementById("TicketMain").style.display = "none";
      document.getElementById("PasswordMain").style.display = "none";
      document.getElementById("PaymentMain").style.display = "none";
      document.getElementById("ReportMain").style.display = "block";
      sessionStorage.setItem("CurrentPage", "ReportPage");
      break;

    default:
      break;
  }
}

function TicketDataLoader(User) {
  document.getElementById("Ticket_name").innerHTML = User.name;
  document.getElementById("Ticket_class").innerHTML = User.Userclass;
  if (User.paid == "true") {
    document.getElementById("Ticket_info").innerHTML =
      "<strong>Befizetve</strong>";
  } else {
    document.getElementById("Ticket_info").innerHTML =
      "<strong>Nincs befizetve</strong>";
  }
}

function PersonalDataLoader(User)
{
  document.getElementById('secondName').innerHTML = User.name.split(' ')[0];
  document.getElementById('firstName').innerHTML = User.name.split(' ')[1];
  if(User.name.split(' ').length > 2){document.getElementById('lastName').innerHTML = User.name.split(' ')[2];}
  document.getElementById('schoolOM').innerHTML = User.schoolOM;
  document.getElementById('userClass').innerHTML = User.Userclass;
  document.getElementById('userEmail').innerHTML = User.email;
  document.getElementById('userName').innerHTML = User.username;
}

function MenuLoader(MenuPerWeek, whichWeek, whichPage) {
  index = 0;
  for (const item of Days) {
    try {
      document.querySelector(
        "." + whichPage + " ." + item + " .starter"
      ).innerHTML = MenuPerWeek[index + whichWeek * 5].split(";")[0];
    } catch (error) {
      console.log(error);
    }

    try {
      document.querySelector(
        "." + whichPage + " ." + item + " .main"
      ).innerHTML = MenuPerWeek[index + whichWeek * 5].split(";")[1];
    } catch (error) {
      console.log(error);
    }

    var addSpacingArray = document
      .querySelector("." + whichPage + " ." + item + " .main")
      .innerHTML.split(" ");
    if (!addSpacingArray.includes("<br>")) {
      var addSpacing = "";
      var addSpacingIndex = 0;
      for (const word of addSpacingArray) {
        if (addSpacingIndex == addSpacingArray.length - 1) {
          addSpacing += "<br>";
        }
        addSpacingIndex++;
        addSpacing += word + " ";
      }
      document.querySelector(
        "." + whichPage + " ." + item + " .main"
      ).innerHTML = addSpacing;
    }

    try {
      document.querySelector(
        "." + whichPage + " ." + item + " .dessert"
      ).innerHTML = MenuPerWeek[index + whichWeek * 5].split(";")[2];
    } catch (error) {
      console.log(error);
    }

    try {
      var Includes = [
        "Energia: 400 Kcal",
        "Fehérje: 400 Kcal",
        "Zsír: 400 Kcal",
        "T.zsírsav: 400 Kcal",
        "Szénhidrát: 400 Kcal",
        "Cukor: 200 Kcal",
        "Só: 400 Kcal",
        "Allergánek: 1,5,8",
      ];
      for (let incIndex = 0; incIndex < 8; incIndex++) {
        if (
          document.querySelector("." + whichPage + " ." + item + "-select")
            .children.length < 9
        ) {
          var opt = document.createElement("option");
          opt.innerHTML = Includes[incIndex];
          document
            .querySelector("." + whichPage + " ." + item + "-select")
            .appendChild(opt);
        }
      }
    } catch (error) {
      
    }

    

    index++;
  }
  CurrentDayColorize();
}



ResignOrNot = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
Dates = [];
NextWeekOrNot = 1;

function ChosenDayResign(whichDay, whichBool) {
  if (!Chosable[whichBool + (NextWeekOrNot - 1) * 5]) {
    try {
      document.getElementById(whichDay).style.backgroundImage =
        "linear-gradient(to top, #2d2d2d, #ffffff00)";
      document.getElementById("cb_" + whichDay).disabled = true;
      document.getElementsByClassName(whichDay + '-select')[1].disabled = true;
      document.getElementById("cb_" + whichDay).checked = false;
    } catch (error) {}
  } else {
    if (!ResignOrNot[whichBool + (NextWeekOrNot - 1) * 5]) {
      try {
        document.getElementById(whichDay).style.backgroundImage = "";
        document.getElementById("cb_" + whichDay).checked = false;
        document.getElementById("cb_" + whichDay).disabled = false;
      } catch (error) {}
    } else if (ResignOrNot[whichBool + (NextWeekOrNot - 1) * 5]) {
      try {
        document.getElementById(whichDay).style.backgroundImage =
          "linear-gradient(to bottom, #cc1515, #ffffff00)";
        document.getElementById("cb_" + whichDay).checked = true;
        document.getElementById("cb_" + whichDay).disabled = false;
      } catch (error) {}
    }
  }
}

function ChoseADay(whichDay, whichBool) {
  if (ResignOrNot[whichBool + (NextWeekOrNot - 1) * 5]) {
    ResignOrNot[whichBool + (NextWeekOrNot - 1) * 5] = false;
  } else {
    ResignOrNot[whichBool + (NextWeekOrNot - 1) * 5] = true;
  }
  ChosenDayResign(whichDay, whichBool);
}

function WhichDayIsNotChosable() {
  this.Chosable = [true, true, true, true, true, true, true, true, true, true];
  for (let index = 0; index < Days.length; index++) {
    if (date.getDay() > 5 || date.getDay() == 0) {
      try {
        document.getElementById("cb_" + Days[0]).disabled = true;
        Chosable[0] = false;
      } catch (error) {}
    } else if (
      date.getDay() == 5 &&
      (date.getHours() > 8 || (date.getHours == 8 && date.getMinutes > 30))
    ) {
      try {
        document.getElementById("cb_" + Days[0]).disabled = true;
        Chosable[0] = false;
      } catch (error) {}
    } else if (index <= date.getDay() - 1) {
      try {
        document.getElementById("cb_" + Days[index]).disabled = true;
        Chosable[index] = false;
      } catch (error) {}
    } else if (
      (date.getHours() == 8 && date.getMinutes() > 30) ||
      date.getHours() > 8
    ) {
      try {
        document.getElementById("cb_" + Days[index]).disabled = true;
        Chosable[index] = false;
      } catch (error) {}
      ChosenDayResign(Days[index], index);
      break;
    }
    ChosenDayResign(Days[index], index);
  }

  return Chosable;
}

function ResignByChanger(e)
{
  document.getElementById("mainResignByMenu").style.display = "none";
  document.getElementById("mainResignByDate").style.display = "none";

  document.getElementById("ResignByDateSpan").style = "";
  document.getElementById("ResignByMenuSpan").style = "";

  document.getElementById("main"+e.id).style.display = "block";
  document.getElementById(e.id + "Span").style = "color:white; letter-spacing: 3px;";
}

function ResignButtonClicked(whichBtn) {
  var dataRow = "";
  if (whichBtn == "ByMenu") {
    for (let index = 0; index < ResignOrNot.length; index++) {
      if (ResignOrNot[index]) {
        dataRow += Dates[index] + ";";
      }
    }
  } else {
    dataRow += document.getElementById("FirstDay").value + ";";
    if (!document.getElementById("JustOneDay").checked) {
      var index = 1;
      while (
        parseInt(document.getElementById("LastDay").value.split("-")[2]) >
        parseInt(
          dataRow.split(";")[dataRow.split(";").length - 2].split("-")[2]
        )
      ) {
        dataRow +=
          AddDayToDate(dataRow.split(";")[0].split("-"), "-", index, true) +
          ";";
        index++;
      }
    }
  }

  ModalApperence('Figyelem','<div class="d-flex align-items-center"><strong>A lemondás folyamatban van!</strong><div class="spinner-border ms-auto" role="status" aria-hidden="true"></div></div>',infoIcon);

  
  ResignOrNot = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  for (const day of Days) {
    document.getElementById('cb_' + day).checked = false;
    ChosenDayResign(day,Days.indexOf(day));
  }
}

function DayChecking(e) {
  var dates =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + date.getMonth() + 1
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  if (e.value < dates) {
    e.value = dates;
    
    ModalApperence("Hiba", "Nem megfelelő dátum!", errorIcon);
  }
}

function JustOneDayResign() {
  document.getElementById("LastDay").disabled =
    document.getElementById("JustOneDay").checked;
}

for (const selects of document.getElementsByClassName("contains")) {
  selects.addEventListener("change", ContainsSubstitle);
}

function ContainsSubstitle() {
  for (const classes of document.getElementsByClassName("contains")) {
    classes.value = 0;
  }
}

var requiredMeal = [];
var MealValues = [600, 800, 1200, 800, 700];
var MealValue =
  0 +
  parseInt(
    document.getElementById("card_amount").innerHTML.toString().split(" ")[0]
  );

function RequiredMealAdd(e) {
  if (requiredMeal.includes(e.id)) {
    requiredMeal.splice(requiredMeal.indexOf(e.id), 1);
    MealValue -= MealValues[e.id.toString().split("-")[1] - 1];

    document.getElementById(
      "amount_" + e.id.toString().split("-")[1]
    ).innerHTML = "0 Ft";
    e.className = "btn btn-success";
    e.innerHTML = "+";
  } else {
    requiredMeal.push(e.id);
    MealValue += MealValues[e.id.toString().split("-")[1] - 1];
    document.getElementById(
      "amount_" + e.id.toString().split("-")[1]
    ).innerHTML = MealValues[e.id.toString().split("-")[1] - 1] + " Ft";
    e.className = "btn btn-danger";
    e.innerHTML = "-";
  }
  document.getElementById("total").innerHTML =
    MealValue == 0 ? 0 + " Ft" : MealValue + " Ft";
}

var CardIndex = 4;

function CardNumberCorrecter(e) {
  OnlyNumbersAllow(e, " ");
  if (e.value.length < 5) {
    CardIndex = 4;
  }
  if (e.value.length >= CardIndex && e.value.length < 19) {
    CardIndex += 5;
    e.value += " ";
  }
  try {
    if (e.value.split(" ")[0] == "5321") {
      document.getElementById("MasterCard_icon").style.display = "block";
    } else {
      document.getElementById("MasterCard_icon").style.display = "none";
    }
  } catch (error) {
    document.getElementById("MasterCard_icon").style.display = "none";
  }
}

wasOver = false;

function CardExpiryCorrecter(e)
{
  OnlyNumbersAllow(e,'/');
  
  if (e.value.length == 2 && wasOver == false) {
    e.value += "/";
    wasOver = true;
  }
  if(e.value.length < 2)
  {
    wasOver = false;
  }
}

function OnlyNumbersAllow(e, allowCharacter) {
  var OnlyNumbers = "";
  for (const letter of e.value) {
    if (!isNaN(parseInt(letter)) || letter == allowCharacter) {
      OnlyNumbers += letter;
    }
  }
  e.value = OnlyNumbers;
}

function AddCardFormOpen(type) {
  document.getElementById('addCardBtn').className = document.getElementById('addCardBtn').className + ' _' + type;
  document.getElementById("CardAdd").style.display = "block";
}

function AddCardFormClose() {
  document.getElementById("CardAdd").style.display = "none";
}

function AddCard() {
  if(document.getElementById('addCardBtn').className.includes('_n'))
  {
    document.getElementById("CardId").innerHTML = "MasterCard";
    document.getElementById("CardNumber").innerHTML =
      "**** " +
      document.getElementById("card_number").value.toString().split(" ")[3];
  }else
  {
    document.getElementById('cardNumber').value = document.getElementById("card_number").value;
    document.getElementById('cardName').value = document.getElementById("card_name").value;
    document.getElementById('cardExpiry').value = document.getElementById("card_expiry").value;
  }
  
  AddCardFormClose();
}

function CardDataDelete()
{
  document.getElementById('cardNumber').value = "";
  document.getElementById('cardName').value = "";
  document.getElementById('cardExpiry').value ="";
  document.getElementById('bankName').value = "";

  ModalApperence('Információ','A bankkártya adatai sikeresn törölve!',infoIcon);
}

function Pay() {
  
  ModalApperence(
    "Fizetés",
    '<div class="d-flex align-items-center"><strong>Fizetés...</strong><div class="spinner-border ms-auto" role="status" aria-hidden="true"></div></div>',
    payIcon
  );
}


function ModalApperence(ErrorName, ErrorText, ErrorIcon) {
  document.getElementById("Error_Modal").style.display = "block";

  document.getElementById("Modal_title").innerHTML =
    ErrorIcon + " " + ErrorName;
  document.getElementById("Modal_text").innerHTML = ErrorText;
}

function PasswordChange() {
  if (
    document.getElementById("newPass").value &&
    document.getElementById("oldPass").value &&
    document.getElementById("oldPass").value ==
      DeCoder(sessionStorage.getItem("SavedUser")).split(";")[1]
  ) {
    var icon =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="mb-1 bi bi-check2-circle" viewBox="0 0 16 16">' +
      '<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>' +
      '<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>' +
      "</svg>";
    ModalApperence(
      "Jelszó módosítás",
      "A jelszó változtatás sikeres volt!",
      icon
    );
    document.getElementById("newPass").value =
    document.getElementById("oldPass").value = "";
  } else {
    var ErrorIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="mb-1 bi bi-exclamation-triangle" viewBox="0 0 16 16"><path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/><path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg>';
    ModalApperence("Hiba", "Nem megfelelő jelszó!", ErrorIcon);
  }
}

function ReportSend()
{
  var where = document.getElementById('whereReport').value;
  var text = document.getElementById('reportText').value;
  if(where == "" || text == "")
  {
    ModalApperence("Figyelem", "Kérem töltse ki a jelentést!", errorIcon);
  }else
  {
    document.getElementById('whereReport').value = "";
    document.getElementById('reportText').value = "";
    ModalApperence("Hiba jelentve", "Köszönjük a jelentését!", infoIcon);
  }
  
}

function Coder(Data) {
  try {
    var newData = "";
    for (let index = 0; index < Data.length; index++) {
      newData += String.fromCharCode(Data.charCodeAt(index) + (index - 50));
    }
    return newData;
  } catch (error) {
    console.log(error);
  }
  return "";
}

function DeCoder(Data) {
  try {
    var newData = "";
    for (let index = 0; index < Data.length; index++) {
      newData += String.fromCharCode(Data.charCodeAt(index) - (index - 50));
    }
    return newData;
  } catch (error) {
    console.log(error);
  }
  return "";
}
