var username = document.querySelector('#username')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var confirmpassword = document.querySelector('#confirmpassword')  
var form = document.querySelector('form')
console.log(username,email,password,confirmpassword,form )

console.log(email.nextElementSibling)
// đây là hàm hiển thị error dùng chung
function showError(Taginput, message){
    let parent = Taginput.parentElement
    parent.classList.add('error')
    Taginput.nextElementSibling.innerText = message
}

// đây là hàm hiển thị succeed dùng chung
function showSucceed(Taginput){
    let parent = Taginput.parentElement
    parent.classList.remove('error')
    Taginput.nextElementSibling.innerText = "" 
}

// 1.hàm kiểm tra rỗng

function checkEmptyError(listInput){ 
    let isEmptyError = false;
    // bắt lỗi 4 ô không đc để trống
        listInput.forEach(function(items,index){
            items.value = items.value.trim()
            if(items.value == ""){
                showError(items,'trống')
            }else{
                isEmptyError = true;
                showSucceed(items)
            }
        })
    
        return isEmptyError
}

// 2.check định dạng email
function checkEmail(inputEmail){
    const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  let isEmailError = ! regexEmail.test(inputEmail.value)

    if(regexEmail.test(inputEmail.value)){
        showSucceed(inputEmail)
    }else{
        showError(inputEmail,'trống')
    }
    return isEmailError
}

// 3.check độ dài mật khẩu

function checkLengthError(input,min,max){
    //
    if(input.value.length < min ){
        showError(input,`phải có ít nhất ${min} kỹ tự`)
        return  true
    }
    if(input.value.length > max ){
        showError(input,`không được vượt quá ${max} kỹ tự`)
        return true
    }
    showSucceed(input)
    return false
      
}

// 4.kiểm tra password giống nhau hay không 
function CheckMatchPasswordError(password,CFPassword){
    if(password.value != CFPassword.value){
        showError(CFPassword,'mật khẩu không khớp')
        return true
    }else{
        CFPassword.nextElementSibling.textContent = 'khớp mật khẩu'
    }
    return false 
}


form.addEventListener('submit',function(e){
   // khi click vào thì ko bị load trang 
    e.preventDefault()
    let isEmptyError = checkEmptyError( [username,email,password,confirmpassword] )
 
    let isEmailError = checkEmail(email)
    let isUsernameLengthError = checkLengthError(username,3,10)
    let isPasswordLengthError = checkLengthError(password,3,10)
    let isCheckMatchPasswordError = CheckMatchPasswordError(password,confirmpassword)
    if()
    // kiểm tra lỗi tổng
    // if(isEmailError  || isEmptyError || isUsernameLengthError || isPasswordLengthError || isCheckMatchPasswordError){
    //     // do nothing
    //     alert("ko lỗi")

    // }else{
    //     // không thực thi
    //     alert("lỗi")
    // }
})

