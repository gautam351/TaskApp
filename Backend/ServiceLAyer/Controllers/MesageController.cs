using DalLayer;
using DalLayer.HelperClassesModel;
using DalLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceLAyer.ErrorCodes;
using ServiceLAyer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceLAyer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MessagesController : ControllerBase
    {

        DALRepository repo;

        public MessagesController()
        {
            repo = new();
        }

        [HttpGet]
        public IActionResult GetAllMessages(int  groupId,int userId)
        {    
            List<GroupMessagesAdditional> messages = new();   
            try
            {

              messages=  repo.GetAllGroupMessages(groupId,userId);
            }
            catch (Exception)
            {
                return CustomResponses.CustomResponse("Internal Server Error", 500, new { });


            }
            return CustomResponses.CustomResponse(message: "messages fetched successfully", 200, new { messages });

        }


        [HttpPost]
        public GroupMessage SendMessage(Message MsgBody)
        {
            GroupMessage result = null;
            try
            {

                result = repo.SendMessage(MsgBody.Msg,MsgBody.RecieverId,MsgBody.SenderId);
            }
            catch (Exception)
            {
                //return CustomResponses.CustomResponse("Internal Server Error", 500, new { });
                return null;


            }
            //return CustomResponses.CustomResponse(message: "messages fetched successfully", 200, new { result });
            return result;
        }


        [HttpPut]
        public IActionResult UpdateMessage(UpdateMessage msgObj)
        {
            bool result = false;
            try
            {

                result = repo.UpdateMessage(msgObj.Id,msgObj.Msg);
            }
            catch (Exception)
            {
                return CustomResponses.CustomResponse("Internal Server Error", 500, new { });


            }
            return CustomResponses.CustomResponse(message: "messages updated successfully", 200, new { result });
        }


        [HttpGet]
        public IActionResult AddToBoard(int msgId,int userId)
        {
            string result = "";
            try
            {
                var check = repo.AddTaskToBoard(msgId, userId);
                if (check == 1) result = "Added Successfully";
                else if (check == -1) result = "Removed Successfully";
                else if (check == 0) result = "Something went wrong";
            }
            catch (Exception)
            {

                return CustomResponses.CustomResponse("Internal Server Error", 500, new { });

            }
            return CustomResponses.CustomResponse(message: "messages Added successfully", 200, new { result });
        }


    }
}
