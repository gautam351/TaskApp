using DalLayer.Models;

namespace ServiceLAyer.Models
{
    public class CreateGroupModel
    {
        public string GroupName { get; set; } = null!;
        public int GroupAdmin { get; set; }
        public int? MemberCount { get; set; }
        public int? Visibility { get; set; }
        public int? WriteAccess { get; set; }
        public string? ProfileUrl { get; set; }
        public string? Description { get; set; }

        public static Group Convert(CreateGroupModel model)
        {
            Group grp = new Group
            {
                GroupName = model.GroupName,
                GroupAdmin = model.GroupAdmin,
                MemberCount = model.MemberCount,
                Visibility = model.Visibility,
                WriteAccess = model.WriteAccess,
                ProfileUrl = model.ProfileUrl,
                DateCreated = DateTime.Now,
                Description = model.Description

            };
            return grp;
        }
    }
}
