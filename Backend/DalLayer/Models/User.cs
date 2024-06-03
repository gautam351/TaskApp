using System;
using System.Collections.Generic;

namespace DalLayer.Models
{
    public partial class User
    {
        public User()
        {
            GroupMessages = new HashSet<GroupMessage>();
            UserMessageRecievers = new HashSet<UserMessage>();
            UserMessageSenders = new HashSet<UserMessage>();
        }

        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime? Dob { get; set; }
        public string EmailId { get; set; } = null!;
        public string? Role { get; set; }
        public int? FollowersCount { get; set; }

        public virtual ICollection<GroupMessage> GroupMessages { get; set; }
        public virtual ICollection<UserMessage> UserMessageRecievers { get; set; }
        public virtual ICollection<UserMessage> UserMessageSenders { get; set; }
    }
}
