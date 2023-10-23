
window.addEventListener('load', async function(){

const tableLinksData =  document.getElementById("tableLinksData");

    try {
        const response = await fetch("api/v1/links?userSession=true", {
        method: "GET",
        headers: {
            Authorization: 'Bearer TTxxddse40301dwer13467e1ll@ew',
            'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
       
        for(const element of data){
            let row = document.createElement('tr');
            let direction = document.createElement('a')
            let titleData = document.createElement('td');
            let totalData = document.createElement('td');
            direction.setAttribute('href','detail/'+element.id);
            direction.innerText=element.url;
            totalData.innerText=element.linksScrappers.length;
            tableLinksData.appendChild(row);
            row.appendChild(titleData);
            titleData.appendChild(direction)
            row.appendChild(totalData);
        }
              
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
})