

const Myform = document.getElementById("my_form");

Myform.addEventListener('submit', onsubmit);

async function onsubmit(eve) {
    try {
        eve.preventDefault();
        const Name = document.getElementById('username');
        const Email = document.getElementById('useremail');
        const Phone = document.getElementById('usernumber');
        const Password = document.getElementById('userpassword');

        let obj = {
            Name: Name.value,
            Email: Email.value,
            Phone: Phone.value,
            Password: Password.value
        }
        // console.log(obj);
        let userloginData = await axios.post('http://54.147.36.233:3000/user/signup', obj)
        console.log(userloginData);

        document.getElementById('username').value = "";
        document.getElementById('useremail').value = "";
        document.getElementById('usernumber').value = "";
        document.getElementById('userpassword').value = "";


        window.location.href = "../login/login.html";

    } catch (err) {
        console.log(err);
    }
}