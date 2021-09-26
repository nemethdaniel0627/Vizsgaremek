var DarkModeOn = true;
var Logined = "false;";
var SavedUser = "";
var CurrentPage = "Login";
var Days = ["Hetfo", "Kedd", "Szerda", "Csutortok", "Pentek"];
var MenuPerDay = ["Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta"]

var date = new Date();
var opacity = [1,1,1,1];

function PageLoaded()
{
    Logined = sessionStorage.getItem("Logined") == null ? "false;" : sessionStorage.getItem("Logined");
    CurrentPage = sessionStorage.getItem("CurrentPage") == null ? "Login" : sessionStorage.getItem("CurrentPage");
    sessionStorage.setItem("SavedUser", localStorage.getItem("ToPageUser") == null || localStorage.getItem("ToPageUser") == "" ? "" : localStorage.getItem("ToPageUser"));
    sessionStorage.setItem("Logined", sessionStorage.getItem("SavedUser") == null || sessionStorage.getItem("SavedUser") == "" ? "false;" : "true;");
    Logined = sessionStorage.getItem("Logined");
    
    if (sessionStorage.getItem("DarkModeOn") == "true") {
        document.getElementById("Dark_check").checked = true;
        DarkModeStyleChange();
    }
    
    
    if (!MobileMode()) {
        document.getElementById("Menu_date").value = MenuDateLoader();    
    }

    if (Logined.split(';')[0] == "true") {
        LogingIn();
    }else
    {
        LastPage(sessionStorage.getItem('CurrentPage'));
        localStorage.setItem("ToPageUser","");
        LogingOut();
    }
    
    document.getElementById("FirstDay").value = Now();
    document.getElementById("LastDay").value = Now();
    document.querySelector(".date p").innerHTML = "Dátum: " + Now().toString().split('-')[0] + "." + Now().toString().split('-')[1] + "." + Now().toString().split('-')[2] + ".";
	
    CurrentDayColorize();
    
    MobileMode();

}

function DarkModeStyleChange(){
    var css;
    var DarkModeIcon;
    
    if (DarkModeOn) {
        css = "./Styles/dark.css";
        DarkModeIcon = "./Images/ToDark.png";
        DarkModeOn = false;
        sessionStorage.setItem("DarkModeOn", "true");
    }else{
        css = "./Styles/default.css";
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

    CurrentDayColorize();
}

function MobileMode() {
    if (document.body.clientWidth < 768) {
        document.getElementById("Menu").style.marginTop = "20px";
        document.getElementById("front").style.width = "300px";
        document.getElementById("Ticket_img").style.left = "250%";
        document.getElementById("front").style.height = "300px";
        document.getElementById("DarkMode").style.marginRight = "5px";
        document.getElementById("Menu_calendar").style.display = "none";
        document.querySelector("#AllMenu h1").style.width = "100%";
        document.querySelector("#AllMenu h1").style.marginLeft = "0";
        document.getElementById("Resign").style.width = "90%";
        document.getElementById("Resign_h1").style.fontSize = "40px";
        document.querySelector("#Resign div").style.marginLeft = "30px";
        document.getElementById("FirstDay").style.marginLeft = "-20%";
        document.getElementById("FirstDay").style.marginBottom = "5%";
        document.getElementById("LastDay").style.marginLeft = "-30%";
        document.getElementById("Resign_btn").style.width = "50%";
        for (const item of document.getElementsByClassName("Weekday")) {
            item.style.backgroundImage =
            "linear-gradient(to bottom, #adf7b0, #FFFFFF)";
        }
        NotUsedDayDelete();
        return true;
    }
    return false;
}

function CurrentDayColorize()
{
    if(DarkModeOn)
    {
        document.getElementById(CurrentDayPicker()).style.backgroundImage = "linear-gradient(to bottom, #adf7b0, #FFFFFF)";
    }else{
        document.getElementById(CurrentDayPicker()).style.backgroundImage = "linear-gradient(to bottom, #6a8f6b, #1D2D44)";
    }
}

function CurrentDayPicker()
{
    return Days[date.getDay() - 1 < 0 || date.getDay() - 1 > 5 ? 0 : date.getDay() - 1];
}

function NotUsedDayDelete()
{
	for (const day of Days) {
        if(CurrentDayPicker() != day)
        {
            document.getElementById(day).style.display="none";
        }
    }
}

function ToNextWeek() {
    var Year = date.getFullYear();
        month =
            (date.getMonth() + 1 < 10 ? "0" : "") +
            (date.getDate() + 1 < 7 ? date.getMonth() + 2 : date.getMonth() + 1);
        day =
            (date.getDate() - date.getDay() + 1 < 10 ? "0" : "") +
            (date.getDate() - date.getDay() + 8);
    var NextMonday = Year + "-" + month + "-" + day;
    document.getElementById("Menu_date").value = NextMonday;
}

function ToCurrentWeek() {
    var _date = MenuDateLoader.toString().split('-');
    var CurrentMonday = _date[0] + "-" + _date[1] + "-" + parseInt(_date[2]);
    document.getElementById("Menu_date").value = MenuDateLoader();
}

function MenuDateLoader()
{
    var Year = date.getFullYear();
        Month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
        Day = (date.getDate() - date.getDay() + 1 < 10 ? "0" : "") + (date.getDate() - date.getDay() + 1);
    var PreviousMonday = Year + "-" + Month + "-" + Day;
    return PreviousMonday;
}

function DayCheckingFirst()
{
	if(parseInt(document.getElementById("FirstDay").value.toString().split('-')[2]) < parseInt(Now().toString().split('-')[2]))
	{
		document.getElementById("FirstDay").value = Now();
		alert("Nem megfelelő a dátum!","Food-web");
	}	
}

function DayCheckingLast()
{
	if(parseInt(document.getElementById("LastDay").value.toString().split('-')[2]) < parseInt(Now().toString().split('-')[2]))
	{
		document.getElementById("LastDay").value = Now();
		alert("Nem megfelelő a dátum!","Food-web");
	}	
}

function Now()
{
    var Year = date.getFullYear();
        Month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
        Day = (date.getDate() < 10 ? "0" : "") + (date.getDate());
    var Now = Year + "-" + Month + "-" + Day;
    return Now;
}

function LogingIn() {
    var User = sessionStorage.getItem("SavedUser").split(';');
    console.log(Logined);
    if ((document.getElementById("User").value == User[0] && document.getElementById("Pass").value == User[1]) || Logined == "true;") {
        var saving = "";
        for (const item of User) {
            saving += item + ";";
        }
        sessionStorage.setItem("SavedUser", saving);
        sessionStorage.setItem("Logined", "true;");
        document.title = "Food-WEB : " + User[2];
        for (const Button of document.getElementsByClassName("Login_button")) {
            Button.innerHTML = "<img src='./Images/UserIcon.png' style='height: 25px; width: auto;' alt=''> " + User[2];
        }
        if (sessionStorage.getItem("CurrentPage") == "Login") {
            sessionStorage.setItem("CurrentPage","Menu");
        }
        LastPage(sessionStorage.getItem("CurrentPage"));
        TicketDataLoader(User);
        MenuLoader(MenuPerDay);
    }else{
        alert("Nincs ilyen felhasználó és jelszó párosítás!");
    }
}

function LogingOut() {
    sessionStorage.setItem("Logined", "false;");
    sessionStorage.setItem("CurrentPage","Login");
    sessionStorage.setItem("SavedUser","");
    //LastPage(sessionStorage.getItem("CurrentPage"));
    document.title = "Food-WEB";

    window.location.href = "index.html";
}

function LastPage(LastPage) {
    switch (LastPage) {
        case "Login":
            LoginPage();
            break;
        case "Menu":
            MenuPage();
            break;
        case "Resign":
            ResignPage();
            break;
        case "Ticket":
            TicketPage();
            break;        
        default:
            LoginPage();
            break;
    }
}

function LoginPage() {
    document.getElementById("LoginMain").style = "none";
    document.getElementById("MenuMain").style.display = "none";
    document.getElementById("ResignMain").style.display = "none";
    document.getElementById("TicketMain").style.display = "none";
    sessionStorage.setItem("CurrentPage", "Login");
}

function MenuPage() {
    document.getElementById("LoginMain").style.display = "none";
    document.getElementById("MenuMain").style = "none";
    document.getElementById("ResignMain").style.display = "none";
    document.getElementById("TicketMain").style.display = "none";
    sessionStorage.setItem("CurrentPage", "Menu");
}

function ResignPage() {
    document.getElementById("LoginMain").style.display = "none";
    document.getElementById("MenuMain").style.display = "none";
    document.getElementById("ResignMain").style = "none";
    document.getElementById("TicketMain").style.display = "none";
    sessionStorage.setItem("CurrentPage", "Resign");
}

function TicketPage() {
    document.getElementById("LoginMain").style.display = "none";
    document.getElementById("MenuMain").style.display = "none";
    document.getElementById("ResignMain").style.display = "none";
    document.getElementById("TicketMain").style = "none";
    sessionStorage.setItem("CurrentPage", "Ticket");
}

function TicketDataLoader(User) {
    document.getElementById("Ticket_name").innerHTML = User[2];
    document.getElementById("Ticket_class").innerHTML = User[3];
    if (User[4] == "true") {
        document.getElementById("Ticket_info").innerHTML = "<strong>Befizetve</strong>";
    }else{
        document.getElementById("Ticket_info").innerHTML = "<strong>Nincs befizetve</strong>";
    }
}

function MenuLoader(MenuPerDay) {
    index = 0;
    for (const item of Days) {
        document.querySelector("#" + item + " .starter").innerHTML =
        MenuPerDay[index].split(';')[0];;
        document.querySelector("#" + item + " .main").innerHTML =
        MenuPerDay[index].split(';')[1];
        index++;
    }
}

function OpenForm() {
    document.getElementById("myForm").style.display = "block";
}

function CloseForm() {
    document.getElementById("myForm").style.display = "none";
}

function OnlyOneDay() {
    document.getElementById("LastDay").disabled =
      document.getElementById("OnlyOne").checked;
}