using System.IdentityModel.Tokens.Jwt;
using BCrypt.Net;
using DalLayer;
using DalLayer.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceLAyer.ErrorCodes;
using ServiceLAyer.Helper;
using ServiceLAyer.Models;

namespace ServiceLAyer.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AuthControllers : ControllerBase
{


//repo object
DALRepository repo;

  private IConfiguration _config;
       

public AuthControllers(IConfiguration config){
   repo=new();
   _config=config;
}


[HttpPost]
public IActionResult RegisterUser( RegisterUser Ruser){
   try
   {
    //check whther details are complete or not
   if(Ruser.UserName=="" || Ruser.Password=="" || Ruser.EmailId=="")return  CustomResponses.CustomResponse(message:"Insufficient Details",400,new {});
   // check if user exists or not ; if exists return error

if(repo.CheckUser(Ruser.UserName)) return CustomResponses.CustomResponse("user already exists",200,new {});

   // if doesn't exists register user 
   string hashedPassword= BCrypt.Net.BCrypt.HashPassword(Ruser.Password);
   
   User  user= repo.RegisterUser(Ruser.EmailId,Ruser.UserName,hashedPassword);
      
   if(user==null) return  CustomResponses.CustomResponse("Internal Server Error",500,new {});


   // create its token 
    
    string token= JWTTokenHelper.GenerateToken(user.UserName,_config["Jwt:Key"],_config["Jwt:Issuer"]);
    


   //return token

  return  CustomResponses.CustomResponse(message:"user registered successfully",201,new {token=token});
   }
   catch (System.Exception)
   {
    
     return CustomResponses.CustomResponse("Internal Server Error",500,new {});
   }


}

// -------------------------------------------------------------------------------------------------------------------

[HttpPost]
public IActionResult LoginUser(RegisterUser Ruser){

try
{

  
  // check if user exists or not ; if not exists return error
  if(!repo.CheckUser(Ruser.UserName)) return CustomResponses.CustomResponse("user doesn't exists",200,new {});
  
  //check if credentils are correct
  var user=repo.GetUser(Ruser.UserName);
   
  //match the password
  if(!BCrypt.Net.BCrypt.Verify(Ruser.Password,user.Password)) return CustomResponses.CustomResponse("Invalid Credentials",401,new {});

  //generate Token and return 
  // create its token 
    
    string token= JWTTokenHelper.GenerateToken(user.UserName,_config["Jwt:Key"],_config["Jwt:Issuer"]);
    


   //return token

  return  CustomResponses.CustomResponse(message:"user LoggedIn successfully",200,new {token=token});

  
}
catch (System.Exception)
{
  
  return CustomResponses.CustomResponse("Internal Server Error",500,new {});
}




}


[Authorize]
[HttpGet]
public IActionResult AuthTestFucntion(string name){
    var token = Request.Headers["Authorization"].ToString().Substring(7);
    Console.WriteLine(token);
var handler = new JwtSecurityTokenHandler();
var decodedToken = handler.ReadJwtToken(token);
// var decodedToken1 = handler.ReadJwtToken(token).Claims.Where(x=>x.);

    foreach (var item in decodedToken.Claims){
      Console.WriteLine(item.Type);
      Console.WriteLine(item.Value);

    }
  return  new JsonResult(name);
}



}
