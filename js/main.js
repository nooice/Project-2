//***********************//
//     Variable setup    //
//***********************//

var num = document.getElementsByClassName("student-item cf");
var pageUL = document.getElementById("pageNum");
var findCurrentPages;
var itemArray = [];
var liPages = Math.ceil(num.length / 10);
var idHolder = [];

//***********************//
//   header Search Bar   //
//***********************//

//$(".page-header").innerHTML = '<form><div class="student-search"><span></span><input name="search" type="text" class="searchStudent" /><button>Search</button></div></form>';

function createSearch() {
    $(".page-header").append('<form><div class="student-search"><span></span><input name="search" type="text" class="searchStudent" /><button>Search</button></div></form>');
    $(".student-list").before('<span class="student-details" id="noStudent"><h3>No Students Found...</h3></span>');
    $("#noStudent").hide();
    
}
createSearch();

//***********************//
//  footer page numbers  //
//***********************//

//creates an id attribute to assign later based on how many pages will be needed on first load
function idCreater() {
    for (var i = 0; i < liPages; i++){
        var k = 'page' + (i + 1);
        idHolder[i] = k;
    }
}

//creates the page numbers at the bottom of page and appends it to html
function createPages() {
    //calls function. is required for 'idHolder[i]' var to work
    idCreater();
    for (var i = 0; i < liPages; i++) {
        var node = document.createElement("li");            // create a <li> tag
        var aTag = document.createElement("a");             // creates a <a> tag
        aTag.setAttribute('href',"#");                      // sets href attr
        aTag.setAttribute('class',"pageLI");                // sets class
        aTag.setAttribute('class',"animsition-link");
        aTag.setAttribute('id', idHolder[i]);               // set id based on how many pages are needed
        aTag.addEventListener('click', displayPage);        // adds click event and calls displayPage function
        aTag.innerHTML = i + 1;                             // Create a text node
        node.appendChild(aTag);                             // appends the text to <li>
        pageUL.appendChild(node);                           // appends final product to html element with id of 'pageNum'
    }
}
createPages();

//***********************//
//Page setup and function//
//***********************//

//gives all students LI's explicit styling
for (var i=0; i < num.length; i++){
        num[i].style.display = "block";
}

//looking to find current students being displayed.
//once a search is made, the results are sometimes over 10 and then needs to have the page numbers adjusted to match the results
//this needs to be flexable to give results on first load as well as later searches
findCurrentPages = function(){
    var ranA1 = [];                                                 // first array
    var ranA2 = [];                                                 // second array to create multidimensional array
    var countTen = 0;                                               // reset counter
    $('#pageNum li').hide();                                        // hide all students
    for (i = 0; i < num.length; i++){                               // start loop
        if ($(".student-list li")[i].style.display === "block"){    // if a student has the 'block' style...
            ranA1.push(i);                                          // add to the first array
            if (ranA1.length == 10){                                // if the length of the array is equal to 10...
            ranA2.push(ranA1);                                      // add current array as next item in second array
            ranA1 = [];                                             // erase first array
            }
        }
    }                                                               
    ranA2.push(ranA1);                                              // add final (or first if only one) array to multidimensional array
    itemArray = ranA2;                                              // assign second array to var that can be used outside of this fuction
    for (i = 0; i < ranA2.length; i++){                             // add page numbers based on how many groups of ten students
        $('#pageNum li')[i].style.display = 'inline';               // make the page numbers visable
    }
    $( ".student-list li" ).hide();                                 // hide current students
    $(".active").removeClass('active');                             // remove active class from page numbers
    $('#page1').addClass('active');                                 // assign 'page1' as active
    for (var i = 0; i < itemArray[0].length; i++){                  // loop through items in first array...
       num[itemArray[0][i]].style.display = "block";                // make them visable
    }
};
findCurrentPages();                                                 // runs on page load to set pages and show first set of 10 students

//sets clicked object as active and removes active class from previously active object
function displayPage(){
    $( ".student-list li" ).hide();                                 // hides all students
    $(".active").removeClass('active');                             // removes active class from all page links
    var varItem = this.innerHTML - 1;                               // takes page number and -1 to match with array of students. result is assigned to varItem
    $(this).addClass('active');                                     // assigns the link clicked to active
    for (var i = 0; i < itemArray[varItem].length; i++){            // loop that displays students assigned to the page number clicked
       num[itemArray[varItem][i]].style.display = "block";
    }
}

//search bar script. runs on each keystroke
$( "form" ).on('keyup', function(event) {
    var formSub = $( "input" ).val();
    var formCounter = 0;
    $("#noStudent").hide();
    $( ".student-list li" ).hide();                                                     // hides all students before looping each student
    for (var i = 0; i < num.length; i++){                                               // loops through each student to see if search matches a students 
          if ($(".student-list h3")[i].innerHTML.toUpperCase().includes(formSub.toUpperCase()) || $(".email")[i].innerHTML.toUpperCase().includes(formSub.toUpperCase())) {                // check user input with student name or email
            $( ".student-search span" ).text( "Searching..." ).show();                  // some feedback for user showing something is happening
              event.preventDefault();                                                   // prevents default form alert
              $(".student-list li")[i].style.display = "block";                         // shows student
              
              $( ".student-search span" ).text( "Searching..." ).hide();                // hides the 'searching...' feedback for user
          } else formCounter++;                                                         
    }
    findCurrentPages();                                                                 // resets page layout
    if (formCounter === num.length){                                                    // if there are NO results...
        $("#noStudent").show();                                                         // feedback for user if no results
            event.preventDefault();                                                     // prevents default form alert
        $('#pageNum li').hide();
    }; 
});