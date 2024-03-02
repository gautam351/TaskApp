using DalLayer;
using DalLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceLAyer.ErrorCodes;

namespace ServiceLAyer.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]/[action]")]
public class GroupController : ControllerBase
{

DALRepository repo;

GroupController(){
        repo = new();
}

[HttpGet]
public IActionResult  GetAllGroups(int userId){
        List<string> allGroups = new();
        try
        {
            allGroups = repo.GetAllGroups(userId);
        }
        catch (System.Exception)
        {

            allGroups = new();
        }
  return  CustomResponses.CustomResponse(message:"group fetched successfully",201,new {allGroups});
        
}




}
