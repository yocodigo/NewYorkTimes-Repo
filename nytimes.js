$( document ).ready(function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
        $('.navbar').css('opacity', 0.9);
        } else {
        $('.navbar').css('opacity', 1);
        }
    });

    // New York Times API Key
    const authKey = "aP4OTemwzAG170lXAEaYitSD6S0Uku4U";
    
    // Variables that store user input
    let beginDate = $("#date1").val();
    let endDate = $("#date2").val();
    let searchTerm = "";
    let searchResult = 0;
    let articleCounter = 0;
    let rowCounter = 0;

    // Base URL
    const urlBase = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=`;
    
    const runSearch = (articleCount, apiUrl) => {
    
        $.ajax({
            url: apiUrl,
            method: 'GET',
        }).then(function(result) {
          
            for (let i = 0; i < articleCount; i++) {                
                
                articleCounter++;              
                let row = $("<div>"), cardDeck = $("<div>"), articleCard = $("<div>");;

                // Add a new row to card area and a new card deck to the newly created row
                if(articleCounter == 1 || (articleCounter / 4 % 1) == 0) {                    
                    rowCounter++;
                    $("#card-area").append(row);
                    row.addClass("card-row");
                    row.attr("id", "row-" + rowCounter);                    
                    $("#row-" + rowCounter).append(cardDeck);                        
                }               
                
                // Insert a unique id to the row and the deck
                cardDeck.addClass("card-deck");
                cardDeck.attr("id", "card-deck-" + rowCounter);

                // Create the HTML card (section) and add the article content for each
                $("#card-deck-" + rowCounter).append(articleCard);
                articleCard.addClass("card article-card border-dark mb-3");
                articleCard.attr("id", "article-card-" + articleCounter);                                
                console.log("article counter: ", articleCounter, " row: ", row, " article card: ", articleCard);                    

                // Adding article image
                let articleImg = $("<img><h5><span class='badge badge-dark'>" +
                articleCounter + "</span>");
                articleImg.addClass("card-img-top");
                articleImg.attr("src", "https://static01.nyt.com/" + result.response.docs[i].multimedia[0].url);
                articleImg.attr("alt", "image not found");
                $("#article-card-" + articleCounter).append(articleImg); 
                                            
                // Adds the card body
                let articleBody = $("<div>");
                articleBody.addClass("card-body");
                articleBody.attr("id", "article-body-" + articleCounter);
                $("#article-card-" + articleCounter).append(articleBody);

                // Confirm that the specific JSON for the article isn't missing any details
                // If the article has a headline include the headline in the HTML
                if (result.response.docs[i].headline !== "null") {
                $("#article-body-" + articleCounter)
                    .append(
                    "<h5 class='articleHeadline mx-auto'><strong> " +
                    result.response.docs[i].headline.main + "</strong></h3>"
                    );
                }
        
                // Then display the remaining fields in the HTML (Section Name, Date, URL)
                $("#article-body-" + articleCounter)
                .append("<h5>Section: " + result.response.docs[i].section_name + "</h5>");
                $("#article-body-" + articleCounter)
                .append("<p>" + result.response.docs[i].snippet + "</p>");
                $("#article-body-" + articleCounter)                
                .append("<a href='" + result.response.docs[i].web_url + "' target='_blank' class='btn btn-primary'>Link</a>"
                );                
                console.log(result);                  
            }
        });
    }

    $("#search").on("click", function(event) {               
        
        event.preventDefault();
        articleCounter = 0;
        $("#card-section").empty();        

        beginDate = $("#date1").val();
        endDate = $("#date2").val();
        searchTerm = $('#articleInput').val();
        resultCount = $('select').val();
        console.log(resultCount);

        let searchUrl = urlBase + searchTerm +`&api-key=${authKey}`;
        // if(parseInt(beginDate)){
        //     searchUrl = `${searchUrl}&begin_date=${beginDate}0101`;
        // }    

        // if(parseInt(endDate)){
        //     searchUrl = `${searchUrl}&end_date=${endDate}0101`;
        // }

        runSearch(resultCount, searchUrl);
    });
});

    //This button clears the top articles section
    $("#clear").on("click", function() {
        articleCounter = 0;
        $("#card-section").empty();
    });