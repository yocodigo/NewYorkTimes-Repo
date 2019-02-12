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
        }).done(function(result) {
            let articleRow = $("<div>");
            
            articleRow.attr("class", "row");            

            for(let i = 0; i <= articleCount - 1; i++) {
                let column = $("<div>");
                    column.attr("class", "col-md-3 article-col");
                let div1 = $("<div>");
                    div1.attr("class", "card article-container");
                let img1 = $("<img>");
                    img1.attr("class", "card-img-top");
                    // img1.attr("src", "https://static01.nyt.com/" + result.response.docs[i].multimedia[1].url);
                    img1.attr("alt", "Card image cap");
                
                div1.append(img1);

                let div2 = $("<div>");
                    div2.attr("class", "card-body");    
                
                let title = $("<h5>");
                    title.attr("class", "card-title");    
                    // title.html(result.response.docs[i].headline.main);
                
                div2.append(title);

                let summary = $("<p>");
                    summary.attr("class", "card-text");
                    summary.attr("style", "text-align: left");
                    // summary.html(result.response.docs[i].snippet);
                
                div2.append(summary);

                let site = $("<a>");
                    // site.attr("href", result.response.docs[i].web_url);
                    site.attr("class", "btn btn-primary article-link");
                    site.attr("target", "_blank");
                    site.html("Go to Page");

                div2.append(site);
                div1.append(div2);
                column.append(div1);
                articleRow.append(column);

                $(".col-xl-9").append(articleRow);

            }
            console.log(result);

        }).fail(function(err) {
            throw err;
        });        
    }

    $("#search").on("click", function(event) {               
        
        event.preventDefault();
        articleCounter = 0;
        $("#well-section").empty();

        beginDate = $("#date1").val();
        endDate = $("#date2").val();
        searchTerm = $('#articleInput').val();
        resultCount = $('select').val();

        let searchUrl = urlBase + searchTerm +`&api-key=${authKey}`;
        if(parseInt(beginDate)){
            searchUrl = `${searchUrl}&begin_date=${beginDate}0101`;
        }    

        if(parseInt(endDate)){
            searchUrl = `${searchUrl}&end_date=${endDate}0101`;
        }

        runSearch(resultCount, searchUrl);
    });

    // This button clears the top articles section
    // $("#clear-all").on("click", function() {
    //     articleCounter = 0;
    //     $("#well-section").empty();
    // });
});