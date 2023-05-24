const myForm = document.getElementById('my_form');

myForm.addEventListener('submit', onsubmit);


// // get data from userData for Email Id and Password

// async function GetdatafromUser(){
//     try {
//         let getdata = await axios.get("http://localhost:4000/getuser");
//        console.log(getdata.data);
//     } catch (error) {
//         console.log(error)
//     }
// }
// GetdatafromUser()

async function onsubmit(eve) {
    try {
        eve.preventDefault();
        const Email = document.getElementById('useremail');
        const Password = document.getElementById('userpassword');
        let obj = {
            Email: Email.value,
            Password: Password.value
        }
        // console.log(obj);
        let loginData = await axios.post("http://localhost:3000/login", obj);
        console.log(loginData);
    } catch (err) {
        console.log(err);
    }
}