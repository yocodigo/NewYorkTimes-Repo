$( document ).ready(function() {

        $(window).scroll(function() {
          if ($(this).scrollTop() > 0) {
            $('.navbar').css('opacity', 0.9);
          } else {
            $('.navbar').css('opacity', 1);
          }
        });
      
    // var date_input=$('input[name="date"]'); //our date input has the name "date"
    //     var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    //     date_input.datepicker({
    //         format: 'mm/dd/yyyy',
    //         container: container,
    //         todayHighlight: true,
    //         autoclose: true,
    //     })
    //     date_input.datepicker(options);
    
    $(".btn").on("click", function() {
        
        const key = "f26a33147e204c9d90988e8d071b0227";
        let beginDate = $("#date1").val();
        let endDate = $("#date2").val();
        let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        let article = $('#articleInput').val();
        const select = $('select').val();

        url += '?' + $.param({
            'api-key': key,
            'q': article,
            'begin_date': beginDate,
            'end_date': endDate
        });
        
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(result) {
            let articleRow = $("<div>");
            
            articleRow.attr("class", "row");
            

            for(let i = 0; i <= select - 1; i++) {
                let column = $("<div>");
                    column.attr("class", "col-md-3");
                let div1 = $("<div>");
                    div1.attr("class", "card articles");
                let img1 = $("<img>");
                    img1.attr("class", "card-img-top");
                    img1.attr("src", "https://static01.nyt.com/" + result.response.docs[i].multimedia[1].url);
                    img1.attr("alt", "Card image cap");
                
                div1.append(img1);

                let div2 = $("<div>");
                    div2.attr("class", "card-body");    
                
                let title = $("<h5>");
                    title.attr("class", "card-title");    
                    title.html(result.response.docs[i].headline.main);
                
                div2.append(title);

                let summary = $("<p>");
                    summary.attr("class", "card-text");
                    summary.attr("style", "text-align: left");
                    summary.html(result.response.docs[i].snippet);
                
                div2.append(summary);

                let site = $("<a>");
                    site.attr("href", result.response.docs[i].web_url);
                    site.attr("class", "btn btn-primary articleLink");
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

    });

});