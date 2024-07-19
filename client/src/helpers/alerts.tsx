import Swal from "sweetalert2"

const showErrorAlert = (
    statusCode: number, 
    name: string = "",  
    type: string = ""
) => {
    let errorMsg: string;
    
    if (statusCode >= 400 && statusCode < 500) {
        errorMsg = `${type} ${name} not found or private`;
    } else {
        errorMsg = "GitHub is unreachable. Please try again later";
    }

    if (statusCode === 403) {
        errorMsg = "You have sent to many requests. Please try again later";
    }

    Swal.fire({
        titleText: errorMsg,
        background: "#94a3b8",
        color: "#242c3a",
        buttonsStyling: false,
        iconColor: "#f87171",
        imageUrl: './error.svg',
        imageHeight: 200,
        imageWidth: 200,
        showConfirmButton: false
    });
}

export default showErrorAlert;