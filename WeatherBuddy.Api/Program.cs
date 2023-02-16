using AspNetCore.Proxy;
using Microsoft.Extensions.Options;
using WeatherBuddy.Api.Configuration;
using WeatherBuddy.Api.Extensions;
using WeatherBuddy.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddProxies();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddOpenWeatherMapConfiguration(builder.Configuration);
builder.Services.AddHttpClient<IWeatherService, BingWeatherMapService>((innerServices, client) =>
			{
				var settings = innerServices.GetRequiredService<IOptions<BingWeatherMapConfiguration>>().Value;

				client.BaseAddress = new Uri(settings.BaseAddress);
				client.DefaultRequestHeaders.Accept.Add(new("application/json"));
			});
builder.Services.AddHttpClient<IWeatherService, OpenWeatherMapService>((innerServices, client) =>
			{
				var settings = innerServices.GetRequiredService<IOptions<OpenWeatherMapConfiguration>>().Value;

				client.BaseAddress = new Uri(settings.BaseAddress);
				client.DefaultRequestHeaders.Accept.Add(new("application/json"));
			});

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
