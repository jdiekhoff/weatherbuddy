using Microsoft.Extensions.Options;
using WeatherBuddy.Api.Configuration;

namespace WeatherBuddy.Api.Services
{
  public class OpenWeatherMapService : IWeatherService
  {
    private readonly HttpClient client;
    private readonly OpenWeatherMapConfiguration owmConfig;

    public OpenWeatherMapService(HttpClient client, IOptions<OpenWeatherMapConfiguration> openWeatherMapConfiguration)
    {
      this.client = client;
      this.owmConfig = openWeatherMapConfiguration.Value;
    }

    public string GetGeocodeForZip(string zipcode, string countrycode)
    {
      // STUB
      // TODO: Use httpclient to generate a http call to OpenWeatherMap API and return response
      throw new NotImplementedException();
    }
  }
}
