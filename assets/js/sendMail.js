function sendMail(contactForm){
    emailjs.send('service_xw', 'template_fm2y2gi', {
        "from_name":contactForm.name.value ,
        "from_email": contactForm.email.value ,
        "from_phone": contactForm.phone.value ,
        "from_message" : contactForm.message.value
    })
    .then(
        function (response){
            console.log("SUCCESS", response);
            document.getElementById("emailNotification").style.display = "block";
            document.getElementById("emailNotification").classList.add('email-succes');
            document.getElementById("email-alert").innerHTML =" Your message has been sent";
        },
        function (error){
            console.log("FAILED", error);
            document.getElementById("emailNotification").style.display = "block";
            document.getElementById("emailNotification").classList.add('email-failed');
            document.getElementById("email-alert").innerHTML ="Message not sent. Please try again";
            
        }); 
        
            console.log(contactForm.name.value);     
        document.getElementById("sendMail").reset();
        return false;     
}