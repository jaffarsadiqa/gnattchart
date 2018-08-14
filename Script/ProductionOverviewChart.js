var ObjectDataTemp = {
    "LocationLists": [
        {"Location": {
            "Id": 1, "Name": "Location 1",
            "StateLists":
                [
                    { "State": { "Id": "s1", "Name": "ToBog", "StartTime": "08:00:00", "EndTime": "10:00:00", "color":"blue" } },
                    { "State": { "Id": "s2", "Name": "ToDrill", "StartTime": "10:30:00", "EndTime": "13:00:00", "color": "pink"} },
                    { "State": { "Id": "s3", "Name": "ToPrepare", "StartTime": "13:00:00", "EndTime": "15:00:00", "color": "red"} }
                ],
            "ActionLists":
                [
                    { "Action": { "Id": "s1", "Name": "ToBog-Action", "StartTime": "08:00:00", "EndTime": "09:00:00", "color": "blue" } },
                    { "Action": { "Id": "s2", "Name": "ToDrill-Action", "StartTime": "10:30:00", "EndTime": "12:00:00", "color": "pink" } },
                    { "Action": { "Id": "s3", "Name": "ToPrepare-Action", "StartTime": "13:00:00", "EndTime": "15:00:00", "color": "red" } }
                ]
        }},
        {"Location": {
            "Id": 2, "Name": "Location 2",
            "StateLists":
                [
                    { "State": { "Id": "s1", "Name": "ToBog", "StartTime": "08:00:00", "EndTime": "10:00:00", "color": "blue"} },
                    { "State": { "Id": "s2", "Name": "ToDrill", "StartTime": "10:00:00", "EndTime": "13:00:00", "color": "pink" } },
                    { "State": { "Id": "s3", "Name": "ToPrepare", "StartTime": "13:00:00", "EndTime": "15:00:00", "color": "red" } }
                ],
            "ActionLists":
                [
                    { "Action": { "Id": "s1", "Name": "ToBog-Action", "StartTime": "09:00:00", "EndTime": "10:00:00", "color": "blue" } },
                    { "Action": { "Id": "s2", "Name": "ToDrill-Action", "StartTime": "10:30:00", "EndTime": "13:00:00", "color": "pink" } },
                    { "Action": { "Id": "s3", "Name": "ToPrepare-Action", "StartTime": "14:00:00", "EndTime": "15:00:00", "color": "red" } }
                ]
        }},
    ],
    "Shifts": [
        { "Shift": { "Id": "1", "Name": "Morning", "StartTime": "08:00:00", "EndTime": "15:00:00" } },
        { "Shift": { "Id": "1", "Name": "Morning", "StartTime": "15:00:00", "EndTime": "21:00:00" } },
        { "Shift": { "Id": "1", "Name": "Morning", "StartTime": "21:00:00", "EndTime": "05:00:00" } }
    ]
}

function SchedulerControl(schedulerControl, startTime, endTime) {
    //Private Variables
    m_scheduler = this;
    LocationList = [];
    maxStateHeight = 25;
    maxActionHeight = 50;
    topActionPos = maxStateHeight + 1;
    imgTimeLine = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEyNS4zMDQgMTI1LjMwNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI1LjMwNCAxMjUuMzA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSI2Mi42NTIsMTAzLjg5NSAwLDIxLjQwOSAxMjUuMzA0LDIxLjQwOSAgICIgZmlsbD0iI0Q4MDAyNyIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
    timeImgObject = null;
    //Css styles for the grid
    this.styleTable = "width:100%;"
    this.styleRow = "height:100px;border:1px solid;";
    this.styleCell = "vertical-align:top;position:relative;background-color:#cccccc";
    this.styleLocationCell ="width:150px;vertical-align:middle;"//Dont modify
    this.styleHeaderRow = "background-color:gray;color:white;height:50px;"
    this.styleLocationItem = "border-radius:10px;border: 2px solid white;color:white;font-weight:bold;font-size:16px;height:98px;background-color:#35cbd8;display: flex;justify-content: center;align-items: center;";
    this.styleStateItem = "border-radius:5px;border: 2px solid white;color:white;font-weight:bold;font-size:14px;height:100%";
    this.styleActionItem = "border: 2px solid white;color:white;font-weight:bold;font-size:14px;";
    this.styleEquipItem = "color:black;font-weight:bold;font-size:12px;height:100%";
    //Template Html
    this.Control = null;
    this.StartTime = new Date(startTime);//01 Jan 1900 13:00:00
    this.EndTime = new Date(endTime);//01 Jan 1900 19:00:00
    this.MaxTimeLine = 0;
    this.NoOfColumn = 0;
    this.NoOfLocationRow = 0;
    this.Data = null;

    

    this.Initialize = function (dataToBind) {
        m_scheduler.Control = document.getElementById(schedulerControl);
        m_scheduler.Data = dataToBind;
        SetControlProperty();
    }
    function ConvertMsToMins(ms) {
        return ms / 1000 / 60;
    }
    function SetControlProperty()
    {
        m_scheduler.NoOfLocationRow = m_scheduler.Data.LocationLists.length;
        diff = m_scheduler.EndTime - m_scheduler.StartTime;
        diff = ConvertMsToMins(diff) / 60;//Covert to hours
        m_scheduler.MaxTimeLine = diff;
        m_scheduler.NoOfColumn = diff % 1 > 0 ? diff + 1 : diff;
        GenerateUI();
    }
    function getLeftPos(currDateTime) {
        var leftPosition = (ConvertMsToMins(currDateTime - m_scheduler.StartTime) / 60);
        leftPosition = ((leftPosition * 100) / m_scheduler.MaxTimeLine);
        return leftPosition;
    }
    function MoveTimer() {
        try {
            var currTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getMilliseconds();
            var currDateTime = new Date("1 jan 1900 " + currTime);
            timeImgObject.setAttribute("style", "width:25px;height:25px;position:relative;left:" + getLeftPos(currDateTime) + "%");
            setTimeout(MoveTimer, 1000 * 60);
        } catch (e) {}
    }
    function GenerateUI() {
        //Generate Header for the Container
        var TableObject = document.createElement("table");
        TableObject.setAttribute("style", m_scheduler.styleTable);
        TableObject.setAttribute("cellspacing", 0);
        TableObject.setAttribute("cellpadding", 0);


        var trHeaderTimeLine = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.setAttribute("style", "border:1px solid white");
        var td2 = document.createElement("td");
        td2.setAttribute("colspan", m_scheduler.NoOfColumn);

        var currTime = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getMilliseconds();
        var currDateTime = new Date("1 jan 1900 " + currTime);
        var leftPosition = getLeftPos(currDateTime);
        var img = document.createElement("img");
        timeImgObject = img;
        img.setAttribute("src", imgTimeLine);
        img.setAttribute("style", "width:25px;height:25px;position:relative;left:" + leftPosition+"%");
        td2.appendChild(img);

        //MoveTimer();
        
        trHeaderTimeLine.appendChild(td1);
        trHeaderTimeLine.appendChild(td2);
        TableObject.appendChild(trHeaderTimeLine);

        var TrHeader = document.createElement("tr");
        TableObject.appendChild(TrHeader);

        var tdHeaderCell = document.createElement("td");
        tdHeaderCell.innerHTML = "&nbsp;"
        tdHeaderCell.setAttribute("style", "width:100px;background-color:white");
        TrHeader.appendChild(tdHeaderCell);
        TrHeader.setAttribute("style", m_scheduler.styleHeaderRow);
        //Header columns
        var time = new Date(m_scheduler.StartTime);
        for (j = 0; j < m_scheduler.NoOfColumn; j++) {
            var td = document.createElement("td");
            td.setAttribute("style","border:1px solid white")
            TrHeader.appendChild(td);
            var tmpTime =time.getHours() + j;
            tmpTime = tmpTime.toString().length <= 1 ? "0" + tmpTime + ":00" : tmpTime + ":00";
            td.innerHTML = tmpTime;
        }        

        for (i = 0; i < m_scheduler.NoOfLocationRow; i++) {
            var key = m_scheduler.Data.LocationLists[i].Location.Id + "_" + (i + 1);
            var value = m_scheduler.Data.LocationLists[i];

            var tr = document.createElement("tr");
            tr.setAttribute("style", m_scheduler.styleRow);
            tr.setAttribute("id", key);
            var tdHeader = document.createElement("td");
            tdHeader.setAttribute("style", m_scheduler.styleLocationCell);
            tr.appendChild(tdHeader);
            tdHeader.innerHTML = "<div  style='" + m_scheduler.styleLocationItem+"'>"+m_scheduler.Data.LocationLists[i].Location.Name+"</div>";

            var td = document.createElement("td");
            tr.appendChild(td);
            td.setAttribute("colspan", m_scheduler.NoOfColumn);
            td.setAttribute("style", m_scheduler.styleCell);
            //td.innerHTML = "&nbsp";            
            TableObject.appendChild(tr);

            //set location to kay value pair
            LocationList[key] = value;
            generateUiForStates(value.Location.StateLists, value.Location, td);
            generateUiForAction(value.Location.ActionLists, value.Location, td)

        }

        m_scheduler.Control.appendChild(TableObject);

    }
    function generateUiForStates(stateList, LocationObject, LocationTrElement) {
        for (k = 0; k < stateList.length; k++) {
            var stateItem = stateList[k].State;
            var stateElement = document.createElement("div");
            stateElement.setAttribute("id", LocationObject.Id +"_"+stateItem.Id+"_State");
            stateElement.setAttribute("style", m_scheduler.styleStateItem);

            //Assign Width based on the time
            var StateStTime = new Date("1 jan 1900 " +stateItem.StartTime);
            var StateEdTime = new Date("1 jan 1900 " + stateItem.EndTime);

            var diff = ConvertMsToMins(StateEdTime - StateStTime) / 60;
            var wInPercentage = (diff * 100) / m_scheduler.MaxTimeLine;

            var leftPosition = (ConvertMsToMins(StateStTime - m_scheduler.StartTime) / 60);
            leftPosition = ((leftPosition * 100) / m_scheduler.MaxTimeLine);
            var addStyle = "position:absolute;top:0;width:" + wInPercentage + "%;left:" + leftPosition + "%;" + "height:" + maxStateHeight + "px";
            stateElement.setAttribute("style", addStyle);

            //stateElement.setAttribute("style", m_scheduler.styleStateItem + addStyle);

            stateElement.innerHTML = "<div style='" + m_scheduler.styleStateItem + ";background-color:" + stateItem.color +"'>" +stateItem.Name +"</div>";

            LocationTrElement.appendChild(stateElement);
        }
    }
    function generateUiForAction(actionList, LocationObject, LocationTrElement) {
        for (k = 0; k < actionList.length; k++) {
            var actionItem = actionList[k].Action;
            var actionElement = document.createElement("div");
            actionElement.setAttribute("id", LocationObject.Id + "_" + actionItem.Id + "_Action");
            //stateElement.setAttribute("style", m_scheduler.styleStateItem);

            //Assign Width based on the time
            var actionStTime = new Date("1 jan 1900 " + actionItem.StartTime);
            var actionEdTime = new Date("1 jan 1900 " + actionItem.EndTime);

            var diff = ConvertMsToMins(actionEdTime - actionStTime) / 60;
            var wInPercentage = (diff * 100) / m_scheduler.MaxTimeLine;

            var leftPosition = (ConvertMsToMins(actionStTime - m_scheduler.StartTime) / 60);
            leftPosition = ((leftPosition * 100) / m_scheduler.MaxTimeLine);
            var addStyle = "position:absolute;width:" + wInPercentage + "%;left:" + leftPosition + "%;" + "height:" + maxActionHeight + "px;" + "top:" + topActionPos;
            actionElement.setAttribute("style", addStyle);

            //stateElement.setAttribute("style", m_scheduler.styleStateItem + addStyle);

            actionElement.innerHTML = "<div style='" + m_scheduler.styleActionItem + ";background-color:orange'>" + actionItem.Name + "</div>"+
                "<div style = '" + m_scheduler.styleEquipItem + ";background-color:yellow'>Equipment Details</div>";

            LocationTrElement.appendChild(actionElement);
        }
    }
}

