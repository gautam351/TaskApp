using DalLayer.Models;

namespace DalLayer;
public class DALRepository
{

    TaskAppContext dbcontext;
    public  DALRepository(){
       dbcontext=new();
    }


//method to check whether the user exists or not in the db 
    public bool CheckUser(string username){
        bool status=false;
        try
        {
           
        var user=   dbcontext.Users.Where(x=>x.UserName==username).FirstOrDefault();
        if(user!=null)status=true;
            
        }
        catch (System.Exception)
        {
            status=false;
            
        }
        return status;
    }

    public User RegisterUser(string emailId, string user_name,string password){
        User user=null;
        try
        {   user = new User{
                        EmailId=emailId,
                        UserName=user_name,
                        Password=password
               };
            dbcontext.Users.Add(user);
            dbcontext.SaveChanges();
            
        }
        catch (System.Exception)
        {
            
            user=null;
        }
        return user;
    }
 
 public User GetUser(string username){
    User user=null;
    try
    {
         user=dbcontext.Users.Where(x=>x.UserName==username).FirstOrDefault();

    }
    catch (System.Exception)
    {
        
       user=null;
    }
    return user;
 }

//  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Group DalMethods 

public List<string> GetAllGroups(int userId){
List<string> allgroups;
        try
        {
            allgroups = dbcontext.GroupJoineds.Join(
             dbcontext.Groups,
             gj => gj.GroupId,
             g => g.Id,
             (gj, j) => new { gj, j }

              ).Select(x => x.j.GroupName).ToList();
        }
        catch (System.Exception)
        {

            allgroups = new();
        }
        return allgroups;
}
    
}
