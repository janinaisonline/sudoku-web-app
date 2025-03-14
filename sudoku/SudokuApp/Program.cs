using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
// using SudokuApp.SudokuFunctionality;

// this file contains everything to create an ASP.NET Core web application and start a web server, the controller file then handles the http requests

var builder = WebApplication.CreateBuilder(args);

// **1. Add services to the container**
builder.Services.AddControllers();

// Add services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();