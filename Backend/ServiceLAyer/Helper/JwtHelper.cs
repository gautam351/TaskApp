using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace ServiceLAyer.Helper
{
    public class JWTTokenHelper{

        public static   string GenerateToken(string userName,string key,string Issuer){
             var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
              
              //payload part 
              var claims = new[] {
               new Claim(JwtRegisteredClaimNames.Sub, userName)
                  };
            var Sectoken = new JwtSecurityToken(Issuer,
              Issuer,
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token =  new JwtSecurityTokenHandler().WriteToken(Sectoken);
            return token;
        }
    }
}