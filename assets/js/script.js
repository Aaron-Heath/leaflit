

//-----------------------------------------------------------------------------------------------------


// async function GetTea(){
//     // get the tea from https://boonakitea.cyclic.app/ 
// var TeaResponse = await fetch("https://boonakitea.cyclic.app/api/teas/" + ReleventTea)
// //  turn the tea to json and give it a variable, this can be used as the "currently displayed" Tea and we can re-use the variable later in search history. 
// var activeTea = TeaResponse.json()
// // logging both temporarily. 
// console.log(TeaResponse);
// console.log(activeTea);
// }

var sGoogleAPIKey = "AIzaSyCbu_8RcyObinDL7LccNRfmOL48r1GqpiQ";
var arrGenres = ["Fantasy", "Science Fiction", "Romance", "Mystery", "Contemporary", "Non-fiction"];

//-----------------------------------------------------------------START  
loadPage();


//-----------------------------------------------------------------loadpage()
function loadPage() {
    createSelectionAPI();
    createGenreButtons();
}

//------------------------------------------------------------------------------------performSearch
function performSearch(){
    searchByText(); 
    // GetTea();
}

//------------------------------------------------------------------------------------create genre buttons
function createGenreButtons(){
    var aGenre = "";

var buttonsSection = document.querySelector("#button-container");
    for (let i in arrGenres) {
        aGenre = arrGenres[i];

        //Creating button dynamically
        var btn = document.createElement('BUTTON');
        btn.id = aGenre.toLowerCase();
        btn.setAttribute("class", "genre_search");
        var tNode = document.createTextNode(aGenre);
        btn.appendChild(tNode);
        btn.addEventListener("click", searchByGenre);
        buttonsSection.appendChild(btn);   
    }
}

//---------------------------------------------------------------------------------------------------
function createSelectionAPI() {
    var arr_fields = ["title" ,  "author", "publisher"];
    var selectSection = document.querySelector("#search-container");


    //Creating the labels for input
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", "select_box");
    newLabel.setAttribute("id", "select_label");
    newLabel.innerHTML = "Please select:";
    selectSection.appendChild(newLabel);

    //Selecting Options
    var selectList= document.createElement("select");    
    selectList.id = "select_options";

    for(var i in arr_fields) {

            var option = document.createElement("option");
            option.value = arr_fields[i];
            option.text = arr_fields[i];
            selectList.appendChild(option);
    }
    selectSection.appendChild(selectList);

    //Break line
    var brNode = document.createElement("div");
    selectSection.appendChild(brNode);

    //text search box book_search
    var selectInput= document.createElement("input");    
    selectInput.id = "book_search";
    selectInput.type = 'text';
    selectInput.name ='test' ;
    selectSection.appendChild(selectInput);

     //Break line
    var brNode = document.createElement("div");
    selectSection.appendChild(brNode);

    //Making city selection button
    var btn = document.createElement('BUTTON');
    btn.id = "btn_select";
    var tNode = document.createTextNode("Search");
    btn.appendChild(tNode);
    btn.addEventListener("click", performSearch);

    selectSection.appendChild(btn);
}



//------------------------------------------------------------------------------------

function searchByGenre(sID) {
/**/
    var sID = $(this.id);
    var sSubject= sID;  //"autobiography", 'fiction', 'humor', 'mystery',  - OK

    var sGoogleURL = "https://www.googleapis.com/books/v1/volumes?q=";
    var sKeySearch = "subject:" + sSubject; 
    var sMyKey = "&key=" + sGoogleAPIKey;
    var sFetchURL = sGoogleURL + sKeySearch + sMyKey;

    fetch(sFetchURL)
        .then(function(res) {
            return res.json();
        })
        .then(function(result) {
            var oItems = result.items;
            var iLength = oItems.length;
            var iRandomIndex = getRandomNumber(iLength);
            var resultSingle = oItems[iRandomIndex];
            //readResults(result);
            readResultSingle(resultSingle);
        }),
        function(error) {
            console.log(error);
        };

}

        //-------------------------------------------------------------------------------------------------------THIS WORKS
        function  searchByText() {

            var selectObject = $("#search-container");
            var selectedText = selectObject.find(":selected").text();
            selectedText = "in" + selectedText;

            var oTypedText = document.querySelector("#book_search");
            var typedText = oTypedText.value;

            var sGoogleURL =     "https://www.googleapis.com/books/v1/volumes?q=";
            var sKeySearch = selectedText  + "=" + typedText ;      
            var sFetchURL = sGoogleURL + sKeySearch;
            fetch(sFetchURL)
      .then(function(res) {
        return res.json();
      })
      .then(function(result) {
        var resultSingle = result.items[0];
        readResultSingle(resultSingle);
      }),
      function(error) {
        console.log(error);
      };
    
    }

    function readResultSingle(oItem) {
   
        var sToDisplay = "";
        sToDisplay += "Title: " + oItem.volumeInfo.title;               sToDisplay += '\n';            
        sToDisplay += "Author: " + oItem.volumeInfo.authors;     sToDisplay += '\n';   
        sToDisplay += "Publisher: " + oItem.volumeInfo.publisher;   sToDisplay += '\n';    
        sToDisplay += "Length: " + oItem.volumeInfo.pageCount + " pages";  sToDisplay += '\n';    
        sToDisplay += "Category: " + oItem.volumeInfo.categories;  sToDisplay += '\n';
            //sToDisplay += "Description: " + oItem.volumeInfo.description;  sToDisplay += '\n';    
         
       var screenBookArea = document.querySelector("#book-info");
        screenBookArea.innerText = sToDisplay;

    
        var sThumbnail = oItem.volumeInfo.thumbnail;       //adding thumbnail for the book
        var screenCoverArea = document.querySelector("#book-cover");
        screenCoverArea.innerHTML = sThumbnail;

    }
    
    //--------------------------------------getRandomNumber() function
    function getRandomNumber(iLength) {
            return Math.floor(Math.random() * iLength);
    }
    
    
//------------------------------------------------------------------------------------
function readResults(result) {
   
    var sToDisplay = "";

/*  */
    var oItems = result.items;
    for (let i = 0; i < oItems.length; i++) {

        sToDisplay += "Title: " + oItems[i].volumeInfo.title;
        sToDisplay += '\n';
        
        sToDisplay += "Author: " + oItems[i].volumeInfo.authors;
        sToDisplay += '\n';

        sToDisplay += "Publisher: " + oItems[i].volumeInfo.publisher;
        sToDisplay += '\n';

        sToDisplay += "Length: " + oItems[i].volumeInfo.pageCount + " pages";
        sToDisplay += '\n';

        sToDisplay += "Category: " + oItems[i].volumeInfo.categories;
        sToDisplay += '\n';

        sToDisplay += "Description: " + oItems[i].volumeInfo.description;
        sToDisplay += '\n';

        sToDisplay += oItems[i].volumeInfo.thumbnail;       //adding thumbnail for the book

        sToDisplay += '\n';
        sToDisplay += '\n';

       

    }

    var screenBookArea = document.querySelector("#book-container");
    screenBookArea.innerText = sToDisplay;
}

//--------------------------------------getRandomNumber() function
function getRandomNumber(iLength) {
        return Math.floor(Math.random() * iLength);
}



$(document).ready(function() {

});



