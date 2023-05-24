const myForm = document.getElementById('my_form');

myForm.addEventListener('submit', onsubmit);

async function onsubmit(eve) {
    try{
    eve.preventDefault();
    const Name = document.getElementById('username');
    const Email = document.getElementById('useremail');

    let obj = {

        Name: Name.value,
        Email: Email.value
    }
    // console.log(obj);

   await axios.post("http://localhost:3000/login",obj);
    } catch(err){
        console.log(err);
    }
}