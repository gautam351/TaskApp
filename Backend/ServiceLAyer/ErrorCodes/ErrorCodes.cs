using Microsoft.AspNetCore.Mvc;

namespace ServiceLAyer.ErrorCodes
{

    public  class CustomResponses{
      
     
       public static IActionResult CustomResponse(string message,int statusCode,dynamic data){
        JsonResult customMessage= new JsonResult(new {message=message,data=data});
        customMessage.StatusCode=statusCode;
        return customMessage;
      }


    } 
    
}