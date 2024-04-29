
document.getElementById('btn').addEventListener("click", function () {
    Swal.fire({
        title: 'Success',
        text: 'You will be redirected to the Account page shortly.',
        icon: 'success',
        timer: 1000, // Adjust the timer as needed
        showConfirmButton: false
    }).then(() => {
        // Redirect to the home page
        window.location.href = '/Account.html'; // Replace '/' with the URL of your home page
    })
})


document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const cardHolderName = document.getElementById('cardHolderName').value;
    const cardNumber = document.getElementById('cardNumber').value;

    // Send form data to server using fetch API
    fetch('http://localhost:3000/api/account', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cardHolderName,
            cardNumber
        })
    }).then(res => {
        console.log('res :>> ', res);
        if (res.status === 200) {
            // location.href = 'Account.html'
        }
        if (res.status === 400) {
            alert(res.message)
        }
        
    }).catch(err => {
        console.log('err :>> ', err);
        alert(err)
    })

})
       


