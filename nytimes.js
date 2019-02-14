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

    // Base URL
    const urlBase = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=`;
    
    const runSearch = (articleCount, apiUrl) => {
    
        $.ajax({
            url: apiUrl,
            method: 'GET',
        }).then(function(result) {
          
            for (var i = 0; i < articleCount; i++) {

                // Add to the Article Counter (to make sure we show the right number)
                articleCounter++;
        
                // Create the HTML card (section) and add the article content for each
                let articleSection = $("<div>");
                articleSection.addClass("card inside-card border-dark mb-3");
                articleSection.attr("id", "article-card-" + articleCounter);
                articleSection.attr("style", "width: 100%");
                $("#article-section").append(articleSection);                

                // Adding article image
                let cardImg = $("<img><h5><span class='badge badge-dark'>" +
                articleCounter + "</span>");
                cardImg.addClass("card-img-top");
                cardImg.attr("src", "https://static01.nyt.com/" + result.response.docs[i].multimedia[0].url);
                cardImg.attr("alt", "image not found");
                $("#article-card-" + articleCounter).append(cardImg);
                
                
                // Adds the card body
                let cardBody = $("<div>");
                cardBody.addClass("card-body");
                articleSection.attr("id", "article-body-" + articleCounter);
                $("#article-section").append(cardBody);

                // Confirm that the specific JSON for the article isn't missing any details
                // If the article has a headline include the headline in the HTML
                if (result.response.docs[i].headline !== "null") {
                $("#article-body-" + articleCounter)
                    .append(
                    "<h5 class='articleHeadline mx-auto'><strong> " +
                    result.response.docs[i].headline.main + "</strong></h3>"
                    );
                }        
        
                // If the article has a byline include the headline in the HTML
                if (result.response.docs[i].byline && result.response.docs[i].byline.original) {
                $("#article-body-" + articleCounter)
                    .append("<p>" + result.response.docs[i].byline.original + "</p>");        
                }
        
                // Then display the remaining fields in the HTML (Section Name, Date, URL)
                $("#articleCard-" + articleCounter)
                .append("<h5>Section: " + result.response.docs[i].section_name + "</h5>");
                $("#articleCard-" + articleCounter)
                .append("<h5>" + result.response.docs[i].pub_date + "</h5>");
                $("#articleCard-" + articleCounter)
                .append("<a href='" + result.response.docs[i].web_url + "'>" +
                    result.response.docs[i].web_url + "</a>"
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