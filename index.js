// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAER0UK7IrhV2EgCDjqt6rCmNcjw16Rt7k",
        authDomain: "login-with-firebase-b9a64.firebaseapp.com",
        projectId: "login-with-firebase-b9a64",
        storageBucket: "login-with-firebase-b9a64.appspot.com",
        messagingSenderId: "629682896637",
        appId: "1:629682896637:web:d14c1841d13bd81f15c894"
      };
      
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      
      const auth = firebase.auth();
      const database = firebase.database();
      
      function register()
      {
          email = document.getElementById("email").value
          password = document.getElementById("password").value
          full_name = document.getElementById("full_name").value
          favourite_song = document.getElementById("favourite_song").value
          milk_before_cereal = document.getElementById("milk_before_cereal").value
      
      
          if(validate_email(email) == false || validate_pass(password) == false)
          {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 7000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "كلمة المرور أو البريد الإلكتروني غلط"
              });
              return
          }
      
          if(validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false)
          {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 7000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: " هناك خطأ في أحد الحقول أو يوجد حقل فاضي "
              });
              return
          }
      
          auth.createUserWithEmailAndPassword(email, password)
          .then(function(){
      
              var user = auth.currentUser
      
              var database_ref = database.ref()
      
              var user_data = 
              {
                  email: email,
                  full_name : full_name,
                  favourite_song: favourite_song,
                  milk_before_cereal: milk_before_cereal,
                  last_login: Date.now()
              }
      
              database_ref.child('users/' + user.uid).set(user_data)
      
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 7000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: " تم إنشاء الحساب بنجاح "
              });
          })
          .catch(function(error){
              var error_cod = error.code
              var error_message = error.message
      
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 7000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: " البريد الإلكتروني مستخدم في حساب آخر "
              });
          })
      }
      
      
      function login()
      {
          email = document.getElementById("email").value
          password = document.getElementById("password").value
      
      
          if(validate_email(email) == false || validate_pass(password) == false)
          {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 7000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: " كلمة المرور أو البريد الإلكتروني غلط "
              });
              return
          }
      
          auth.signInWithEmailAndPassword(email, password)
          .then(function(){
      
              var user = auth.currentUser
      
              var database_ref = database.ref()
      
              var user_data = 
              {
                  last_login: Date.now()
              }
      
              database_ref.child('users/' + user.uid).update(user_data)
      
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 7000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: " تم تسجيل الدخول أهلا بك "
              });
      
          })
          .catch(function(error){
            var error_code = error.code
                var error_message = error.message
      
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 7000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "error",
                    title: " هناك خطأ في عملية تسجيل الدخول حاول مرة أخرى لاحقا "
                  });
          })
      }
      
      
      
      function validate_email(email)
      {
          expression = /^[^@]+@\w+(\.\w+)+\w$/
          
          if(expression.test(email) == true)
          {
              return true
          }
          else
          {
              return false
          }
      
      }
      
      function validate_pass(password)
      {
          if(password < 6)
          {
              return false
          }
          else
          {
              return true
          }
      }
      
      function validate_field(field)
      {
          if(field == null)
          {
              return false
          }
      
          if(field.length <= 0)
          {
              return false
          }
          else
          {
              return true
          }
      }