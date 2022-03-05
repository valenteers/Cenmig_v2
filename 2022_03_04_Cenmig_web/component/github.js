// fetch('https://github.com/valenteers/Cenmig_web_asset/blob/534c24c8bd4e2a7b3370b1e6c0e17d6cd87ea40a/component/publication.js')
//   .then(response => response.json())
//   .then(formatedResponse =>  console.log(formatedResponse))
//   let div = document.createElement('div');
//   document.getElementById('test').appendChild(formatedResponse);
//NB please replace url with your own

fetch('https://github.com/valenteers/Cenmig_web_asset/blob/82eadaf2f4f63b07ffa5c80aae9e938ff94f75c4/component/publication.html')
    .then(function (response) {
        switch (response.status) {
            // status "OK"
            case 200:
                return response.text();
            // status "Not Found"
            case 404:
                throw response;
        }
    })
    .then(function (template) {
        console.log(template);
    })
    .catch(function (response) {
        // "Not Found"
        console.log(response.statusText);
    });