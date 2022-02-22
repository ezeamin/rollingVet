export default function changeEyePosition(status){
    let eye = document.getElementById("eyeBtn");
    if(!status){ //error de contraseña
        eye.style.right = "30px";
    }
    else{
        eye.style.right = "10px";
    }
}