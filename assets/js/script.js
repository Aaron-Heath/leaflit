 var genre = ("");



function decideTea(){
switch (genre){
case genre = ("fantasy"): 
    ReleventTea = ("Earl Grey");
    break;
 case genre = ("science-fiction"):
    ReleventTea = ("Wulong");
    break;
case genre = ("mystery"):
    ReleventTea = ("White");
    break;
case genre = ("romance"):
    ReleventTea = ("Matcha");
    break;
case genre = ("contemporary"):
    ReleventTea = ("Green");
    break;
case genre = ("non-fiction"):
    ReleventTea = ("Russian Caravan");
    break;
default:
    ReleventTea = ("English Breakfast");
}
console.log(ReleventTea);
}
decideTea();
RequestTea();

// converts the relevent Tea to a request to TEA API. This can then be used to write the data on the page. 
async function RequestTea(){
    // get the tea from https://boonakitea.cyclic.app/ 
    var TeaResponse = await fetch("https://boonakitea.cyclic.app/api/teas/" + ReleventTea);
    
//  turn the tea to json and give it a variable, this can be used as the "currently displayed" Tea and we can re-use the variable later in search history. 
    var activeTea = TeaResponse.json();
// logging both temporarily. 
    console.log(TeaResponse);
    console.log(activeTea);
}

var sGoogleAPIKey = "AIzaSyCbu_8RcyObinDL7LccNRfmOL48r1GqpiQ";

//------------------------------------------------------------------------------------

function searchByGenre(sID) {

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
            readResult(result);
        }),
        function(error) {
            console.log(error);
        };

}

        //-------------------------------------------------------------------------------------------------------THIS WORKS
        function  searchByText() {

            var selectObject = $("#select_options");
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
        title = result.items[0].volumeInfo.title;
        description = result.items[0].volumeInfo.description;
        var screenBookArea = document.querySelector("#google-books");
        screenBookArea.innerText = title + "\n" + description;
      }),
      function(error) {
        console.log(error);
      };
    
    }

//------------------------------------------------------------------------------------
function readResult(result) {
   
    var sToDisplay = "";
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

        sToDisplay += '\n';
        sToDisplay += '\n';

       

    }

    var screenBookArea = document.querySelector("#google-books");
    screenBookArea.innerText = sToDisplay;
}

//-----------------------------------------------------------------loadpage()
function loadPage() {
    var arr_fields = ["title" ,  "author", "publisher"];
    var selectSection = document.querySelector(".selection");
    var selectList= document.createElement("select");    
    selectList.id = "select_options";

    for(var i in arr_fields) {

            var option = document.createElement("option");
            option.value = arr_fields[i];
            option.text = arr_fields[i];
            selectList.appendChild(option);
    }
    selectSection.appendChild(selectList);

    //<option value = "title" text = "Title" label="title"></option>
    //<option value = "author" text = "Author" label="author"></option>
    //<option value = "publisher" text = "Publisher" label="publisher"></option>


}

