import { toast } from "sonner";



const errorHandle = (error ) =>{
    console.log('sd',error);
    const axiosError = error;
    if(axiosError.response?.data){
        const errorResponse = axiosError.response.data;
        console.log('errorResponse',errorResponse);
        if(errorResponse.message){
            toast.error(errorResponse.message)
        }
        
    }else{
        toast.error("Loading.... please wait")
    }
}

export default errorHandle;