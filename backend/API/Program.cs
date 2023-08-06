using API.Models;

// for in memory database... 
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddScoped<VillageContext>(provider =>
{
    var optionsBuilder = new DbContextOptionsBuilder<VillageContext>()
        .UseInMemoryDatabase("Data Source=village.db");
    return new VillageContext(optionsBuilder.Options);
});

builder.Services.AddScoped<UserContext>(provider =>
{
    var optionsBuilder = new DbContextOptionsBuilder<UserContext>()
        .UseInMemoryDatabase("Data Source=user.db");
    return new UserContext(optionsBuilder.Options);
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();


app.UseSwagger();
app.UseSwaggerUI();

app.MapFallbackToFile("index.html");

app.Run();
