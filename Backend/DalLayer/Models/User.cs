using System;
using System.Collections.Generic;

namespace DalLayer.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime? Dob { get; set; }
        public string EmailId { get; set; } = null!;
        public string? Role { get; set; }
        public int? FollowersCount { get; set; }
    }
}
