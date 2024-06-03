using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ServiceLAyer.Models;

public class RegisterUser
{



    public string? EmailId { get; set; }

    [Required]

    public string UserName { get; set; }
    [Required]
    public string Password { get; set; }

}
