const myForm = document.getElementById('my_form');

myForm.addEventListener('submit', onsubmit);


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
        let loginData = await axios.post("http://localhost:3000/user/login", obj);
        // console.log(loginData);
        alert(loginData.data.message);

        localStorage.setItem('token',loginData.data.token)

        document.getElementById('useremail').value = "";
        document.getElementById('userpassword').value = "";
        
        window.location.href = "../expenses/expenses.html";

    } catch (err) {
        console.log(err);
    }
}
