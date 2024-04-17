export const GetHeaderOptions = () => {
    const token = sessionStorage.getItem("token")     ;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            
         }
    };
    return config;
}