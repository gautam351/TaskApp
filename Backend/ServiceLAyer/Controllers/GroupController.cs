using DalLayer;
using DalLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceLAyer.ErrorCodes;
using ServiceLAyer.Models;

namespace ServiceLAyer.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]/[action]")]
public class GroupController : ControllerBase
{

    DALRepository repo;

    public GroupController()
    {
        repo = new();
    }

    [HttpGet]
    public IActionResult GetAllGroups(int userId)
    {
        List<Group> allGroups = new();
        try
        {
            allGroups = repo.GetAllGroupsJoined(userId);
        }
        catch (System.Exception)
        {

            allGroups = new();
        }
        return CustomResponses.CustomResponse(message: "group fetched successfully", 200, new { allGroups });

    }

    [HttpPost]
    public IActionResult CreateGroup(CreateGroupModel grp)
    {
        Group g = null;
        try
        {

            g = repo.CreateGroup(CreateGroupModel.Convert(grp));


        }
        catch (Exception)
        {
            return CustomResponses.CustomResponse("Internal Server Error", 500, new { });

        }
        return CustomResponses.CustomResponse(message: "group created successfully", 201, new { g });


    }

    [HttpGet]
    public IActionResult JoinGroup(int grpID, int userID)
    {
        bool status = false;
        try
        {
            status = repo.JoinGroup(userID, grpID);
        }
        catch (Exception)
        {

            status = false;
            return CustomResponses.CustomResponse("Internal Server Error", 500, new { });
        }
        return CustomResponses.CustomResponse(message: "group joined successfully", 201, new { status });

    }

    [HttpGet]
    public IActionResult SearchGroupByName(string groupName, int userID)
    {
        List<List<Group>> result;

        try
        {
            result = repo.SearchGroupByName(groupName, userID);
        }
        catch (Exception)
        {

            result = null;
            return CustomResponses.CustomResponse("Internal Server Error", 500, new { });

        }

        return CustomResponses.CustomResponse(message: "groups Fetched successfully", 200, new { result });

    }



    [HttpGet]
    public IActionResult LeaveGrp(int grpID, int userID)
    {
        bool status = false;
        try
        {
            status = repo.LeaveGrp(userID, grpID);
        }
        catch (Exception)
        {

            status = false;
            return CustomResponses.CustomResponse("Internal Server Error", 500, new { });
        }
        return CustomResponses.CustomResponse(message: "group Leaved successfully", 201, new { status });

    }




}
