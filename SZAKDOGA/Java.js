var DarkModeOn = true;
var Logined = "false;";
var SavedUser = "";
var CurrentPage = "Login";
var Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var MenuPerDay = ["Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta"]

var date = new Date();
var opacity = [1,1,1,1];

function PageLoaded()
{
    Logined = sessionStorage.getItem("Logined") == null ? "false;" : sessionStorage.getItem("Logined");
    CurrentPage = sessionStorage.getItem("CurrentPage") == null ? "Login" : sessionStorage.getItem("CurrentPage");
    sessionStorage.setItem("SavedUser", localStorage.getItem("ToPageUser") == "" ? sessionStorage.getItem("SavedUser") : localStorage.getItem("ToPageUser"));
    sessionStorage.setItem("Logined", sessionStorage.getItem("SavedUser") == null || sessionStorage.getItem("SavedUser") == "" ? "false;" : "true;");
    Logined = sessionStorage.getItem("Logined");
    index2 = 1;
    for (let index = 0; index < ResignOrNot.length; index++) {
        if (index < 5) {
            if (date.getMonth() == 1 && parseInt(MenuDateLoader().split('-')[2]) + index > 28) {
                Dates[index] = index2++;
            }
            else if (date.getMonth() % 2 == 0 && parseInt(MenuDateLoader().split('-')[2]) + index > 30) {
                Dates[index] = index2++; 
            }
            else if(parseInt(MenuDateLoader().split('-')[2]) + index > 31)
            {
                Dates[index] = index2++;   
            }
            else
            {
                Dates[index] = parseInt(MenuDateLoader().split('-')[2]) + index;
            }
            
        }
        else
        {
            if (date.getMonth() == 1 && parseInt(MenuDateLoader().split('-')[2]) + index + 2 > 28) {
                Dates[index] = index2++;   
            }
            else if (date.getMonth() % 2 == 0 && parseInt(MenuDateLoader().split('-')[2]) + index + 2 > 30) {
                Dates[index] = index2++;   
            }
            else if(parseInt(MenuDateLoader().split('-')[2]) + index + 2 > 31)
            {
                Dates[index] = index2++;   
            }else
            {
                Dates[index] = parseInt(MenuDateLoader().split('-')[2]) + index + 2;
            }
        }
        
    }
    if (sessionStorage.getItem("DarkModeOn") == "true") {
        document.getElementById("Dark_check").checked = true;
        DarkModeStyleChange();
    }
    
    for (const classses of document.getElementsByClassName("Menu_date")) {
        classses.value = MenuDateLoader();
    } 

    if (Logined.split(';')[0] == "true") {
        LogingIn();
    }else
    {
        LastPage(sessionStorage.getItem('CurrentPage'));
        localStorage.setItem("ToPageUser","");
        LogingOut();
    }
    LastPage(sessionStorage.getItem('CurrentPage'));
    document.getElementById("FirstDay").value = Now();
    document.getElementById("LastDay").value = Now();
    document.querySelector(".date p").innerHTML = "Dátum: " + Now().toString().split('-')[0] + "." + Now().toString().split('-')[1] + "." + Now().toString().split('-')[2] + ".";
	
    CurrentDayColorize();
    
    MobileMode();

    WhichDayIsNotChosable();

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
        for (const classes of document.getElementsByClassName("Menu")) {
            classes.style.marginTop = "20px";
        }
        
        document.getElementById("front").style.width = "300px";
        document.getElementById("Ticket_img").style.left = "250%";
        document.getElementById("front").style.height = "300px";
        document.getElementById("DarkMode").style.marginRight = "5px";
        for (const classes of document.getElementsByClassName("Menu_calendar")) {
            classes.style.display = "none";
        }
        
        document.querySelector("#AllMenu h1").style.width = "100%";
        document.querySelector("#AllMenu h1").style.marginLeft = "0";
        
        document.querySelector("#ResginMenu h1").style.width = "100%";
        document.querySelector("#ResginMenu h1").style.marginLeft = "0";
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
        document.getElementsByClassName(CurrentDayPicker())[0].style.backgroundImage = "linear-gradient(to bottom, #adf7b0, #FFFFFF)";
    }else{
        document.getElementsByClassName(CurrentDayPicker())[0].style.backgroundImage = "linear-gradient(to bottom, #6a8f6b, #1D2D44)";
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
            for (const dayclasses of document.getElementById(day)) {
                dayclasses.style.display="none";
            }
            
        }
    }
}

function ToNextWeek() {
    var date = document.getElementsByClassName("Menu_date")[0].value.split('-');

    var day;
    if ((parseInt(date[2]) + 7) < 10) {
        day = "0" + (parseInt(date[2]) + 7);
    }else
    {
        day = parseInt(date[2]) + 7;
    }

    if ((parseInt(date[1]) == 2 && parseInt(day) > 28) ||(parseInt(date[1]) == 2 && parseInt(day) > 29 && parseInt(date[0]) % 4 == 0)) {
        day = "0" +(parseInt(day) - 28);
        console.log("F");
    }
    else if (parseInt(date[1]) % 2 == 1 && parseInt(day) > 30) {
        day = "0" + (parseInt(day) - 30);
        console.log("%2");
    }
    else if(parseInt(day) > 31)
    {
        day = "0" + (parseInt(day) - 31);
        console.log("N");   
    }

    var month = (parseInt(day) < 8 ? (parseInt(date[1]) + 1 > 12 ? "1" : parseInt(date[1]) + 1) : parseInt(date[1]) + 0);
        month = month < 10 ? ("0"+month) : month;

    var year = month == 1 && day < 8 ? parseInt(date[0]) + 1 : date[0];

    var NextMonday = year + "-" + month + "-" + day;

    for (const classses of document.getElementsByClassName("Menu_date")) {
        classses.value = NextMonday;
    }
    if (document.getElementById("ResignMain").style.display != "none") {
        NextWeekOrNot = 2;
        for (let index = 0; index < ResignOrNot.length; index++) {
            ChosenDayResign(Days[index],index);
        }
    }
    
}

function ToCurrentWeek() {
    if (parseInt(document.getElementsByClassName("Menu_date")[0].value.split('-')[2]) > parseInt(Now().split('-')[2]) || parseInt(document.getElementsByClassName("Menu_date")[0].value.split('-')[1]) > parseInt(Now().split('-')[1]) || parseInt(document.getElementsByClassName("Menu_date")[0].value.split('-')[2]) > parseInt(Now().split('-')[0]) ) {
        var date = document.getElementsByClassName("Menu_date")[0].value.split('-');
        console.log(date);
        var day;
        if ((parseInt(date[2]) - 7) < 10 && parseInt(date[2])-7 > 0) {
            day = "0" + (parseInt(date[2]) - 7);
        }else
        {
            day = parseInt(date[2]) - 7;
        }
        console.log(day);
        if ((parseInt(date[1]) == 2 && parseInt(day) < 0) || (parseInt(date[1]) == 2 && parseInt(day) > 29 && parseInt(date[0]) % 4 == 0)) {
            day = (28 + parseInt(day)+1);
            console.log("F");
        }
        else if (parseInt(date[1]) % 2 == 0 && parseInt(day) < 0) {
            day = (30 + parseInt(day));
            console.log("%2");
        }
        else if(parseInt(day) < 0)
        {
            console.log( parseInt(day));
            day = (31 + parseInt(day));
            console.log("N");   
        }
    
        var month = (parseInt(day) > 23 ? (parseInt(date[1]) - 1 < 1 ? 12 : parseInt(date[1]) - 1) : parseInt(date[1]) - 0);
            month = month < 10 ? ("0"+month) : month;
    
        var year = month == 12 && day > 24 ? parseInt(date[0]) - 1 : date[0];
    
        var CurrentMonday = year + "-" + month + "-" + day;
        console.log(CurrentMonday);
        for (const classses of document.getElementsByClassName("Menu_date")) {
            classses.value = CurrentMonday;
        } 
        if (document.getElementById("ResignMain").style.display != "none") {
            NextWeekOrNot = 1;
            for (let index = 0; index < ResignOrNot.length; index++) {
                ChosenDayResign(Days[index],index);
            }
        } 
    }
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
        case "Password":
            PassWordPage();
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
    document.getElementById("PasswordMain").style.display = "none";
    sessionStorage.setItem("CurrentPage", "Login");
}

function MenuPage() {
    document.getElementById("LoginMain").style.display = "none";
    document.getElementById("MenuMain").style = "none";
    document.getElementById("ResignMain").style.display = "none";
    document.getElementById("TicketMain").style.display = "none";
    document.getElementById("PasswordMain").style.display = "none";
    sessionStorage.setItem("CurrentPage", "Menu");
}

function ResignPage() {
    document.getElementById("LoginMain").style.display = "none";
    document.getElementById("MenuMain").style.display = "none";
    document.getElementById("ResignMain").style = "none";
    document.getElementById("TicketMain").style.display = "none";
    document.getElementById("PasswordMain").style.display = "none";
    sessionStorage.setItem("CurrentPage", "Resign");
}

function TicketPage() {
    document.getElementById("LoginMain").style.display = "none";
    document.getElementById("MenuMain").style.display = "none";
    document.getElementById("ResignMain").style.display = "none";
    document.getElementById("PasswordMain").style.display = "none";
    document.getElementById("TicketMain").style = "none";
    sessionStorage.setItem("CurrentPage", "Ticket");
}

function PassWordPage() {
    document.getElementById("LoginMain").style.display = "none";
    document.getElementById("MenuMain").style.display = "none";
    document.getElementById("ResignMain").style.display = "none";
    document.getElementById("PasswordMain").style = "none";
    document.getElementById("TicketMain").style.display = "none";
    sessionStorage.setItem("CurrentPage", "Password");
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
        document.querySelector("." + item + " .starter").innerHTML =
        MenuPerDay[index].split(';')[0];;
        document.querySelector("." + item + " .main").innerHTML =
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

ResignOrNot = [false, false, false, false, false, false, false, false, false, false];
Chosable = [true, true, true, true, true, true, true, true, true, true];
Dates = [];
NextWeekOrNot = 1;

function ChosenDayResign(whichDay, whichBool)
{
    if (!Chosable[whichBool + (NextWeekOrNot-1)*5] && !ResignOrNot[whichBool + (NextWeekOrNot-1)*5]) {
        try {
            document.getElementById(whichDay).style.backgroundImage = "linear-gradient(to top, #2d2d2d, #ffffff00)";
            document.getElementById("cb_" + whichDay).disabled = true; 
            document.getElementById("cb_" + whichDay).checked = false;
        } catch (error) {
            
        }
    } else if (!ResignOrNot[whichBool + (NextWeekOrNot-1)*5]) {
        try {
            document.getElementById(whichDay).style.backgroundImage = "";
            document.getElementById("cb_" + whichDay).checked = false;
            document.getElementById("cb_" + whichDay).disabled = false; 
        } catch (error) {
            
        }
        
    }
    else
    {
        document.getElementById(whichDay).style.backgroundImage = "linear-gradient(to bottom, #cc1515, #ffffff00)";
        document.getElementById("cb_" + whichDay).checked = true;
        document.getElementById("cb_" + whichDay).disabled = false;
    }
}

function ChoseADay(whichDay,whichBool)
{
    if (ResignOrNot[whichBool + (NextWeekOrNot-1)*5]) {
        ResignOrNot[whichBool + (NextWeekOrNot-1)*5] = false;
    }else
    {
        ResignOrNot[whichBool + (NextWeekOrNot-1)*5]= true;
    }
    ChosenDayResign(whichDay,whichBool);
}

function WhichDayIsNotChosable()
{
    for (let index = 0; index < Days.length; index++) {
        if(index <= date.getDay()-1)
        {
            try {
                document.getElementById("cb_" + Days[index]).disabled = true;
                Chosable[index] = false;
            } catch (error) {
            }
        }
        else if((date.getHours() == 8 && date.getMinutes() > 30) || date.getHours() > 8)
        {
            if(date.getDay() > 4) 
            {
                try {
                    document.getElementById("cb_" + Days[0]).disabled = true; 
                    Chosable[0] = false;
                } catch (error) {}
            }
            else
            {
                try {
                    document.getElementById("cb_" + Days[index]).disabled = true;
                    Chosable[index] = false;
                } catch (error) {
                }
                ChosenDayResign(Days[index], index);
                break;
            }
        }
        
        ChosenDayResign(Days[index], index);
    }

}