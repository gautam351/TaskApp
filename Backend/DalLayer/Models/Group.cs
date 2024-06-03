using System;
using System.Collections.Generic;

namespace DalLayer.Models
{
    public partial class Group
    {
        public Group()
        {
            GroupMessages = new HashSet<GroupMessage>();
        }

        public int GroupId { get; set; }
        public string GroupName { get; set; } = null!;
        public int GroupAdmin { get; set; }
        public int? MemberCount { get; set; }
        public int? Visibility { get; set; }
        public int? WriteAccess { get; set; }
        public string? ProfileUrl { get; set; }
        public DateTime? DateCreated { get; set; }
        public string? Description { get; set; }
        public int? ViceAdmin { get; set; }

        public virtual ICollection<GroupMessage> GroupMessages { get; set; }
    }
}
