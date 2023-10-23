
window.addEventListener('load', async function(){

const tableDetailsLinksData =  document.getElementById("tableDetailsLinksData");

    try {           
        const currentURL = window.location.href;
        const urlParts = currentURL.split('/');
        const linkId = urlParts[urlParts.length - 1];

        let responseLinkData = await fetch("http://localhost:3000/api/v1/links/"+linkId, {
        method: "GET",
        headers: {
            Authorization: 'Bearer TTxxddse40301dwer13467e1ll@ew',
            'Content-Type': 'application/json',
        },
        });

        const data = await responseLinkData.json();

        console.log("d ", data)
       
        for(const element of data.linksScrappers){
            let row = document.createElement('tr');
            let NameData = document.createElement('td');
            let linkData = document.createElement('td');
            NameData.innerText=element.urlReference;
            linkData.innerText=element.urlScrapped;
            tableDetailsLinksData.appendChild(row);
            row.appendChild(NameData);
            row.appendChild(linkData);
        }
              
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
})