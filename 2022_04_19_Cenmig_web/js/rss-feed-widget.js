const RSS_URL = `https://pubmed.ncbi.nlm.nih.gov/rss/search/1FiYL_imNw8ty1jPPnPBSeX-UgbBGG-ZDdbYzIBwcdgo2uwkht/?limit=100&utm_campaign=pubmed-2&fc=20220308010101`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    console.log(data);
    // var data = data.split('</em>').join(''); 
    // var data = data.replace(/"</em>"/g,"");
    // var data = data.replace(/<em>/g,"");
    var items = data.querySelectorAll("item");
    let html = ``;
	items.forEach(loopDisplay)
	function loopDisplay(item){
		html +=
		`
		<div class="border-2 border-gray-300 hover:shadow-xl hover:bg-indigo-100 rounded-3xl px-6 py-5 flex flex-col justify-between leading-normal mb-6">
			<div>
				<a href="${item.querySelector("link").innerHTML}" target="_blank">
					<h5 class="mb-3">
						${item.querySelector("title").innerHTML}
					</h5>
					<p class="text-sm line-clamp-2">
						${item.querySelector("description").innerHTML}
					</p>
					<p class="text-sm text-right">
						<strong>${item.querySelector("pubDate").innerHTML}</strong>
					</p>
				</a>
			</div>
		</div>
		`
       ;
	}
	document.getElementById("ncbi").innerHTML = html;
  });

