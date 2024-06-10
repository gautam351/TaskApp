using DalLayer;
using DalLayer.HelperClassesModel;
using DalLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceLAyer.ErrorCodes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceLAyer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class KanbanBoardController : ControllerBase
    {

        DALRepository repo;

        public KanbanBoardController()
        {
            repo = new();
        }

        [HttpGet]
        public IActionResult GetBoardData(int userId)
        {

            List<BoardData> result = null;
            try
            {
                result = repo.GetBoardData(userId);
            }
            catch (Exception)
            {
                return CustomResponses.CustomResponse("Internal Server Error", 500, new { });


            }
            return CustomResponses.CustomResponse(message: "messages fetched successfully", 200, new { result });

        }

        [HttpPut]
        public IActionResult UpdateBoardStatus(int taskId,int status)
        {

            int result = 0;
            try
            {
               result=  repo.UpdateBoardStatus(taskId,status);
               
            }
            catch (Exception)
            {
                return CustomResponses.CustomResponse("Internal Server Error", 500, new { });


            }
            return CustomResponses.CustomResponse(message: "task updated successfully", 200, new { result });

        }


        [HttpDelete]
        public IActionResult DeleteTaskFromBoard(int taskId)
        {

            int result = 0;
            try
            {
                result = repo.DeleteTaskFromBoard(taskId);
                
            }
            catch (Exception)
            {
                return CustomResponses.CustomResponse("Internal Server Error", 500, new { });


            }
            return CustomResponses.CustomResponse(message: "task updated successfully", 200, new { result });

        }

    }
}
