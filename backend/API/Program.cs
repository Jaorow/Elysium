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


// builder.Services.AddDbContext<VillageContext>(options =>
//     options.UseInMemoryDatabase("Data Source=village.db"));

// builder.Services.AddDbContext<UserContext>(options =>
//     options.UseInMemoryDatabase("Data Source=user.db"));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// configuation for CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

// app.options("/parse", cors(), (req, res) => {
//     res.sendStatus(204);
// });

// add app options
// app.options('*', cors());
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
app.UseSwagger();
app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
