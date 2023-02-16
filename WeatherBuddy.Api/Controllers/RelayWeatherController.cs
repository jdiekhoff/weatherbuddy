using Microsoft.AspNetCore.Mvc;
using WeatherBuddy.Api.Services;

namespace WeatherBuddy.Api.Controllers
{
  private readonly IWeatherService _weatherService;

  [ApiController]
  [Route("api/[controller]")]
  public class RelayController
  {
    public RelayController(IWeatherService weatherService)
    {
      _weatherService = weatherService;
    }


     public Task GeocodeZip()
    {
    }
    // reverse geocoding for zip
    // reverse geocoding for address
    // direct geocode for lat/lon
    // current weather
  }
}
