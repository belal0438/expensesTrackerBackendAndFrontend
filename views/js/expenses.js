

const Myform = document.getElementById("my_form");
Myform.addEventListener('submit', onsubmit);


// async function GetExpensedata() {
//     try {
//         const token = localStorage.getItem('token');
//         let getdata = await axios.get("http://localhost:3000/expenses/getexpenses", { headers: { 'Authorization': token } });
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
        let userloginData = await axios.post('http://localhost:3000/expenses/postexpenses', obj, { headers: { 'Authorization': token } })
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
        await axios.delete(`http://localhost:3000/expenses/delete/${obj.id}`, { headers: { 'Authorization': token } })
        ExpesesUl.removeChild(li);
    }




    Editbtn.onclick = async (eve) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/expenses/delete/${obj.id}`, { headers: { 'Authorization': token } })

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
        let getdata = await axios.get(`http://localhost:3000/expenses/pagination`, { headers: { 'Authorization': token } });
        // console.log(getdata.data);
        // // console.log(getdata.data.allExpense); // [{…}, {…}, {…}, {…}]
        // console.log(getdata.data.currentPage);
        showPagination(getdata.data)
    } catch (error) {
        console.log(error)
    }
}
Getdata()




async function pageSize(val) {
    try {
        const token = localStorage.getItem('token')
        // localStorage.setItem('pageSize', `${val}`)
        localStorage.setItem('pageSize',`${val}`)
        const page = 1
        const res = await axios.get(`http://localhost:3000/expenses/pagination?page=${page}&pageSize=${val}`, { headers: { 'Authorization': token } });
        // console.log(res)
        res.data.allExpense.forEach(element => {
            DisplayOnScreen(element);
        });
        showPagination(res.data)
    }
    catch (err) {
        console.log(err)
    }
}



async function showPagination({ currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage, lastPage }) {
    try {
        const prevBtn = document.getElementById('prev');
        const currBtn = document.getElementById('curr');
        const netxBtn = document.getElementById('next');

        if (hasPreviousPage) {
            prevBtn.addEventListener('click', () => {
                // console.log(previousPage)
                // getProducts(previousPage)
                pageSize(previousPage)
            })
        }
        currBtn.addEventListener('click', () => {
            // console.log("currentPage")
            // getProducts(currentPage)
            pageSize(currentPage)
        });
        if (hasNextPage) {
            netxBtn.addEventListener('click', () => {
                // console.log(nextPage)
                // getProducts(nextPage)
                pageSize(nextPage)
            })
        }
        if (currentPage !== 1) {
            currBtn.addEventListener('click', (eve) => {
                // getProducts(1);
                pageSize(1);
            })
        }

    }
    catch (err) {
        console.log(err)
    }
}


// async function getProducts(page) {
//     try {
//         const token = localStorage.getItem('token')
//         const pageSize = localStorage.getItem('pageSize')
//         const response = await axios.get(`http://localhost:3000/expenses/pagination?page=${page}&pageSize=${pageSize}`, { headers: { 'Authorization': token } })
//         // console.log(response)
//         response.data.allExpense.forEach(element => {
//             DisplayOnScreen(element);
//         });
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

