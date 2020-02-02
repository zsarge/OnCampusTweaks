// ==UserScript==
// @name         OnCampusTweaks
// @namespace    https://elderhs.myschoolapp.com
// @version      0.8
// @description  Change the way Elder High School's student website behaves.
// @author       Zack Sargent
// @match        https://elderhs.myschoolapp.com/app/student
// @grant        none
// ==/UserScript==

// Runs when page is fully loaded
// The website is set up in a way that window.onload triggers before the page is fully loaded.
// Thus, we must check independently to see if the full page has loaded.
var checkExist = setInterval(function() {
    if (document.readyState === 'ready' || document.readyState === 'complete') {
        changeToWeekView();
        hideCompletedTasks();
        clearInterval(checkExist);
    }
}, 100); // check every 100ms

// Changes to week view
function changeToWeekView() {
    // if the string "assignment-center" is in the url
    if (window.location.href.indexOf("assignment-center") > -1) {
        document.getElementById("week-view").click();
        console.log("OnCampusTweaks: Changed to week view");
    }

};

// hides completed tasks automatically in the assignment center
function hideCompletedTasks() {
    if (window.location.href.indexOf("assignment-center") > -1) {
        document.getElementById("filter-status").click();

        // Create a list of all of the button elements that appear when you filter by status
        var buttonElements = document.getElementsByClassName("pull-left btn btn-xs btn-approve status-button active");
        buttonElements[3].click(); // Hides Completed tasks

        // We have to get the buttons again because clicking on them changes the class structure
        buttonElements = document.getElementsByClassName("pull-left btn btn-xs btn-approve status-button active");
        buttonElements[3].click(); // Hides Graded tasks

        document.getElementById("btn-filter-apply").click();

        console.log("OnCampusTweaks: Hid completed tasks");
    }
}
