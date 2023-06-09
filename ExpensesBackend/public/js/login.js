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
        let loginData = await axios.post("http://54.147.36.233:3000/login", obj);
        // console.log(loginData);
        alert(loginData.data.message);

        localStorage.setItem('token',loginData.data.token)

        document.getElementById('useremail').value = "";
        document.getElementById('userpassword').value = "";
        
        window.location.href = "../views/expenses.html";

    } catch (err) {
        console.log(err);
    }
}
