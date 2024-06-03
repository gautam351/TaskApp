


using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ServiceLAyer.ChatHub;
using ServiceLAyer.Middlwares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


//jwt config setting
string jwtIssuer=builder.Configuration.GetSection("Jwt:Issuer").Get<string>();
string jwtKey=builder.Configuration.GetSection("Jwt:Key").Get<string>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options=>{

options.TokenValidationParameters= new TokenValidationParameters{

    ValidateIssuer=true,
    ValidateLifetime=true,
    ValidateAudience=true,
    ValidateIssuerSigningKey=true,
    ValidIssuer=jwtIssuer,
    ValidAudience=jwtIssuer,
    IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
};


});




builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<TestMiddleware>();


//Adding SignalR in teh application
builder.Services.AddSignalR();  


//cors policy 
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyAllowSpecificOrigins",
                     builder =>
                     {

                         builder.WithOrigins("http://localhost:3001", "http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();

                         //builder.AllowAnyOrigin();
                         //builder.AllowAnyHeader();
                         //builder.AllowAnyMethod();
                         ////builder.AllowCredentials();



                        


                     });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// app.UseMiddleware<TestMiddleware>();



//app.UseWhen(context => context.Request.Path.ToString().Contains("/Register"), appbuilder =>
//{
//    appbuilder.UseMiddleware<TestMiddleware>();
//});



app.UseHttpsRedirection();

app.UseCors("MyAllowSpecificOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHubR>("/chatR");

app.MapControllers();

app.Run();
