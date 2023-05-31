
const rzp_button = document.getElementById('rzp-button1');


async function GetUserdata() {
    try {
        const token = localStorage.getItem('token');
        let getdata = await axios.get("http://localhost:3000/getUserdata", { headers: { 'Authorization': token } });
        // console.log(getdata.data);
        getdata.data.forEach(element => {
            // console.log(element)
            if (element.ispremiumuser == true) {
                premiumFeatures();
                LeaderBoard();
                fordownloading();
            }
        });

    } catch (error) {
        console.log(error)
    }
}
GetUserdata()







rzp_button.onclick = async (eve) => {
    try {
        eve.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/purchasepremium", { headers: { 'Authorization': token } });
        // console.log(response);
        // console.log(response.data);
        var options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function (response) {
                await axios.post("http://localhost:3000/update_transation_status", {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id
                }, { headers: { 'Authorization': token } })
                alert('you are a premium User Now');
                premiumFeatures();
                fordownloading();
            }
        }
        const rzp1 = new Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
            console.log(response)
            alert('something went wrong')
        })
    } catch (err) {
        console.log(err);
    }
}








async function premiumFeatures() {
    try {
        premiunList = document.getElementById('premiunList');
        premiunListDon = document.getElementById('premiunListDon')
        li = document.createElement('li');
        Premium = document.getElementById('Premium')
        button = document.createElement('button');
        button.innerText = "you are a premium user now";


        leaderbordBtn = document.createElement('button')
        leaderbordBtn.id = "BtnLeader";
        leaderbordBtn.innerText = "Show LeaderBoard";


        forDowloaddBtn = document.createElement('button')
        forDowloaddBtn.id = "BtnDownload";
        forDowloaddBtn.innerText = "Downloading"; 



        li.append(button);
        li.append(leaderbordBtn);
        li.append(forDowloaddBtn);
        premiunList.remove(Premium)
        premiunListDon.append(li);
    }
    catch (err) {
        console.log(err)
    }
}




function LeaderBoard() {
    try {
        let leaderboard = document.getElementById('leaderboard');
        let leaderHeading = document.getElementById('leader');
        let leaderbordBtn = document.getElementById('BtnLeader');

        leaderbordBtn.onclick = async(eve) => {
            const token = localStorage.getItem('token');

            const getUserLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard', { headers: { 'Authorization': token } });
            // console.log(getUserLeaderBoardArray)
            leaderHeading.innerText = "Show Leader Bord";

            getUserLeaderBoardArray.data.forEach((Element) => {
                const li = document.createElement('li');
                li.innerHTML = ` Name:  ${Element.Name}      Total_cost:  ${Element.totalexpenses} `
                leaderboard.append(li);
            })
        }
    } catch (err) {
        console.log(err);
    }

}




function fordownloading() {
    try {
        let DownloaddBtn = document.getElementById('BtnDownload');
        DownloaddBtn.onclick = async(eve) => {

            const token = localStorage.getItem('token');

            const getUserDownloadedData = await axios.get('http://localhost:3000/user/Download', { headers: { 'Authorization': token } });
         console.log(getUserDownloadedData)
        }
    } catch (err) {
        console.log(err);
    }
}


