var DarkModeOn = true;
var Logined = "false;";
var Chosable = [];
var CurrentPage = "Login";
var Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
var MenuPerDay = ["Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta","Meggyes almaleves;BBQ-s sült csirkecomb Rizs Káposztasaláta"]

var date = new Date();

function PageLoaded()
{
    //Logined = sessionStorage.getItem("Logined") == null ? "false;" : sessionStorage.getItem("Logined");
    CurrentPage = sessionStorage.getItem("CurrentPage") == null ? "Login" : sessionStorage.getItem("CurrentPage");
    sessionStorage.setItem("SavedUser", localStorage.getItem("ToPageUser") == ""  ||  localStorage.getItem("ToPageUser") == null ? sessionStorage.getItem("SavedUser") : Coder(localStorage.getItem("ToPageUser")));
    sessionStorage.setItem("Logined", Logined = (sessionStorage.getItem("SavedUser") == null || sessionStorage.getItem("SavedUser") == "" ? "false;" : "true;"));

    Chosable = WhichDayIsNotChosable();

    if (Logined.split(';')[0] == "true") {
        LogingIn();
    }else
    {
        LastPage(sessionStorage.getItem('CurrentPage'));
        localStorage.removeItem("ToPageUser");
        LogingOut();
    }

    
    if (sessionStorage.getItem("DarkModeOn") == "true") {
        document.getElementById("Dark_check").checked = true;
        DarkModeStyleChange();
    }
    
    for (const classses of document.getElementsByClassName("Menu_date")) {
        classses.value = ThisMondayDate();
    } 
    
    DatesLoader();

    LastPage(sessionStorage.getItem('CurrentPage'));
    document.querySelector(".date p").innerHTML = "Dátum: " + NowDate().toString().split('-')[0] + "." + NowDate().toString().split('-')[1] + "." + NowDate().toString().split('-')[2] + ".";
	
    CurrentDayColorize();
    
    MobileMode();
    
    var dates = date.getFullYear() +"-"+ (date.getMonth()+1 < 10 ? "0"+date.getMonth()+1:date.getMonth()+1) +"-"+(date.getDate() < 10 ? "0"+date.getDate():date.getDate());
    document.getElementById('FirstDay').value = dates;
    document.getElementById('LastDay').value = dates;
}

function DatesLoader()
{
    index2 = 1;
    for (let index = 0; index < ResignOrNot.length; index++) {
        if (index < 5) {
            if (date.getMonth() == 1 && parseInt(ThisMondayDate().split('-')[2]) + index > 28) {
                var month = parseInt((date.getMonth()+1)) + 1 < 10 ? '0' + parseInt((date.getMonth()+1)) + 1 : parseInt((date.getMonth()+1)) + 1;
                Dates[index] = date.getFullYear() + '-' + month + '-' + index2++;
            }
            else if (date.getMonth() % 2 == 0 && parseInt(ThisMondayDate().split('-')[2]) + index > 30) 
            {
                var month = parseInt((date.getMonth()+1)) + 1 < 10 ? '0' + parseInt((date.getMonth()+1)) + 1 : parseInt((date.getMonth()+1)) + 1;
                Dates[index] = date.getFullYear() + '-' + month + '-' + index2++;
            }
            else if(parseInt(ThisMondayDate().split('-')[2]) + index > 31)
            {
                var year = parseInt(date.getMonth()) == 1 && index2 >= 1 ? date.getFullYear() + 1 : date.getFullYear();
                var month = parseInt((date.getMonth()+1)) + 1 < 10 ? '0' + parseInt((date.getMonth()+1)) + 1 : parseInt((date.getMonth()+1)) + 1;
                Dates[index] =year + '-' + month + '-' + index2++; 
            }
            else
            {
                Dates[index] =  date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (parseInt(ThisMondayDate().split('-')[2]) + index);
            }
            
        }
        else
        {
            if (date.getMonth() == 1 && parseInt(ThisMondayDate().split('-')[2]) + index + 2 > 28) {
                var month = parseInt((date.getMonth()+1)) + 1 < 10 ? '0' + parseInt((date.getMonth()+1)) + 1 : parseInt((date.getMonth()+1)) + 1;
                Dates[index] = date.getFullYear() + '-' + month + '-' + index2++;
            }
            else if (date.getMonth() % 2 == 0 && parseInt(ThisMondayDate().split('-')[2]) + index + 2 > 30) {
                var month = parseInt((date.getMonth()+1)) + 1 < 10 ? '0' + parseInt((date.getMonth()+1)) + 1 : parseInt((date.getMonth()+1)) + 1;
                Dates[index] = date.getFullYear() + '-' + month + '-' + index2++;
            }
            else if(parseInt(ThisMondayDate().split('-')[2]) + index + 2 > 31)
            {
                var year = parseInt(date.getMonth()) == 1 && index2 >= 1 ? date.getFullYear() + 1 : date.getFullYear();
                var month = parseInt((date.getMonth()+1)) + 1 < 10 ? '0' + parseInt((date.getMonth()+1)) + 1 : parseInt((date.getMonth()+1)) + 1;
                Dates[index] =year + '-' + month + '-' + index2++; 
            }else
            {
                Dates[index] =  date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (parseInt(ThisMondayDate().split('-')[2]) + index + 2);
            }
        }
        
    }
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
            for (const dayclasses of document.getElementsByClassName(day)) {
                dayclasses.style.display="none";
            }
            
        }
    }
}

sessionStorage.setItem('NextWeek',0);

function ToNextWeek(WhichPage) {
    CurrentlyWeek++;
    if(WhichPage == 'Menu')
    {
        var date = document.getElementById("Menu_date").innerHTML.split('a')[2].slice(0,-1).substring(1).replace(/\./g,'').split(' ');
        date = date.slice(1,-1);

        var day;
        if ((parseInt(date[2]) + 7) < 10) {
            day = "0" + (parseInt(date[2]) + 7);
        }else
        {
            day = parseInt(date[2]) + 7;
        }
    
        if ((parseInt(date[1]) == 2 && parseInt(day) > 28) ||(parseInt(date[1]) == 2 && parseInt(day) > 29 && parseInt(date[0]) % 4 == 0)) {
            day = "0" +(parseInt(day) - 28);
        }
        else if (parseInt(date[1]) % 2 == 1 && parseInt(day) > 30) {
            day = "0" + (parseInt(day) - 30);
        }
        else if(parseInt(day) > 31)
        {
            day = "0" + (parseInt(day) - 31);  
        }
    
        var month = (parseInt(day) < 8 ? (parseInt(date[1]) + 1 > 12 ? "1" : parseInt(date[1]) + 1) : parseInt(date[1]) + 0);
            month = month < 10 ? ("0"+month) : month;
    
        var year = month == 1 && day < 8 ? parseInt(date[0]) + 1 : date[0];
    
        var NextMonday = year + ". " + month + ". " + day + ". ";


        //.split('.').slice(1,-1)
        var date = document.getElementById("Menu_date").innerHTML.split('a')[2].slice(0,-1).substring(1).replace(/\s/g, '').replace('-', '').split('.');
        date = date.slice(3,5).join(',').split(',');
        var day;
        if ((parseInt(date[2]) + 7) < 10) {
            day = "0" + (parseInt(date[1]) + 7);
        }else
        {
            day = parseInt(date[1]) + 7;
        }
    
        if ((parseInt(date[0]) == 2 && parseInt(day) > 28) ||(parseInt(date[0]) == 2 && parseInt(day) > 29 && parseInt(year) % 4 == 0)) {
            day = "0" +(parseInt(day) - 28);
        }
        else if (parseInt(date[0]) % 2 == 1 && parseInt(day) > 30) {
            day = "0" + (parseInt(day) - 30);
        }
        else if(parseInt(day) > 31)
        {
            day = "0" + (parseInt(day) - 31);  
        }
    
        var month = (parseInt(day) < 8 ? (parseInt(date[0]) + 1 > 12 ? "1" : parseInt(date[0]) + 1) : parseInt(date[0]) + 0);
            month = month < 10 ? ("0"+month) : month;
    
    
        var NextFriday = month + ". " + day + ". ";
    
        document.getElementById('Menu_date').innerHTML = '<a href="#" onclick="ToCurrentWeek(\'Menu\')">&#10094</a> ' + NextMonday + " - " + NextFriday + ' <a href="#" onclick="ToNextWeek(\'Menu\')">&#10095</a>';
        for (const classses of document.getElementsByClassName("Menu_date")) {
            classses.value = NextMonday;
        }
    }
    else
    {
        if(parseInt(sessionStorage.getItem('NextWeek')) < 1)
        {
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
            }
            else if (parseInt(date[1]) % 2 == 1 && parseInt(day) > 30) {
                day = "0" + (parseInt(day) - 30);
            }
            else if(parseInt(day) > 31)
            {
                day = "0" + (parseInt(day) - 31);  
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
            sessionStorage.setItem('NextWeek',parseInt(sessionStorage.getItem('NextWeek')) + 1);
        }
    }
    
}
var CurrentlyWeek = 0;
function ToCurrentWeek(WhichPage = 'Menu') {
    
    if(CurrentlyWeek > 0)
    {
        var date = document.getElementById("Menu_date").innerHTML.split('a')[2].slice(0,-1).substring(1).replace(/\./g,'').split(' ');
        date = date.slice(1,-1);
        var day;
        if ((parseInt(date[2]) - 7) < 10 && parseInt(date[2])-7 > 0) {
            day = "0" + (parseInt(date[2]) - 7);
        }else
        {
            day = parseInt(date[2]) - 7;
        }
        if ((parseInt(date[1]) == 2 && parseInt(day) < 0) || (parseInt(date[1]) == 2 && parseInt(day) > 29 && parseInt(date[0]) % 4 == 0)) {
            day = (28 + parseInt(day)+1);
        }
        else if (parseInt(date[1]) % 2 == 0 && parseInt(day) < 0) {
            day = (30 + parseInt(day));
        }
        else if(parseInt(day) < 0)
        {
            day = (31 + parseInt(day)); 
        }
    
        var month = (parseInt(day) > 23 ? (parseInt(date[1]) - 1 < 1 ? 12 : parseInt(date[1]) - 1) : parseInt(date[1]) - 0);
            month = month < 10 ? ("0"+month) : month;
    
        var year = month == 12 && day > 24 ? parseInt(date[0]) - 1 : date[0];
        var CurrentMonday = year + ". " + month + ". " + day + ". ";
        
        var date = document.getElementById("Menu_date").innerHTML.split('a')[2].slice(0,-1).substring(1).replace(/\s/g, '').replace('-', '').split('.');
        date = date.slice(3,5).join(',').split(',');

        var day;
        if ((parseInt(date[1]) - 7) < 10 && parseInt(date[1])-7 > 0) {
            day = "0" + (parseInt(date[1]) - 7);
        }else
        {
            day = parseInt(date[1]) - 7;
        }
        if ((parseInt(date[0]) == 2 && parseInt(day) < 0) || (parseInt(date[0]) == 2 && parseInt(day) > 29 && parseInt(year) % 4 == 0)) {
            day = (28 + parseInt(day)+1);
        }
        else if (parseInt(date[0]) % 2 == 0 && parseInt(day) < 0) {
            day = (30 + parseInt(day));
        }
        else if(parseInt(day) < 0)
        {
            day = (31 + parseInt(day)); 
        }
    
        var month = (parseInt(day) > 23 ? (parseInt(date[0]) - 1 < 1 ? 12 : parseInt(date[0]) - 1) : parseInt(date[0]) - 0);
            month = month < 10 ? ("0"+month) : month;
    
        var CurrentFriday = month + ". " + day + ".";


        document.getElementById('Menu_date').innerHTML = '<a href="#" onclick="ToCurrentWeek(\'Menu\')">&#10094</a> ' + CurrentMonday + " - " + CurrentFriday + ' <a href="#" onclick="ToNextWeek(\'Menu\')">&#10095</a>';
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
    CurrentlyWeek--;
    if(CurrentlyWeek < 0){CurrentlyWeek = 0;}
}

function ThisMondayDate()
{
    var Year = date.getFullYear();
        Month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
        Day = (date.getDate() - date.getDay() + 1 < 10 ? "0" : "") + (date.getDate() - date.getDay() + 1);
    var PreviousMonday = Year + "-" + Month + "-" + Day;
    return PreviousMonday;
}

function NowDate()
{
    var Year = date.getFullYear();
        Month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
        Day = (date.getDate() < 10 ? "0" : "") + (date.getDate());
    var Now = Year + "-" + Month + "-" + Day;
    return Now;
}

function LogingIn() {
    var User = DeCoder(sessionStorage.getItem('SavedUser')).split(';');
    if ((document.getElementById("User").value == User[0] && document.getElementById("Pass").value == User[1]) || Logined == "true;") {
        var saving = "";
        for (const item of User) {
            saving += item + ";";
        }
        sessionStorage.setItem("Logined", "true;");
        localStorage.removeItem('ToPageUser');
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
        LogingOut();
    }
}

function LogingOut() {
    sessionStorage.setItem("Logined", "false;");
    sessionStorage.setItem("SavedUser","");
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
    LogingOut();
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

function MenuLoader(MenPuerDay) {
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

ResignOrNot = [false, false, false, false, false, false, false, false, false, false];
Dates = [];
NextWeekOrNot = 1;

function ChosenDayResign(whichDay, whichBool)
{
    if(!Chosable[whichBool + (NextWeekOrNot-1)*5])
    {
        try {
            document.getElementById(whichDay).style.backgroundImage = "linear-gradient(to top, #2d2d2d, #ffffff00)";
            document.getElementById("cb_" + whichDay).disabled = true; 
            document.getElementById("cb_" + whichDay).checked = false;
        } catch (error) {
            
        }
    }else
    {
        if(!ResignOrNot[whichBool + (NextWeekOrNot-1)*5])
        {
            try {
                document.getElementById(whichDay).style.backgroundImage = "";
                document.getElementById("cb_" + whichDay).checked = false;
                document.getElementById("cb_" + whichDay).disabled = false; 
            } catch (error) {
                
            }
        }
        else if(ResignOrNot[whichBool + (NextWeekOrNot-1)*5])
        {
            try {
                document.getElementById(whichDay).style.backgroundImage = "linear-gradient(to bottom, #cc1515, #ffffff00)";
                document.getElementById("cb_" + whichDay).checked = true;
                document.getElementById("cb_" + whichDay).disabled = false;
            } catch (error) {
                
            }
        }
    }
    
}

function ChoseADay(whichDay, whichBool)
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
    this.Chosable = [true, true, true, true, true, true, true, true, true, true];
    for (let index = 0; index < Days.length; index++) {
        if(date.getDay() > 5)
        {
            try {
                document.getElementById("cb_" + Days[5]).disabled = true;
                Chosable[5] = false;
            } catch (error) {
                
            }
            
        }
        else if(date.getDay() == 5 && (date.getHours() > 8 || (date.getHours == 8 && date.getMinutes > 30)))
        {
            try {
                document.getElementById("cb_" + Days[5]).disabled = true;
                Chosable[5] = false;
            } catch (error) {
                
            }
        }
        else if(index <= date.getDay()-1)
        {
            try {
                document.getElementById("cb_" + Days[index]).disabled = true;
                Chosable[index] = false;
            } catch (error) {
            }
        }
        else if((date.getHours() == 8 && date.getMinutes() > 30) || date.getHours() > 8)
        {
            try {
                document.getElementById("cb_" + Days[index]).disabled = true;
                Chosable[index] = false;
            } catch (error) {
            }
            ChosenDayResign(Days[index], index);
            break;
        }
        ChosenDayResign(Days[index], index);
    }

    return Chosable;

}

function ResignByDate()
{
    document.getElementById("ResignMenu").style.display = "none";
    document.getElementById("Resign").style.display = "block";
}

function ResignByMenu()
{
    document.getElementById("ResignMenu").style.display = "block";
    document.getElementById("Resign").style.display = "none";
}

function ResignButtonClicked(whichBtn)
{
    if(whichBtn == 'ByMenu')
    {
        var dataRow = "";
        for (let index = 0; index < ResignOrNot.length; index++) {
            if (ResignOrNot[index]) {
                dataRow += Dates[index] + ';';
            }
            
        }
    }
}

function DayCheckingFirst(e)
{
    var dates = date.getFullYear() +"-"+ (date.getMonth()+1 < 10 ? "0"+date.getMonth()+1:date.getMonth()+1) +"-"+(date.getDate() < 10 ? "0"+date.getDate():date.getDate());
    if(document.getElementById('FirstDay').value < dates)
    {
        document.getElementById('FirstDay').value = dates;
        alert("Nem megfelelő dátum!");
    }
}

function DayCheckingLast(e)
{
    var dates = date.getFullYear() +"-"+ (date.getMonth()+1 < 10 ? "0"+date.getMonth()+1:date.getMonth()+1) +"-"+(date.getDate() < 10 ? "0"+date.getDate():date.getDate());
    if(document.getElementById('LastDay').value < dates)
    {
        document.getElementById('LastDay').value = dates;
        alert("Nem megfelelő dátum!");
    }
}

function OnlyOneDay()
{
    document.getElementById('LastDay').disabled = document.getElementById('OnlyOne').checked;
}

for (const selects of document.getElementsByClassName("contains")) {
    selects.addEventListener("change", ContainsSubstitle);
}

function ContainsSubstitle()
{
    for (const classes of document.getElementsByClassName("contains")) {
        classes.value = 0;
    }
}

function Coder(Data)
{
    try {
        var newData = "";
        for (let index = 0; index < Data.length; index++) {
            newData += String.fromCharCode(Data.charCodeAt(index) + (index-50));
        } 
        return newData;
    } catch (error) {
        console.log(error);
    }
    return "";
}

function DeCoder(Data)
{
    try {
        var newData = "";
        for (let index = 0; index < Data.length; index++) {
            newData += String.fromCharCode(Data.charCodeAt(index) - (index-50));
        } 
        return newData;
    } catch (error) {
        console.log(error);
    }
    return "";
}