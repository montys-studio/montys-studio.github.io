$().ready(function(){ 
    $('#contactForm').validate({
      rules: {
        firstName: "required", 
        lastName: "required", 
        emailAddress:{
            required:true,
            email:true 
          },
        query: "required"

      },
      messages: {
        firstName: "Please enter your first name", 
        lastName:"Please enter your last name",
        emailAddress:"Please enter a valid email address",
        query: "Please enter a query."
      },
      errorPlacement: function(error,element) {
        $('label[for="' + element.attr("id") + '"]').text(error.text());
      }, 
      submitHandler: function(form, ev){
        ev.preventDefault();
        let token = null;
        let csrf_val = document.getElementsByName("csrf-token")[0]?.content;
        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName");
        let email = document.getElementById("emailAddress");
        let query = document.getElementById("query");

        let fd = new FormData();
        fd.append("FirstName", firstName?.value);
        fd.append("LastName", lastName?.value);
        fd.append("Email", email?.value);
        fd.append("Message", query?.value);
        console.log(csrf_val);
        fetch("/add/message",
            {method: "POST", headers: {"X-CSRF-TOKEN" : csrf_val},
        body: fd}).then(x=>x.json()).then((js)=>{
            console.log(js)});
        alert('Submit Success!')
        return false; 
      }
    })

  });