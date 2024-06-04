const statsDiv = document.querySelector('.stats')

let totalStationsH2 = document.createElement('h2')
let totalOwnersH2 = document.createElement('h2')

// totalStationsH2.innerText = 

async function getStats() {
    let data = await fetch('/api/stats').then(res => res.json())
    // console.log(data);
    totalStationsH2.innerText = `total station: ${data.total_stations}`
    totalOwnersH2.innerText = `total owners: ${data.total_owners}`
    
    statsDiv.append(totalStationsH2, totalOwnersH2)

    for (let owner of data.owners) {
        let ownerP = document.createElement('p')
        let nameSpan = document.createElement('span')
        let countSpan = document.createElement('span')

        nameSpan.innerText = owner.brand_name
        countSpan.innerText = owner.count

        ownerP.append(nameSpan, countSpan)
        statsDiv.appendChild(ownerP)
    }
}

getStats()