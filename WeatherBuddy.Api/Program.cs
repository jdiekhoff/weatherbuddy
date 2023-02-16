using AspNetCore.Proxy;
using WeatherBuddy.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddProxies();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddOpenWeatherMapConfiguration(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseEndpoints( endpoints =>{
  endpoints.MapControllers();
});

app.UseCors(x =>
  x.AllowAnyMethod()
  .AllowAnyHeader()
  .WithOrigins("http://localhost", "https://localhost", "https://weatherbuddy.azurewebsites.net"));

app.Run();
