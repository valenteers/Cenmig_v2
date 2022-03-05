// var obj = document.getElementById('paperBox');
// obj.innerHTML = "TEST WORD";


// var url = 'https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pmc/?format=citation&contenttype=json&id=7680219'

// let response = await fetch(url);

// let commits = await response.json(); // read response body and parse as JSON

// document.write(commits[0]);

// fetch('https://api.ncbi.nlm.nih.gov/lit/ctxp/v1/pmc/?format=citation&contenttype=json&id=7680219')
//   .then(
//     function(response) {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' +
//           response.status);
//         return;
//       }
//       // Examine the text in the response
//       response.json().then(function(data) {
//         console.log(data);
//         document.getElementById('paperBox').innerHTML = JSON.stringify(data.ama.format);
        
//       });
//     }
//   )
//   .catch(function(err) {
//     console.log('Fetch Error :-S', err);
//   });


fetch('https://pubmed.ncbi.nlm.nih.gov/rss/search/1lS0N-smva-CZUlHXn7DglAOqhQ5RuQwRUTsR_XDuciiPs7sh_/?limit=100&utm_campaign=pubmed-2&fc=20220224011816')
    .then(
        function(response){
            response.text().then(function(data){
                let xmlDoc = $.parseXML(data);
                $(xmlDoc).find("Id").each(async function(){
                    console.log($(this).text()); // console
                    var url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id='+$(this).text();
                    await fetch(url)
                        .then(
                            function(response) {
                            if (response.status !== 200) {
                                console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                                return;
                            }
                            // Examine the text in the response
                            response.text().then(function(data) {
                                let xmlDoc1 = $.parseXML(data);
                                console.log($(xmlDoc1).find('Id').text()); // console
                                var a = document.createElement('a');
                                a.setAttribute('href','https://pubmed.ncbi.nlm.nih.gov/' + $(xmlDoc1).find('Id').text());
                                a.setAttribute('target','blank');
                                let div = document.createElement('div');
                                let para1 = document.createElement('h4');
                                para1.className = 'vrPublicationName';
                                let nodeTitle = document.createTextNode($(xmlDoc1).find('Item[Name="Title"]').text());
                                para1.appendChild(nodeTitle);
                                a.appendChild(para1);
                                let para2 = document.createElement('h5');
                                para2.className = 'vrPublicationResearcher';
                                let nodeSrc = document.createTextNode($(xmlDoc1).find('Item[Name="FullJournalName"]').text() + ' ' + $(xmlDoc1).find('Item[Name="PubDate"]').text())
                                para2.appendChild(nodeSrc);
                                
                                // let img = document.createElement('img');
                                // img.setAttribute('src', './pic/Icon/ButtonDownload.png')

                                div.appendChild(a);
                                div.appendChild(para2);
                                // div.appendChild(img);
                                div.className = 'content-downloads';
                                document.getElementById('paperTable').appendChild(div);
                                

                            });
                            }
                        )
                            .catch(function(err) {
                                console.log('Fetch Error :-S', err);
                            });
                    
                    
                });
                
            }
            )
        }
    )
