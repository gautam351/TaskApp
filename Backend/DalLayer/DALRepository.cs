using DalLayer.HelperClassesModel;
using DalLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DalLayer;
public class DALRepository
{

    TaskAppContext dbcontext;
    public DALRepository()
    {
        dbcontext = new();
    }


    //method to check whether the user exists or not in the db 
    public bool CheckUser(string username)
    {
        bool status = false;
        try
        {

            var user = dbcontext.Users.Where(x => x.UserName == username).FirstOrDefault();
            if (user != null) status = true;

        }
        catch (System.Exception)
        {
            status = false;

        }
        return status;
    }

    public User RegisterUser(string emailId, string user_name, string password)
    {
        User user = null;
        try
        {
            user = new User
            {
                EmailId = emailId,
                UserName = user_name,
                Password = password
            };
            dbcontext.Users.Add(user);
            dbcontext.SaveChanges();

        }
        catch (System.Exception)
        {

            user = null;
        }
        return user;
    }

    public User GetUser(string username)
    {
        User user = null;
        try
        {
            user = dbcontext.Users.Where(x => x.UserName == username).FirstOrDefault();

        }
        catch (System.Exception)
        {

            user = null;
        }
        return user;
    }

    //  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Group DalMethods 

    public List<Group> GetAllGroupsJoined(int userId)
    {
        List<Group> groups = new List<Group>();
        try
        {
            groups = dbcontext.Groups.Join(dbcontext.GroupJoineds,
                  grp => grp.GroupId, gj => gj.GroupId,
                  (grp, gj) => new { grp, gj }).Distinct().Where(x => x.gj.UserId == userId).Select(x => x.grp).ToList();

        }
        catch (Exception)
        {
            groups = new();


        }
        return groups;

    }

    //create a grp

    public Group CreateGroup(Group grp)
    {
        try
        {

            dbcontext.Groups.Add(grp);
            dbcontext.SaveChanges();


            JoinGroup(grp.GroupAdmin, grp.GroupId);




        }
        catch (Exception)
        {

            return null;
        }
        return grp;
    }

    //join a grp
    public bool JoinGroup(int userId, int grpId)
    {
        bool status = true;
        try
        {
            var check = dbcontext.GroupJoineds.Where(x => x.GroupId == grpId && x.UserId == userId).FirstOrDefault();
            if (check != null) { status = false; }
            else
            {
                GroupJoined grp = new GroupJoined
                {
                    GroupId = grpId,
                    UserId = userId,
                    DateJoined = DateTime.Now
                };
                dbcontext.GroupJoineds.Add(grp);
                dbcontext.SaveChanges();
                status = true;
            }

        }
        catch (Exception)
        {
            status = false;

        }
        return status;
    }


    //leave grp
    //join a grp
    public bool LeaveGrp(int userId, int grpId)
    {
        bool status = true;
        try
        {
            var check = dbcontext.GroupJoineds.Where(x => x.GroupId == grpId && x.UserId == userId).FirstOrDefault();
            if (check == null) { status = false; }
            else
            {
                dbcontext.Remove(check);
                dbcontext.SaveChanges();
                status = true;
            }

        }
        catch (Exception)
        {
            status = false;

        }
        return status;
    }


    public List<List<Group>> SearchGroupByName(string grpName, int userID)
    {
        List<List<Group>> result = new();

        try


        {
            var tResult = dbcontext.Groups.Join(dbcontext.GroupJoineds,
                  grp => grp.GroupId, gj => gj.GroupId,
                  (grp, gj) => new { grp, gj }).Distinct().Where(x =>x.grp.GroupName.Contains(grpName)).ToList();

            var temp = tResult.Where(x => x.gj.UserId == userID).Select(x => x.grp).ToList();
            result.Add(temp);

            result.Add(dbcontext.Groups.Where(x => !temp.Contains(x) && x.GroupName.Contains(grpName)).ToList());




        }
        catch (Exception)
        {
            List<Group> t = new();
            result = new List<List<Group>> { t, t };


        }
        return result;
    }


    public List<GroupMessagesAdditional> GetAllGroupMessages(int groupId,int userID)
    {
        var result = new List<GroupMessagesAdditional>();
        try
        {
            var temp=dbcontext.GroupMessages.Where(x=>x.GroupId == groupId).
                ToList();

            foreach (var item in temp)
            {
                var msg = new GroupMessagesAdditional
                {
                    Id = item.Id,
                    Msg = item.Msg,
                    GroupId = item.GroupId,
                    SendersId = item.SendersId,
                    Time = item.Time,
                    isAdded = dbcontext.TaskAddeds.Where((x) => x.MessageId == item.Id && x.UserId == userID).FirstOrDefault() != null,


                };
                result.Add(msg);
            }




        }
        catch (Exception)
        {

            result = new();
        }
        return result;
    }


    public GroupMessage SendMessage(string msg,int groupId,int senderId)
    {
        GroupMessage result = null;
        try
        {
            var grpMsg = new GroupMessage
            {
                Msg = msg,
                GroupId = groupId,
                SendersId = senderId,

                
           };

            dbcontext.Add(grpMsg);
            dbcontext.SaveChanges();


            result = grpMsg;

        }
        catch (Exception)
        {

            result = null;
        }
        return result;
    }


//we will use it for the edit message fucntionality.
    public bool UpdateMessage(int id,string msg)
    {
        bool result = false;
        try
        {
           var msgObj= dbcontext.GroupMessages.Where(x => x.Id == id).FirstOrDefault();
            msgObj.Msg = msg;
            dbcontext.Update(msgObj);
            dbcontext.SaveChanges(); 
            result = true; 

        }
        catch (Exception)
        {

            result = false;
        }
        return result;
    }

// Add task to the board
public int AddTaskToBoard(int msgid,int userid)
    {
        int result = 0;
        try
        {
            var check=dbcontext.TaskAddeds.Where(x=>x.UserId==userid && x.MessageId==msgid).FirstOrDefault();

            if (check != null)
            {
                dbcontext.Remove(check);
                dbcontext.SaveChanges();
                return -1;
            }

            TaskAdded obj = new()
            {
                MessageId = msgid,  
                UserId = userid 
            };
            dbcontext.Add(obj);
            dbcontext.SaveChanges();
            result = 1;  
        }
        catch (Exception)
        {

            result = 0;
        }
        return result;
    }


// Retrive all the baord Messages for a particular User
  public List<BoardData> GetBoardData(int userId)
    {
        List<BoardData> result = null;
        try
        {
           result= dbcontext.GroupMessages.Join(dbcontext.TaskAddeds,
                (x) => x.Id,
                (x) => x.MessageId,
                (msg, task) => new { msg = msg, task = task }

                ).Where((obj_joined) => obj_joined.task.UserId == userId).Select((x) =>
              
                   new BoardData
                    {
                        Id = x.msg.Id,
                        Msg = x.msg.Msg,
                        Time = x.msg.Time,
                        Status = x.task.Status,
                        TaskId=x.task.Id
                    }

                  
                

                ).ToList();
            // write a join query using linq to join TaskAdded and GroupMessages using id and MessageId field

        }
        catch (Exception)
        {

            result = new();
        }
        return result;
    }


    public int  UpdateBoardStatus(int taskId,int status)
    {
        int result = 0;
        try
        {
           var obj= dbcontext.TaskAddeds.Where((x) => x.Id == taskId).FirstOrDefault();
            if (obj== null)return -1;
            obj.Status = status;
            dbcontext.Update(obj);
            dbcontext.SaveChanges();
            result = 1;

        }
        catch (Exception)
        {

            result = 0;
        }
        return result;

    }


    public int DeleteTaskFromBoard(int taskID)
    {
        int result = 0;
        try
        {
            var check = dbcontext.TaskAddeds.Where((x) => x.Id == taskID).FirstOrDefault();
            dbcontext.Remove(check);
            dbcontext.SaveChanges();
            result = 1;

        }
        catch (Exception)
        {

            result = 0;
            
        }
        return result;
    }



}


