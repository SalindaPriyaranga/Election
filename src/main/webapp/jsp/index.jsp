<%@ taglib prefix="c" uri="http://www.springframework.org/tags" %>
<!------ Include the above in your HEAD tag ---------->
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html>
<head>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <meta charset="ISO-8859-1">
    <title>LOGIN</title>

</head>
<body style="background-color: #aa43aa;">
<section class="vh-80 gradient-custom">
    <div class="container py-5 h-60">
        <div class="row d-flex justify-content-center align-items-center h-70">
            <div class="col-10 col-md-6 col-lg-4 col-xl-5">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-5 text-center"  style="background-color: #3c003e;">

                        <div class="mb-md-5 mt-md-4 pb-5">

                            <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                            <p class="text-white-50 mb-5">Please enter your login and password!</p>

                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <input type="email" id="typeEmailX" class="form-control form-control-lg"/>
                                <label class="form-label" for="typeEmailX">User Name</label>
                            </div>

                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <input type="password" id="typePasswordX" class="form-control form-control-lg"/>
                                <label class="form-label" for="typePasswordX">Password</label>
                            </div>

                            <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>

                            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5"
                                    type="submit">Login
                            </button>



                            <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign
                                Up</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<script type="text/javascript">
    function submitForm() {


        var data = {};
        data["name"] = document.getElementById("inputsername").value;
        data["password"] = document.getElementById("inputpw").value;
        document.getElementById("lblError").hidden = true;
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "api/v1/login",
            headers: {"X-AUTH-TOKEN": "test-value"},
            data: JSON.stringify(data),
            dataType: 'json',
            timeout: 20000,
            success: function (data) {
                if (data !== null) {
                    // console.log(data.data.userId)
                    if (data.message === "success") {
                        //sideBarPrivlages();
//                                 alert("ok");
                        document.getElementById("home").click();
                        document.getElementById("lblError").hidden = true;


                    } else {
                        //alert("fail");
                        document.getElementById("lblError").innerHTML = data.message;
                        document.getElementById("lblError").hidden = false;
                    }
                }
            },
            error: function (e) {
                //swal('Alert!', "Try again", 'error');
                // alert(e);
                console.log("ERROR: ", e);
                // document.getElementById("lblError").hidden = false;
            },
            done: function (e) {
                console.log("DONE");
            }
        });
    }
</script>
</body>
</html>
