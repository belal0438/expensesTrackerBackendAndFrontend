

const Myform = document.getElementById("my_form");
Myform.addEventListener('submit', onsubmit);


// async function GetExpensedata() {
//     try {
//         const token = localStorage.getItem('token');
//         let getdata = await axios.get("http://54.147.36.233:3000/expenses/getexpenses", { headers: { 'Authorization': token } });
//         // console.log(getdata.data);
//         getdata.data.forEach(element => {
//             DisplayOnScreen(element);
//         });

//     } catch (error) {
//         console.log(error)
//     }
// }
// GetExpensedata()



async function onsubmit(eve) {
    try {
        eve.preventDefault();
        const amount = document.getElementById('amount');
        const descript = document.getElementById('descript');
        const select = document.getElementById('select');
        let obj = {
            amount: amount.value,
            descript: descript.value,
            select: select.options[select.selectedIndex].value
        }
        // console.log(obj);
        const token = localStorage.getItem('token');
        let userloginData = await axios.post('http://54.147.36.233:3000/expenses/postexpenses', obj, { headers: { 'Authorization': token } })
        // console.log(userloginData);
        DisplayOnScreen(obj);

        document.getElementById('amount').value = "";
        document.getElementById('descript').value = "";
        document.getElementById('select').value = "";

    } catch (err) {
        console.log(err);
    }
}



function DisplayOnScreen(obj) {
    const ExpesesUl = document.getElementById('expensesList');
    const li = document.createElement('li');

    const Delbtn = document.createElement('button');
    Delbtn.innerText = "Delete";

    const Editbtn = document.createElement('button')
    Editbtn.innerText = "Eddit";

    li.innerHTML = `Amount:- ${obj.amount},   Description:- ${obj.descript},  Category:- ${obj.select}  `;


    Delbtn.onclick = async (eve) => {
        const token = localStorage.getItem('token');
        await axios.delete(`http://54.147.36.233:3000/expenses/delete/${obj.id}`, { headers: { 'Authorization': token } })
        ExpesesUl.removeChild(li);
    }




    Editbtn.onclick = async (eve) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://54.147.36.233:3000/expenses/delete/${obj.id}`, { headers: { 'Authorization': token } })

            document.getElementById('amount').value = obj.amount;
            document.getElementById('descript').value = obj.descript;
            document.getElementById('select').value = obj.select;
            ExpesesUl.removeChild(li);
        } catch (err) {
            console.log(err)
        }

    }
    li.appendChild(Editbtn);
    li.appendChild(Delbtn);
    ExpesesUl.appendChild(li);
}


async function Getdata() {
    try {
        const token = localStorage.getItem('token');
        let getdata = await axios.get(`http://54.147.36.233:3000/expenses/pagination`, { headers: { 'Authorization': token } });
        // console.log(getdata.data);
        // // console.log(getdata.data.allExpense); 
        // console.log(getdata.data.currentPage);
        showPagination(getdata.data)
    } catch (error) {
        console.log(error)
    }
}
Getdata()



async function showPagination({ currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage, lastPage }) {
    try {
        const prevBtn = document.getElementById('prev');
        const currBtn = document.getElementById('curr');
        const netxBtn = document.getElementById('next');


        if (hasPreviousPage) {
            prevBtn.addEventListener('click', () => {
                // console.log(previousPage)
                getProducts(previousPage)

            });
        }


        currBtn.addEventListener('click', () => {
            // console.log("currentPage")
            getProducts(currentPage)
        });


        if (hasNextPage) {
            netxBtn.addEventListener('click', () => {
                // console.log(nextPage)
                getProducts(nextPage)
            })
        }


    }
    catch (err) {
        console.log(err)
    }
}


async function getProducts(page) {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://54.147.36.233:3000/expenses/pagination?page=${page}`, { headers: { 'Authorization': token } })
        console.log(response);
        const ExpesesUl = document.getElementById('expensesList');
        ExpesesUl.innerHTML = "";
        response.data.allExpense.forEach(element => {
            DisplayOnScreen(element);
        });
        showPagination(response.data)
    }
    catch (err) {
        console.log(err)
    }
}

